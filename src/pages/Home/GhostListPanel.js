import { useContext, useMemo } from 'react'
import { SelectionContext } from '../../context/SelectionContext'
import { filterPossibleGhosts } from '../../utils/filtering'
import { GhostIdentifiedResult, GhostRow, NoGhostsFoundResult } from '../../components'

export const GhostListPanel = ({ ghosts, evidence }) => {
  const { data, selectedEvidence, rejectedEvidence, getIsEvidenceSelected } =
    useContext(SelectionContext)

  const visibleGhosts = useMemo(() => {
    console.log('filtering ghosts') // Still gets called twice instead of once
    return filterPossibleGhosts(selectedEvidence, rejectedEvidence, ghosts)
  }, [data])

  return (
    <div className="has-text-centered">
      <h2 className="mb-5 is-size-5 is-uppercase has-letter-spacing">Ghosts</h2>
      {visibleGhosts.length === 0 ? (
        <NoGhostsFoundResult />
      ) : null}
      {visibleGhosts.length === 1 ? (
        <GhostIdentifiedResult />
      ) : null}
      {visibleGhosts.map((ghost) => {
        return (
            <GhostRow key={ghost.name} ghost={ghost} allEvidence={evidence} getIsEvidenceSelected={getIsEvidenceSelected} showTips={false} />
        )
      })}
    </div>
  )
}