import { useContext, useMemo } from 'react'
import { SelectionContext } from '../../context/SelectionContext'
import { filterPossibleGhosts } from '../../utils/filtering'

export const GhostListPanel = ({ ghosts, evidence }) => {
  const { data, selectedEvidence, rejectedEvidence } =
    useContext(SelectionContext)

  const visibleGhosts = useMemo(() => {
    console.log('filtering ghosts') // Still gets called twice instead of once
    return filterPossibleGhosts(selectedEvidence, rejectedEvidence, ghosts)
  }, [data])

  return (
    <div className="has-text-centered">
      <h2 className="mb-5 is-size-5 is-uppercase has-letter-spacing">Ghosts</h2>
      {visibleGhosts.length === 0 ? (
        <p>No ghosts found that match selected evidence</p>
      ) : null}
      {visibleGhosts.length === 1 ? (
        <p>You found the ghost! {visibleGhosts[0].name}</p>
      ) : null}
      {visibleGhosts.map((ghost) => {
        return <p>{ghost.name}</p>
      })}
    </div>
  )
}
