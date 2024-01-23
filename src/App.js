import { useEffect, useState, useReducer } from 'react'
import { Footer } from './nav/Footer'
import { TopNav } from './nav/Header'
import { LeftColumn } from './layout/LeftColumn'
import { RightColumn } from './layout/RightColumn'

const resetData = (allEvidence, setEvidenceData, allGhosts, setGhostData) => {
  const evidence = allEvidence.map((e) => {
    return {
      ...e,
      selected: false,
      rejected: false,
    }
  })
  setEvidenceData(evidence)

  const ghosts = allGhosts.map((g) => {
    return {
      ...g,
      expanded: true,
    }
  })
  setGhostData(ghosts)
}

const filterPossibleGhosts = (evidence, allGhosts, setPossibleGhosts) => {
  const isGhostPossible = (ghost, selectedEvidence, rejectedEvidence) => {
    let ghostHasSelectedEvidence =
      selectedEvidence.length === 0 ||
      selectedEvidence.every((selected) =>
        ghost.evidence.some((ghostEvidence) => ghostEvidence === selected.id),
      )
    let ghostHasRejectedEvidence =
      rejectedEvidence.length > 0 &&
      rejectedEvidence.some((rejected) =>
        ghost.evidence.some((ghostEvidence) => ghostEvidence === rejected.id),
      )

    return ghostHasSelectedEvidence && !ghostHasRejectedEvidence
  }

  let selectedEvidence = evidence.filter((e) => e.selected)
  let rejectedEvidence = evidence.filter((e) => e.rejected)

  if (selectedEvidence.length === 0 && rejectedEvidence.length === 0) {
    setPossibleGhosts(allGhosts)
  } else {
    setPossibleGhosts(
      allGhosts.filter((ghost) =>
        isGhostPossible(ghost, selectedEvidence, rejectedEvidence),
      ),
    )
  }
}

export const App = ({ allEvidence, allGhosts }) => {
  const [evidenceData, setEvidenceData] = useState([])
  const [possibleGhosts, setPossibleGhosts] = useState([])
  const [showTips, toggleShowTips] = useReducer((state) => !state, true)

  useEffect(
    () => resetData(allEvidence, setEvidenceData, allGhosts, setPossibleGhosts),
    [allEvidence, allGhosts],
  )
  useEffect(
    () => filterPossibleGhosts(evidenceData, allGhosts, setPossibleGhosts),
    [allGhosts, evidenceData],
  )

  return (
    <div className="content-wrapper">
      <div className="content-main content">
        <div className="container">
          <TopNav />
          <div className="columns">
            <div className="column is-4">
              <LeftColumn
                evidence={evidenceData}
                setEvidence={setEvidenceData}
                resetEvidence={() =>
                  resetData(allEvidence, setEvidenceData, allGhosts, setPossibleGhosts)
                }
                possibleGhosts={possibleGhosts}
                showTips={showTips}
                toggleShowTips={toggleShowTips}
              />
            </div>
            <div className="column is-8">
              <RightColumn
                evidence={evidenceData}
                possibleGhosts={possibleGhosts}
                showTips={showTips}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
