import { compareStringsAsc } from '../util/stringSort'
import { ObservationToggle } from './ObservationToggle'

export const LeftColumn = ({
  evidence,
  setEvidence,
  resetEvidence,
  ghosts,
  showTips,
  toggleShowTips,
  toggleSyncModal,
  isSyncConnected,
}) => {
  const countSelectedEvidence = () => {
    return evidence.filter((e) => e.selected).length
  }
  const countRejectedEvidence = () => {
    return evidence.filter((e) => e.rejected).length
  }

  let selectedEvidenceCount = countSelectedEvidence()
  let rejectedEvidenceCount = countRejectedEvidence()
  let selectionCount = selectedEvidenceCount + rejectedEvidenceCount
  return (
    <div>
      <h2 className="mb-5 has-text-centered is-size-5 is-uppercase has-letter-spacing">
        Observations
      </h2>

      {evidence
        .sort((a, b) => compareStringsAsc(a.name, b.name))
        .map((e, index) => {
          return (
            <ObservationToggle
              key={e.name}
              evidence={e}
              setEvidence={(newE) => {
                evidence[index] = newE
                setEvidence([...evidence])
              }}
              ghosts={ghosts}
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
          className={"button" + (isSyncConnected ? ' is-success' : '')}
          onClick={toggleSyncModal}
          title="Sync"
        >
          <span className="icon is-small">
            <i className={'fa fa-sync' + (isSyncConnected ? ' fa-spin' : '')} />
          </span>
        </button>
      </div>
    </div>
  )
}
