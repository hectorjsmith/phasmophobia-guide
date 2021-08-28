import {Component} from "react"
import { compareStringsAsc } from "../util/stringSort"
import EvidenceTag from "./EvidenceTag"

export default class GhostTableRow extends Component {
    render() {
        return (
            <div>
                <div className="mx-3 my-0 columns is-mobile is-vcentered is-multiline">
                    <div className="column is-4-desktop is-12-mobile">
                        <p className="is-uppercase has-text-weight-light has-letter-spacing">
                            {this.props.ghost.name}
                            <a className="icon has-text-info mx-4" onClick={() => this.props.onShowModal(this.props.ghost)} href={`#${this.props.ghost.name}`}>
                                <i className="fa fa-info-circle" />
                            </a>
                        </p>
                    </div>
                    {this.props.ghost.evidence.sort((a, b) => compareStringsAsc(a, b)).map((e) => {
                        return (
                            <div key={e} className="column is-4-mobile has-text-centered">
                                <EvidenceTag evidenceList={this.props.evidence} evidence={e} />
                            </div>
                        )
                    })}
                </div>
                <hr className="my-3" />
            </div>

        )
    }
}
