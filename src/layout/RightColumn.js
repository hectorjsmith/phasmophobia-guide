import {Component} from "react"
import MissingEvidence from "./MissingEvidence"
import GhostTableRow from "./GhostTableRow"

export default class RightColumn extends Component {
    showSuccessMessage() {
        if (this.props.ghosts.length === 1) {
            return (
                <div className="box has-text-centered">
                    <span className="icon has-text-success">
                        <i className="fa fa-2x fa-check" />
                    </span>
                    <p className="my-3 is-uppercase has-letter-spacing">Ghost identified!</p>
                    <p>Don't forget to update the in-game journal.</p>
                </div>
            )
        }
        return ""
    }

    renderGhostTable() {
        const ghosts = this.props.ghosts
        if (ghosts.length === 0) {
            return (
                <div className="box has-text-centered">
                    <span className="icon has-text-warning">
                        <i className="fa fa-2x fa-times" />
                    </span>
                    <p className="my-3 is-uppercase has-letter-spacing">None found</p>
                    <p>No ghosts found that match selected evidence</p>
                </div>
            )
        }
        return (
            <div>
                {ghosts.map((ghost) => {
                    return <GhostTableRow key={ghost.name}
                                          evidence={this.props.evidence}
                                          ghost={ghost}
                                          onShowModal={this.props.onShowModal} />
                })}
                {this.showSuccessMessage()}
            </div>
        )
    }

    render() {
        return (
            <div className="has-text-centered">
                <h2 className="mb-5 is-size-5 is-uppercase has-letter-spacing">Ghosts</h2>
                {this.renderGhostTable()}

                <MissingEvidence evidence={this.props.evidence} ghosts={this.props.ghosts} />
            </div>
        )
    }
}
