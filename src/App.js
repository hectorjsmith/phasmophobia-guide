import { useEffect, useState, useReducer, useContext } from 'react'
import { Footer } from './components/Footer'
import { TopNav } from './components/Header'
import { LeftColumn } from './layout/LeftColumn'
import { RightColumn } from './layout/RightColumn'
import { SyncModal } from './layout/SyncModal'
import {
  newSetAndSyncEvidenceDataFn,
  handleConnect,
  handleDisconnect,
} from './sync/sync'
import getVersionData from './utils/version'
import { SyncContext } from './context/SyncContext'

const mapGhosts = (rawGhosts) => {
  return rawGhosts.map((g) => {
    return {
      ...g,
      expanded: false,
      visible: true,
      rejected: false,
    }
  })
}

const mapEvidence = (rawEvidence) => {
  return rawEvidence.map((e) => {
    return {
      ...e,
      selected: false,
      rejected: false,
    }
  })
}

const resetData = (rawEvidence, setEvidenceData, rawGhosts, setGhostData) => {
  const evidence = mapEvidence(rawEvidence)
  setEvidenceData(evidence)

  const ghosts = mapGhosts(rawGhosts)
  setGhostData(ghosts)
}

const filterPossibleGhosts = (evidence, allGhosts, setGhosts) => {
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
    setGhosts(
      allGhosts.map((g) => {
        return { ...g, visible: true }
      }),
    )
  } else {
    setGhosts(
      allGhosts.map((g) => {
        return {
          ...g,
          visible: isGhostPossible(g, selectedEvidence, rejectedEvidence),
        }
      }),
    )
  }
}

export const App = ({ rawEvidence, rawGhosts }) => {
  const versionData = getVersionData()

  const [ghostData, setGhostData] = useState(mapGhosts(rawGhosts))
  const [evidenceData, setEvidenceData] = useState(mapEvidence(rawEvidence))
  const [showTips, toggleShowTips] = useReducer((state) => !state, true)
  const [syncState, setSyncState] = useState({
    roomId: '',
    userId: '',
    isConnected: false,
  })
  const [syncModalOpen, toggleSyncModalOpen] = useReducer(
    (state) => !state,
    false,
  )

  const setAndSyncEvidenceData = newSetAndSyncEvidenceDataFn(
    setEvidenceData,
    syncState,
  )

  useEffect(
    () => filterPossibleGhosts(evidenceData, ghostData, setGhostData),
    // eslint-disable-next-line
    [evidenceData],
  )

  const {setRoom} = useContext(SyncContext)
  return (
    <div className="content-wrapper">
      <div className="content-main content">
        <div className="container">
          <TopNav />
          {syncModalOpen ? (
            <SyncModal
              syncState={syncState}
              setSyncState={setSyncState}
              onConnect={() =>{
                handleConnect(syncState, setSyncState, setAndSyncEvidenceData)
                setRoom('test-room')
              }}
              onDisconnect={() => handleDisconnect(syncState, setSyncState)}
              toggleSyncModalOpen={toggleSyncModalOpen}
            />
          ) : (
            ''
          )}
          <div className="columns">
            <div className="column is-4">
              <LeftColumn
                evidence={evidenceData}
                setEvidence={setAndSyncEvidenceData}
                resetEvidence={() =>
                  resetData(
                    rawEvidence,
                    setAndSyncEvidenceData,
                    rawGhosts,
                    setGhostData,
                  )
                }
                ghosts={ghostData}
                showTips={showTips}
                toggleShowTips={toggleShowTips}
                toggleSyncModal={toggleSyncModalOpen}
                syncState={syncState}
              />
            </div>
            <div className="column is-8">
              <RightColumn
                evidence={evidenceData}
                ghosts={ghostData}
                showTips={showTips}
                setGhosts={setGhostData}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer version={versionData.version} buildTime={versionData.buildTime} />
    </div>
  )
}
