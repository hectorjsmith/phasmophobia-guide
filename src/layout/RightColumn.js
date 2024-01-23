import { GhostTableRow } from './GhostTableRow'
import { compareStringsAsc } from '../util/stringSort'

export const RightColumn = ({ evidence, ghosts, showTips, setGhosts }) => {
  const visibleGhosts = ghosts.filter((g) => g.visible)
  const showSuccessMessage = () => {
    if (visibleGhosts.length === 1) {
      return (
        <div className="box has-text-centered">
          <span className="icon has-text-success">
            <i className="fa fa-2x fa-check" />
          </span>
          <p className="my-3 is-uppercase has-letter-spacing">
            Ghost identified!
          </p>
          <p>Don't forget to update the in-game journal.</p>
        </div>
      )
    }
    return ''
  }

  const setGhostValue = (ghost, key, value) => {
    setGhosts((prevGhosts) => {
      return prevGhosts.map((g) => {
        if (g.name === ghost.name) {
          // Return a new object with the updated property
          return { ...g, [key]: value }
        }
        // If it's not the target object, return the original object
        return g
      })
    })
  }
  
  const setGhostExpanded = (ghost, newExpanded) => {
    setGhostValue(ghost, "expanded", newExpanded)
  }

  const setGhostRejected = (ghost, newRejected) => {
    setGhostValue(ghost, "rejected", newRejected)
  }

  const sortGhosts = (a, b) => {
    if (a.rejected === b.rejected) {
      return compareStringsAsc(a.name, b.name)
    }
    if (a.rejected && !b.rejected) {
      return 1
    } else {
      return -1
    }
  }

  const renderGhostTable = () => {
    if (visibleGhosts.length === 0) {
      return (
        <div className="box has-text-centered">
          <span className="icon has-text-warning">
            <i className="fa fa-2x fa-times" />
          </span>
          <p className="my-3 is-uppercase has-letter-spacing">None found</p>
          <p>No ghosts found that match selected evidence</p>
        </div>
      )
    }
    return (
      <div>
        {visibleGhosts
          .sort(sortGhosts)
          .map((ghost) => {
            return (
              <GhostTableRow
                key={ghost.name}
                evidence={evidence}
                ghost={ghost}
                setGhostExpanded={setGhostExpanded}
                setGhostRejected={setGhostRejected}
                showTips={showTips}
              />
            )
          })}
        {showSuccessMessage()}
      </div>
    )
  }

  return (
    <div className="has-text-centered">
      <h2 className="mb-5 is-size-5 is-uppercase has-letter-spacing">Ghosts</h2>
      {renderGhostTable()}
    </div>
  )
}
