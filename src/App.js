import { useEffect, useState, useReducer } from 'react'
import { Footer } from './nav/Footer'
import { TopNav } from './nav/Header'
import { LeftColumn } from './layout/LeftColumn'
import { RightColumn } from './layout/RightColumn'
import { SyncModal } from './layout/SyncModal'
import { supabase } from './util/supabase'

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

const newSetAndSyncEvidenceDataFn = (setEvidenceData, channel) => {
  return (newEvidence) => {
    const result = setEvidenceData(newEvidence)
    if (channel) {
      channel.track({ evidence: newEvidence })
    }
    return result
  }
}

const newSyncEventHandler = (channel, syncState, setEvidenceData) => {
  if (!channel) {
    return () => {}
  }
  return () => {
    const newState = channel.presenceState()
    console.log("sync", newState)
    for (const key in newState) {
      if (key.startsWith("user") && !key.includes(syncState.userId)) {
        const newEvidence = newState[key][0]["evidence"]
        setEvidenceData(newEvidence)
      }
    }
  }
}

const handleConnect = (syncState, setSyncState, setChannel, setEvidenceData) => {
  const channel = supabase.channel(syncState.roomId, {
    config: {
      presence: { key: syncState.userId }
    }
  })
  const onSync = newSyncEventHandler(channel, syncState, setEvidenceData)

  channel
    .on('presence', { event: 'sync' }, onSync)
    .subscribe()

  setChannel(channel)
  setSyncState({
    ...syncState,
    isConnected: true
  })
}

const handleDisconnect = (syncState, setSyncState, channel, setChannel) => {
  channel.untrack().then(status => console.log("disconnected", status))

  setChannel(null)
  setSyncState({
    ...syncState,
    isConnected: false
  })
}

export const App = ({ rawEvidence, rawGhosts }) => {
  const [channel, setChannel] = useState(null)
  const [ghostData, setGhostData] = useState(mapGhosts(rawGhosts))
  const [evidenceData, setEvidenceData] = useState(mapEvidence(rawEvidence))
  const [showTips, toggleShowTips] = useReducer((state) => !state, true)
  const [syncState, setSyncState] = useState({roomId:"",userId:"",isConnected:false})
  const [syncModalOpen, toggleSyncModalOpen] = useReducer((state) => !state, false)

  const setAndSyncEvidenceData = newSetAndSyncEvidenceDataFn(setEvidenceData, channel)

  useEffect(
    () => filterPossibleGhosts(evidenceData, ghostData, setGhostData),
    // eslint-disable-next-line
    [evidenceData],
  )

  return (
    <div className="content-wrapper">
      <div className="content-main content">
        <div className="container">
          <TopNav />
          { syncModalOpen ?
           <SyncModal syncState={syncState}
                      setSyncState={setSyncState}
                      onConnect={() => handleConnect(syncState, setSyncState, setChannel, setEvidenceData)}
                      onDisconnect={() => handleDisconnect(syncState, setSyncState, channel, setChannel)}
                      toggleSyncModalOpen={toggleSyncModalOpen} />
            : "" }
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
                isSyncConnected={syncState.isConnected}
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
      <Footer />
    </div>
  )
}
