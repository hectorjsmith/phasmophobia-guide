import {Component} from "react"
import EvidenceTag from "./EvidenceTag"

export default class MissingEvidence extends Component {
    renderMissingEvidence(nonSelectedEvidence) {
        const missingEvidence = nonSelectedEvidence.filter(e => this.props.ghosts.some(g => g.evidence.some(ge => ge === e.name)))
        if (missingEvidence.length === 0) {
            return (
                <p>All evidence collected</p>
            )
        }
        return (
            <div className="columns is-mobile is-multiline is-centered">
                {missingEvidence.map((e) => {
                    return (
                        <div key={e.name} className="column is-4-mobile has-text-centered">
                            <EvidenceTag evidence={e.name} />
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        const nonSelectedEvidence = this.props.evidence.filter(e => !e.selected && !e.rejected)
        if (nonSelectedEvidence.length === this.props.evidence.length) {
            return ""
        }
        return (
            <div className="my-6">
                <h2 className="mb-5 is-size-5 is-uppercase has-letter-spacing">Missing Evidence</h2>
                {this.renderMissingEvidence(nonSelectedEvidence)}
            </div>
        );
    }
}
