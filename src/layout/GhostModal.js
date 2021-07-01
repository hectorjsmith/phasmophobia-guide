import {Component} from "react"
import EvidenceTag from "./EvidenceTag"

export default class GhostInfoModal extends Component {
    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={this.props.onCloseModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title is-uppercase has-letter-spacing">{this.props.ghost.name}</p>
                        <button className="delete" aria-label="close" onClick={this.props.onCloseModal} />
                    </header>
                    <section className="modal-card-body has-text-centered">
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
                        <h2 className="has-text-centered is-size-5 is-uppercase has-letter-spacing">Evidence</h2>
                        <div className="mb-3 mt-1 columns is-mobile is-vcentered">
                            {this.props.ghost.evidence.map((e) => {
                                return (
                                    <div key={e} className="column is-4-mobile has-text-centered">
                                        <EvidenceTag evidenceList={this.props.evidence} evidence={e} />
                                    </div>
                                )
                            })}
                        </div>
                        <a className="button is-outlined is-info"
                           href={this.props.ghost.wikiUrl}
                           target="_blank"
                           rel="noreferrer">
                            <span className="icon mr-3">
                                <i className="fa fa-book" />
                            </span>
                            wiki
                        </a>
                    </section>
                </div>
            </div>
        )
    }
}
