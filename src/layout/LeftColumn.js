import { useSortedEvidence } from '../utils/sort'
import { ObservationToggle } from '../components/ObservationToggle'

export const LeftColumn = ({
  evidence,
  setEvidence,
  resetEvidence,
  ghosts,
  showTips,
  toggleShowTips,
  toggleSyncModal,
  syncState,
}) => {
  const sortedEvidence = useSortedEvidence(evidence)
  
  const countSelectedEvidence = () => {
    return evidence.filter((e) => e.selected).length
  }
  const countRejectedEvidence = () => {
    return evidence.filter((e) => e.rejected).length
  }

  const toggleSelection = (id) => {
    return () => {
      setEvidence(current =>
        current.map(item =>
          item.id === id ? {...item, selected: !item.selected} : item
        )
      )
    }
  }

  const toggleRejection = (id) => {
    return () => {
      setEvidence(current =>
        current.map(item =>
          item.id === id ? {...item, rejected: !item.rejected} : item
        )
      )
    }
  }

  const anyVisibleGhostWithEvidence = (ghosts, evidenceId) => {
    return ghosts.some(
      (ghost) => ghost.visible && ghost.evidence.includes(evidenceId)
    );
  }

  let selectedEvidenceCount = countSelectedEvidence()
  let rejectedEvidenceCount = countRejectedEvidence()
  let selectionCount = selectedEvidenceCount + rejectedEvidenceCount
  return (
    <div>
      <h2 className="mb-5 has-text-centered is-size-5 is-uppercase has-letter-spacing">
        Observations
      </h2>

      {sortedEvidence.map((e) => {
          return (
            <ObservationToggle
              key={e.id}
              id={e.id}
              name={e.name}
              icon={e.icon}
              isSelected={e.selected}
              toggleSelection={toggleSelection}
              isRejected={e.rejected}
              toggleRejection={toggleRejection}
              isAvailable={anyVisibleGhostWithEvidence(ghosts, e.id)}
            />
          )
        })}

      <div className="buttons is-centered mt-6">
        <button
          className={
            'button is-outlined' + (selectionCount > 0 ? ' is-warning' : '')
          }
          onClick={resetEvidence}
          title="Reset all selected observations"
        >
          reset
        </button>
        <button
          className={'button' + (showTips ? ' is-info' : '')}
          onClick={toggleShowTips}
          title="Show Tips"
        >
          <span className="icon is-small">
            <i className={'fa fa-info'} />
          </span>
        </button>
        <button
          className={'button' + (syncState.isConnected ? ' is-success' : '')}
          onClick={toggleSyncModal}
          title="Sync"
        >
          <span className="icon is-small">
            <i
              className={
                'fa' +
                (syncState.isConnected ? ' fa-sync fa-spin' : ' fa-users')
              }
            />
          </span>
          {syncState.isConnected ? <span>{syncState.roomId}</span> : ''}
        </button>
      </div>
    </div>
  )
}
