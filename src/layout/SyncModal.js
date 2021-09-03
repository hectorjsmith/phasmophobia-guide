import {syncService} from "../sync/SyncService";
import {Component} from "react";

export default class SyncModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            syncOptions: props.syncOptions,
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
        const opts = this.state.syncOptions
        syncService.connect(opts.url, opts.roomId)
        this.props.setSyncOptions(opts)
        this.props.closeSyncModal()
    }

    stopSync() {
        syncService.disconnect()
    }

    updateSyncOptions(value, field) {
        const newState = {...this.state.syncOptions}
        newState[field] = value
        this.setState({syncOptions: newState})
    }

    renderSyncRunning() {
        if (this.state.syncActive) {
            return (
                <div className="my-5">
                    <p className="is-size-7 has-text-centered">
                    <span className="icon mr-3">
                        <i className="fa fa-sync fa-spin" />
                    </span>
                    <span className="is-uppercase has-letter-spacing">Sync is running ...</span>
                    </p>
                </div>
            )
        }
        return ""
    }

    render() {
        const opts = this.state.syncOptions
        const startSyncDisabled = !opts.consent || opts.url === "" || opts.roomId === ""

        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={this.props.closeSyncModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title is-uppercase has-letter-spacing">
                            <span className="icon mr-3">
                                <i className="fa fa-exchange" />
                            </span>
                            Sync
                        </p>
                        <button className="delete" aria-label="close" onClick={this.props.closeSyncModal} />
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">URL</label>
                            <div className="control">
                                <input className="input"
                                       type="text"
                                       defaultValue={opts.url}
                                       disabled={this.state.syncActive}
                                       onChange={e => this.updateSyncOptions(e.target.value, "url")}
                                       placeholder="pg-sync.hjs.dev" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Room ID</label>
                            <div className="control">
                                <input className="input"
                                       type="text"
                                       defaultValue={opts.roomId}
                                       disabled={this.state.syncActive}
                                       onChange={e => this.updateSyncOptions(e.target.value, "roomId")}
                                       placeholder="000000" />
                            </div>
                        </div>

                        <div className="field has-text-centered my-5">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           checked={opts.consent}
                                           disabled={this.state.syncActive}
                                           onChange={e => this.updateSyncOptions(e.target.checked, "consent")}/>
                                    <span className="ml-3">I agree to connect to the server listed above</span>
                                </label>
                            </div>
                        </div>

                        {this.renderSyncRunning()}
                        <div className="field is-grouped is-grouped-centered">
                            <div className="control" hidden={this.state.syncActive}>
                                <button disabled={startSyncDisabled} className="button is-success" onClick={this.startSync}>Connect</button>
                            </div>
                            <div className="control" hidden={!this.state.syncActive}>
                                <button className="button is-danger" onClick={this.stopSync}>Disconnect</button>
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