import {Component} from "react"
import { compareStringsAsc } from "../util/stringSort"
import EvidenceTag from "./EvidenceTag"

export default class GhostTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false}

        this.toggleRowExpanded = this.toggleRowExpanded.bind(this)
    }

    toggleRowExpanded() {
        this.setState({expanded: !this.state.expanded})
    }

    render() {
        return (
            <div>
                <div className="mx-3 my-0 columns is-mobile is-vcentered is-multiline">
                    { /* eslint-disable jsx-a11y/anchor-is-valid */ }
                    <a className="column is-narrow-desktop is-1-mobile" onClick={this.toggleRowExpanded}>
                    { /* eslint-enable jsx-a11y/anchor-is-valid */ }
                        <i className="icon has-text-info ml-4">
                            <i className={"fa" + (this.state.expanded ? " fa-chevron-up" : " fa-chevron-down")} />
                        </i>
                    </a>
                    <div className="column is-11-mobile is-3-desktop">
                        <p className="is-uppercase has-text-weight-light has-letter-spacing">
                            {this.props.ghost.name}
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
                <div hidden={!this.state.expanded} className="mt-4 mx-4">
                    <h2 className="is-size-5 is-uppercase has-letter-spacing">Description</h2>
                    <p>{this.props.ghost.description}</p>
                    <div className="my-5 columns is-mobile is-vcentered">
                        <div className="column is-6-mobile">
                            <h2 className="is-size-6 is-uppercase has-letter-spacing">Strengths</h2>
                            {this.props.ghost.strengths.map((s) => {
                                return (
                                    <p key={s}>{s}</p>
                                )
                            })}
                        </div>
                        <div className="column is-6-mobile">
                            <h2 className="is-size-6 is-uppercase has-letter-spacing">Weaknesses</h2>
                            {this.props.ghost.weaknesses.map((w) => {
                                return (
                                    <p key={w}>{w}</p>
                                )
                            })}
                        </div>
                    </div>
                    <a className="button is-outlined is-info mb-4"
                       href={this.props.ghost.wikiUrl}
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
}
