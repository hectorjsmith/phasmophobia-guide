import {Component} from "react";

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGhost: "",
            evidence: this.props.evidence,
            possibleGhosts: this.calcPossibleGhosts(this.props.evidence)
        }

        this.onEvidenceToggle = this.onEvidenceToggle.bind(this)
    }

    calcPossibleGhosts(evidence) {
        return this.props.ghosts.filter(ghost => {
            let selectedEvidence = evidence.filter(e => e.selected)
            return selectedEvidence.every(selected => ghost.evidence.some(ghostEvidence => ghostEvidence === selected.name))
        })
    }

    onEvidenceToggle(evidence) {
        // state update inspired by: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        const updatedEvidence = this.state.evidence.map(
            el => el.name === evidence.name ? { ...el, selected: !el.selected }: el
        )

        this.setState({
            evidence: updatedEvidence,
            possibleGhosts: this.calcPossibleGhosts(updatedEvidence)
        })
    }

    render() {
        return (
            <div className="container">
                <TopNav />
                { this.state.selectedGhost !== "" ? <GhostInfoModal ghost={this.state.selectedGhost} /> : "" }

                <div className="columns">
                    <div className="column is-4">
                        <LeftColumn evidence={this.state.evidence} onEvidenceToggle={this.onEvidenceToggle} />
                    </div>
                    <div className="column is-8">
                        <RightColumn evidence={this.state.evidence} ghosts={this.state.possibleGhosts} />
                    </div>
                </div>
            </div>
        )
    }
}

class GhostInfoModal extends Component {
    render() {
        const evidence = ["Fingerprints", "Spirit Box", "Ghost Writing"]
        return (
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.ghost}</p>
                        <button className="delete" aria-label="close" />
                    </header>
                    <section className="modal-card-body">
                        <p>Some content about the spirit</p>

                        <div className="my-5 columns">
                            {evidence.map((e) => {
                                return (
                                    <div key={e} className="column has-text-centered">
                                        <p>{e}</p>
                                        { e.length > 10 ? "X" : "" }
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

class LeftColumn extends Component {
    render() {
        return (
            <div className="has-text-centered">
                <h2 className="subtitle">Observations</h2>

                {this.props.evidence.map((evidence) => {
                    return <ObservationToggle key={evidence.name} evidence={evidence} onToggle={this.props.onEvidenceToggle} />
                })}
            </div>
        )
    }
}

class RightColumn extends Component {
    render() {
        return (
            <div className="has-text-centered">
                <h2 className="subtitle">Guide</h2>

                <table className="table is-striped is-fullwidth">
                    <thead>
                        <GhostTableHeader />
                    </thead>
                    <tbody>
                        {this.props.ghosts.map((ghost) => {
                            return <GhostTableRow key={ghost.name} evidence={this.props.evidence} ghost={ghost} />
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

class GhostTableHeader extends Component {
    render() {
        return (
            <tr>
                <th>Name</th>
                <th/>
                <th/>
                <th/>
            </tr>
        )
    }
}

class GhostTableRow extends Component {
    evidenceMarker(evidence) {
        const isSelected = this.props.evidence.filter(e => e.selected).some(e => e.name === evidence)
        if (isSelected) {
            return (
                <span className="icon has-text-success pull-right">
                    <i className="fa fa-check" />
                </span>
            )
        }
        return ""
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.ghost.name}
                    <a className="icon has-text-info pull-right" onClick={console.log} href={`#${this.props.ghost.name}`}>
                        <i className="fa fa-info-circle" />
                    </a>
                </td>
                {this.props.ghost.evidence.map((evidence) => {
                    return (
                        <td key={evidence}>
                            {evidence}
                            {this.evidenceMarker(evidence)}
                        </td>)
                })}
            </tr>
        )
    }
}

class ObservationToggle extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange() {
        this.props.onToggle(this.props.evidence)
    }

    render() {
        return (
            <div className="has-text-centered">
                <label className="checkbox">
                    <input type="checkbox" onChange={this.onChange} checked={this.props.evidence.selected} />
                    <p>{this.props.evidence.name}</p>
                </label>
            </div>
        );
    }
}

class TopNav extends Component {
    render() {
        return (
            <div className="my-6 has-text-centered">
                <h1 className="title">Paranormal Guide</h1>
            </div>
        )
    }
}