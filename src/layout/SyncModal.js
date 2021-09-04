import {syncService} from "../sync/SyncService";
import {Component} from "react";

export default class SyncModal extends Component {
    disconnected = 0
    connecting = 1
    connected = 2

    constructor(props) {
        super(props);
        this.state = {
            syncOptions: props.syncOptions,
            syncState: this.syncStateFromSyncService(),
        }

        this.startSync = this.startSync.bind(this)
        this.stopSync = this.stopSync.bind(this)
    }

    componentDidMount() {
        syncService.registerOnConnectFunc(
            () => {
                this.setState({syncState: this.syncStateFromSyncService()})
                setTimeout(() => this.props.closeSyncModal(), 500);
            }
        )
        syncService.registerOnCloseFunc(
            () => this.setState({syncState: this.syncStateFromSyncService()})
        )
    }

    syncStateFromSyncService() {
        return syncService.isConnected() ? this.connected : this.disconnected
    }

    startSync() {
        this.setState({syncState: this.connecting})
        const opts = this.state.syncOptions
        syncService.connect(opts.url, opts.roomId)
        this.props.setSyncOptions(opts)
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
        if (this.state.syncState === this.connected) {
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

    renderConnectButton() {
        const opts = this.state.syncOptions
        const startSyncDisabled = !opts.consent || opts.url === "" || opts.roomId === ""
        const syncDisconnected = this.state.syncState === this.disconnected
        const syncConnecting = this.state.syncState === this.connecting

        if (syncDisconnected) {
            return (
                <div className="control">
                    <button disabled={startSyncDisabled}
                            className="button is-success"
                            onClick={this.startSync}>Connect</button>
                </div>
            )
        }
        if (syncConnecting) {
            return (
                <div className="control">
                    <button disabled={true}
                            className="button is-success">
                        <span className="icon mr-3">
                            <i className="fa fa-sync fa-spin" />
                        </span>
                        Connecting ...
                    </button>
                </div>
            )
        }
        return (
            <div className="control">
                <button className="button is-danger"
                        onClick={this.stopSync}>Disconnect</button>
            </div>
        )
    }

    render() {
        const opts = this.state.syncOptions
        const syncDisconnected = this.state.syncState === this.disconnected

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
                                       disabled={!syncDisconnected}
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
                                       disabled={!syncDisconnected}
                                       onChange={e => this.updateSyncOptions(e.target.value, "roomId")}
                                       placeholder="000000" />
                            </div>
                        </div>

                        <div className="field has-text-centered my-5">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           checked={opts.consent}
                                           disabled={!syncDisconnected}
                                           onChange={e => this.updateSyncOptions(e.target.checked, "consent")}/>
                                    <span className="ml-3">I agree to connect to the server listed above</span>
                                </label>
                            </div>
                        </div>

                        {this.renderSyncRunning()}
                        <div className="field is-grouped is-grouped-centered">
                            {this.renderConnectButton()}
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