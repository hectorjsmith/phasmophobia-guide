import {syncService} from "../sync/SyncService";
import {Component} from "react";

export default class SyncModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            roomId: "",
            consent: false,
            syncActive: syncService.isConnected(),
        }

        this.startSync = this.startSync.bind(this)
        this.stopSync = this.stopSync.bind(this)
    }

    componentDidMount() {
        syncService.registerOnConnectFunc(
            () => this.setState({syncActive: true})
        )
        syncService.registerOnCloseFunc(
            () => this.setState({syncActive: false})
        )
    }

    startSync() {
        syncService.connect(this.state.url, this.state.roomId)
    }

    stopSync() {
        syncService.disconnect()
    }

    render() {
        const startSyncDisabled = !this.state.consent || this.state.url === "" || this.state.roomId === ""

        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={this.props.closeSyncModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title is-uppercase has-letter-spacing">Sync</p>
                        <button className="delete" aria-label="close" onClick={this.props.closeSyncModal} />
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">URL</label>
                            <div className="control">
                                <input className="input"
                                       type="text"
                                       defaultValue={this.state.url}
                                       onChange={e => this.setState({url: e.target.value})}
                                       placeholder="pg-sync.hjs.dev" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Room ID</label>
                            <div className="control">
                                <input className="input"
                                       type="text"
                                       defaultValue={this.state.roomId}
                                       onChange={e => this.setState({roomId: e.target.value})}
                                       placeholder="000000" />
                            </div>
                        </div>

                        <div className="field has-text-centered my-5">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           checked={this.state.consent}
                                           onChange={e => this.setState({consent: e.target.checked})}/>
                                    <span className="ml-3">I agree to connect to the server listed above</span>
                                </label>
                            </div>
                        </div>

                        <div className="field is-grouped is-grouped-centered">
                            <div className="control" hidden={this.state.syncActive}>
                                <button disabled={startSyncDisabled} className="button is-success" onClick={this.startSync}>Start Sync</button>
                            </div>
                            <div className="control" hidden={!this.state.syncActive}>
                                <button className="button is-warning" onClick={this.stopSync}>Stop Sync</button>
                            </div>
                            <div className="control">
                                <button className="button is-light" onClick={this.props.closeSyncModal}>Close</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        )
    }
}