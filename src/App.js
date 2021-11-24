import {Component, useEffect, useState} from "react"
import {Footer} from "./nav/Footer"
import {TopNav} from "./nav/Header"
import {LeftColumn} from "./layout/LeftColumn"
import {RightColumn} from "./layout/RightColumn"

export const App = ({evidence, ghosts}) => {
    const [evidenceData, setEvidenceData] = useState([])
    const [possibleGhosts, setPossibleGhosts] = useState([])

    const resetEvidenceData = () => {
        setEvidenceData(mapEvidence(evidence))
    }

    const mapEvidence = (e) => {
        return e.map((e1) => {
            return {
                ...e1,
                selected: false,
                rejected: false
            }
        })
    }

    const filterGhosts = (evidence) => {
        let selectedEvidence = evidence.filter(e => e.selected)
        let rejectedEvidence = evidence.filter(e => e.rejected)

        if (selectedEvidence.length === 0 && rejectedEvidence.length === 0) {
            return ghosts
        }

        return ghosts.filter(ghost => {
            let ghostHasSelectedEvidence = selectedEvidence.length === 0
                || selectedEvidence.every(selected => ghost.evidence.some(ghostEvidence => ghostEvidence === selected.name))
            let ghostHasRejectedEvidence = rejectedEvidence.length > 0
                && rejectedEvidence.some(rejected => ghost.evidence.some(ghostEvidence => ghostEvidence === rejected.name))

            return ghostHasSelectedEvidence && !ghostHasRejectedEvidence
        })
    }

    useEffect(() => setEvidenceData(mapEvidence(evidence)), [evidence])
    useEffect(() => setPossibleGhosts(filterGhosts(evidence)), [evidence, ghosts])

    return (
        <div className="content-wrapper">
            <div className="content-main">
                <div className="container">
                    <TopNav />
                    <div className="columns">
                        <div className="column is-4">
                            <LeftColumn evidence={evidenceData}
                                        setEvidence={setEvidenceData}
                                        resetEvidence={resetEvidenceData}
                                        possibleGhosts={possibleGhosts} />
                        </div>
                        <div className="column is-8">
                            <RightColumn evidence={evidence}
                                         possibleGhosts={possibleGhosts}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
