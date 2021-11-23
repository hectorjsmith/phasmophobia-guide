import {Component} from "react"
import { compareStringsAsc } from "../util/stringSort"
import { ObservationToggle } from "./ObservationToggle"

const LeftColumn = ({evidence, setEvidence, possibleGhosts}) => {
    const maxSelected = 3
    const countSelectedEvidence = () => {
        return evidence.filter(e => e.selected).length
    }
    const countRejectedEvidence = () => {
        return evidence.filter(e => e.rejected).length
    }

    const showWarning = () => {
        if (countSelectedEvidence() > maxSelected) {
            return (
                <span className="icon has-text-warning" title="Too many observations selected">
                    <i className="fa fa-2x fa-warning" />
                </span>
            )
        }
        return ""
    }

    let selectedEvidenceCount = countSelectedEvidence()
    let rejectedEvidenceCount = countRejectedEvidence()
    let selectionCount = selectedEvidenceCount + rejectedEvidenceCount
    return (
        <div>
            <h2 className="mb-5 has-text-centered is-size-5 is-uppercase has-letter-spacing">Observations</h2>

            {evidence.sort((a, b) => compareStringsAsc(a.name, b.name)).map((e) => {
                return <ObservationToggle key={e.name}
                                          evidence={e}
                                          setEvidence={e}
                                          possibleGhosts={possibleGhosts} />
            })}

            <div className="has-text-centered">
                <button className={"button my-4 is-outlined" + (selectionCount > 0 ? " is-warning" : "")}
                        onClick={(e) => {this.props.onEvidenceReset(); console.log(e.target)}}
                        title="Reset all selected observations">reset</button>

                <p className="heading mb-3">({selectedEvidenceCount} of {this.maxSelected})</p>
                {this.showWarning()}
            </div>
        </div>
    )
}

export default class LeftColumn extends Component {
    maxSelected = 3

    countSelectedEvidence() {
        return this.props.evidence.filter(e => e.selected).length
    }
    countRejectedEvidence() {
        return this.props.evidence.filter(e => e.rejected).length
    }

    showWarning() {
        if (this.countSelectedEvidence() > this.maxSelected) {
            return (
                <span className="icon has-text-warning" title="Too many observations selected">
                    <i className="fa fa-2x fa-warning" />
                </span>
            )
        }
        return ""
    }

    render() {
        let selectedEvidenceCount = this.countSelectedEvidence()
        let rejectedEvidenceCount = this.countRejectedEvidence()
        let selectionCount = selectedEvidenceCount + rejectedEvidenceCount
        return (
            <div>
                <h2 className="mb-5 has-text-centered is-size-5 is-uppercase has-letter-spacing">Observations</h2>

                {this.props.evidence.sort((a, b) => compareStringsAsc(a.name, b.name)).map((evidence) => {
                    return <ObservationToggle key={evidence.name}
                                              evidence={evidence}
                                              setEvidence={}
                                              possibleGhosts={this.props.possibleGhosts}
                                              onToggle={this.props.onEvidenceToggle} />
                })}

                <div className="has-text-centered">
                    <button className={"button my-4 is-outlined" + (selectionCount > 0 ? " is-warning" : "")}
                            onClick={(e) => {this.props.onEvidenceReset(); console.log(e.target)}}
                            title="Reset all selected observations">reset</button>

                    <p className="heading mb-3">({selectedEvidenceCount} of {this.maxSelected})</p>
                    {this.showWarning()}
                </div>
            </div>
        )
    }
}
