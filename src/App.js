import {useEffect, useState} from "react"
import {Footer} from "./nav/Footer"
import {TopNav} from "./nav/Header"
import {LeftColumn} from "./layout/LeftColumn"
import {RightColumn} from "./layout/RightColumn"
import {SyncModal} from "./sync/SyncModal";
import {
    connectedState,
    CreateRoom,
    disconnectedState,
    Init,
    StartSync,
    StopSync, UpdateMemberData,
    UpdateRoomState
} from "./util/syncService";

const mapEvidence = (evidence) => {
    return evidence.map((e) => {
        return {
            name: e,
            selected: false,
            rejected: false
        }
    })
}

const resetEvidenceData = (evidence, setEvidenceData) => {
    const mappedEvidence = mapEvidence(evidence)
    setEvidenceData(mappedEvidence)
}

const filterPossibleGhosts = (evidence, allGhosts, setPossibleGhosts) => {
    const isGhostPossible = (ghost, selectedEvidence, rejectedEvidence) => {
        let ghostHasSelectedEvidence = selectedEvidence.length === 0
            || selectedEvidence.every(selected => ghost.evidence.some(ghostEvidence => ghostEvidence === selected.name))
        let ghostHasRejectedEvidence = rejectedEvidence.length > 0
            && rejectedEvidence.some(rejected => ghost.evidence.some(ghostEvidence => ghostEvidence === rejected.name))

        return ghostHasSelectedEvidence && !ghostHasRejectedEvidence
    }

    let selectedEvidence = evidence.filter(e => e.selected)
    let rejectedEvidence = evidence.filter(e => e.rejected)

    if (selectedEvidence.length === 0 && rejectedEvidence.length === 0) {
        setPossibleGhosts(allGhosts)
    } else {
        setPossibleGhosts(
            allGhosts.filter(ghost => isGhostPossible(ghost, selectedEvidence, rejectedEvidence))
        )
    }
}

export const App = ({allEvidence, allGhosts}) => {
    const [eventsInitialized, setEventsInitialized] = useState(false)
    const [evidenceData, setEvidenceData] = useState(mapEvidence(allEvidence))
    const [possibleGhosts, setPossibleGhosts] = useState([])
    const [syncOptions, setSyncOptions] = useState({url: "http://example.com", consent: false, roomId: "", readKey: "", writeKey: ""})
    const [syncData, setSyncData] = useState({me: null, state: null, members: null})
    const [syncState, setSyncState] = useState(disconnectedState)
    const [syncModalOpen, setSyncModalOpen] = useState(false)

    if (!eventsInitialized) {
        Init(evidenceData, setEvidenceData, setSyncData, setSyncOptions)
        setEventsInitialized(true)
    }
    useEffect(() => filterPossibleGhosts(evidenceData, allGhosts, setPossibleGhosts), [evidenceData, allGhosts])

    const setAndSyncEvidenceData = (newData) => {
        setEvidenceData(newData)
        if (syncState === connectedState) {
            UpdateRoomState(syncOptions, syncData, newData)
        }
    }

    return (
        <div className="content-wrapper">
            <div className="content-main">
                <div className="container">
                    <TopNav isSyncing={syncState === connectedState}
                            openSyncModal={() => setSyncModalOpen(true)} />
                    { syncModalOpen ?
                        <SyncModal syncOptions={syncOptions}
                                   setSyncOptions={setSyncOptions}
                                   syncData={syncData}
                                   syncState={syncState}
                                   startSync={() => StartSync(syncState, setSyncState, syncData, setSyncData, syncOptions)}
                                   stopSync={() => StopSync(syncState, setSyncState)}
                                   updateMemberData={() => UpdateMemberData(syncOptions, syncData.me.memberKey, {name: syncOptions.memberName})}
                                   createRoomAndStartSync = {() => { CreateRoom(syncOptions, evidenceData); StartSync(syncState, setSyncState, syncData, setSyncData, syncOptions) }}
                                   closeSyncModal={() => setSyncModalOpen(false)} />
                        : "" }
                    <div className="columns">
                        <div className="column is-4">
                            <LeftColumn evidence={evidenceData}
                                        setEvidence={setAndSyncEvidenceData}
                                        resetEvidence={() => resetEvidenceData(allEvidence, setAndSyncEvidenceData)}
                                        possibleGhosts={possibleGhosts} />
                        </div>
                        <div className="column is-8">
                            <RightColumn evidence={evidenceData}
                                         possibleGhosts={possibleGhosts}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
