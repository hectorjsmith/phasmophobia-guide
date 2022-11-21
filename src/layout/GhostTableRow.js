import { useReducer } from "react"
import { compareStringsAsc } from "../util/stringSort"
import {EvidenceTag} from "./EvidenceTag"

const isEvidenceSelected = (evidence, evidenceList) => {
    if (!evidenceList) {
        return false
    }
    return evidenceList.filter(e => e.selected).some(e => e.name === evidence)
}

const sortEvidence = (allEvidence, evidenceList) => {
    return evidenceList.sort((a, b) => {
        let aSelected = isEvidenceSelected(a, allEvidence)
        let bSelected = isEvidenceSelected(b, allEvidence)
        if (aSelected === bSelected) {
            return compareStringsAsc(a, b)
        } else {
            if (aSelected) return 1
            else return -1
        }
    })
}

export const GhostTableRow = ({evidence, ghost}) => {
    const [expanded, toggleExpanded] = useReducer((v) => !v, false)

    return (
        <div>
            <div className="mx-3 my-0 columns is-mobile is-vcentered is-multiline">
                <div className="column is-narrow-desktop is-1-mobile">
                    <button className={"button" + (expanded ? " is-dark" : "")}
                            onClick={toggleExpanded}>
                            <span className="icon is-small">
                                <i className={"fa" + (expanded ? " fa-chevron-up" : " fa-chevron-down")} />
                            </span>
                    </button>
                </div>
                <div className="column is-11-mobile is-3-desktop">
                    <p className="is-uppercase has-text-weight-light has-letter-spacing">
                        {ghost.name}
                    </p>
                </div>
                {sortEvidence(evidence, ghost.evidence).map((e) => {
                    return (
                        <div key={e} className="column is-4-mobile has-text-centered">
                            <EvidenceTag title={e} selected={isEvidenceSelected(e, evidence)} />
                        </div>
                    )
                })}
            </div>
            <div hidden={!expanded} className="mt-4 mb-5 mx-4 ghost-info-accordion-content">
                <h2 className="is-size-5 is-uppercase has-letter-spacing">Description</h2>
                <p className="ml-4">{ghost.description}</p>
                <div className="my-5 ml-4 columns is-mobile is-vcentered">
                    <div className="column is-6-mobile">
                        <h2 className="is-size-6 is-uppercase has-letter-spacing">Strengths</h2>
                        {ghost.strengths.map((s) => {
                            return (
                                <p key={s}>{s}</p>
                            )
                        })}
                    </div>
                    <div className="column is-6-mobile">
                        <h2 className="is-size-6 is-uppercase has-letter-spacing">Weaknesses</h2>
                        {ghost.weaknesses.map((w) => {
                            return (
                                <p key={w}>{w}</p>
                            )
                        })}
                    </div>
                </div>
                <a className="button is-outlined is-info mb-4"
                   href={ghost.wikiUrl}
                   target="_blank"
                   rel="noreferrer">
                            <span className="icon mr-3">
                                <i className="fa fa-book" />
                            </span>
                    wiki
                </a>
            </div>
            <hr className="my-3" />
        </div>
    )
}
