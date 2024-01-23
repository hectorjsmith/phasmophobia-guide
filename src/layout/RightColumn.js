import { GhostTableRow } from './GhostTableRow'
import { compareStringsAsc } from '../util/stringSort'

export const RightColumn = ({ evidence, possibleGhosts, showTips, setGhosts }) => {
  const showSuccessMessage = () => {
    if (possibleGhosts.length === 1) {
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

  const setGhostExpanded = (ghost, newExpanded) => {
    setGhosts((prevGhosts) => {
      return prevGhosts.map(g => {
        if (g.name === ghost.name) {
          // Return a new object with the updated property
          return { ...g, expanded: newExpanded };
        }
        // If it's not the target object, return the original object
        return g;
      });
    })
  }

  const renderGhostTable = () => {
    if (possibleGhosts.length === 0) {
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
        {possibleGhosts
          .sort((a, b) => compareStringsAsc(a.name, b.name))
          .map((ghost) => {
            return (
              <GhostTableRow
                key={ghost.name}
                evidence={evidence}
                ghost={ghost}
                setGhostExpanded={setGhostExpanded}
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
