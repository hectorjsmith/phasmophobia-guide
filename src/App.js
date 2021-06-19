import {Component} from "react";

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { selectedGhost: "" }
    }
    render() {
        return (
            <div className="container">
                <TopNav />
                { this.state.selectedGhost !== "" ? <GhostInfoModal ghost={this.state.selectedGhost} /> : "" }

                <div className="columns">
                    <div className="column is-4">
                        <LeftColumn />
                    </div>
                    <div className="column is-8">
                        <RightColumn />
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

                <ObservationToggle name="Fingerprints" />
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
                        <GhostTableRow name="Spirit" evidence={["Fingerprints", "Spirit Box", "Ghost Writing"]} />
                        <GhostTableRow name="Wraith" evidence={["Fingerprints", "Spirit Box", "Freezing"]} />
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
    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                    <a className="icon has-text-info pull-right" onClick={console.log} href={`#${this.props.name}`}>
                        <i className="fa fa-info-circle" />
                    </a>
                </td>
                {this.props.evidence.map((evidence) => {
                    return (
                        <td key={evidence}>
                            {evidence}
                        </td>)
                })}
            </tr>
        )
    }
}

class ObservationToggle extends Component {
    render() {
        return (
            <div className="has-text-centered">
                <label className="checkbox">
                    <input type="checkbox" />
                    <p>{this.props.name}</p>
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