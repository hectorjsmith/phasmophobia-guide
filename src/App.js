import { useEffect, useState} from "react"
import {Footer} from "./nav/Footer"
import {TopNav} from "./nav/Header"
import {LeftColumn} from "./layout/LeftColumn"
import {RightColumn} from "./layout/RightColumn"
import {SyncModal} from "./sync/SyncModal";
import {disconnectedState} from "./util/syncService";

const resetEvidenceData = (evidence, setEvidenceData) => {
    const mappedEvidence = evidence.map((e) => {
        return {
            name: e,
            selected: false,
            rejected: false
        }
    })
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
    const [evidenceData, setEvidenceData] = useState([])
    const [possibleGhosts, setPossibleGhosts] = useState([])
    const [syncOptions, setSyncOptions] = useState({url: "wss://", consent: false, roomId: "1234"})
    const [syncState, setSyncState] = useState(disconnectedState)
    const [syncModalOpen, setSyncModalOpen] = useState(false)

    useEffect(() => resetEvidenceData(allEvidence, setEvidenceData), [allEvidence])
    useEffect(() => filterPossibleGhosts(evidenceData, allGhosts, setPossibleGhosts), [evidenceData, allGhosts])

    return (
        <div className="content-wrapper">
            <div className="content-main">
                <div className="container">
                    <TopNav isSyncing={false}
                            openSyncModal={() => setSyncModalOpen(true)} />
                    { syncModalOpen ?
                        <SyncModal syncOptions={syncOptions}
                                   setSyncOptions={setSyncOptions}
                                   syncState={syncState}
                                   closeSyncModal={() => setSyncModalOpen(false)} />
                        : "" }
                    <div className="columns">
                        <div className="column is-4">
                            <LeftColumn evidence={evidenceData}
                                        setEvidence={setEvidenceData}
                                        resetEvidence={() => resetEvidenceData(allEvidence, setEvidenceData)}
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
