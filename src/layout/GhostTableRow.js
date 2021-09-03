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
                    <div className="column is-narrow-desktop is-1-mobile">
                        <button className={"button" + (this.state.expanded ? " is-dark" : "")}
                                onClick={this.toggleRowExpanded}>
                            <span className="icon is-small">
                                <i className={"fa" + (this.state.expanded ? " fa-minus" : " fa-plus")} />
                            </span>
                        </button>
                    </div>
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
                <div hidden={!this.state.expanded} className="mt-4 mx-4 ghost-info-accordion-content">
                    <h2 className="is-size-5 is-uppercase has-letter-spacing">Description</h2>
                    <p className="ml-4">{this.props.ghost.description}</p>
                    <div className="my-5 ml-4 columns is-mobile is-vcentered">
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
