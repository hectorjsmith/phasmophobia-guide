
import {disconnectedState, connectingState} from "../util/syncService";

const renderConnectButton = (syncOptions, syncState, startSync, stopSync) => {
    const startSyncDisabled = !syncOptions.consent || syncOptions.url === "" || syncOptions.roomId === ""
    const syncDisconnected = syncState === disconnectedState
    const syncConnecting = syncState === connectingState

    if (syncDisconnected) {
        return (
            <div className="control">
                <button disabled={startSyncDisabled}
                        className="button is-success"
                        onClick={startSync}>Connect</button>
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
                    onClick={stopSync}>Disconnect</button>
        </div>
    )
}


export const SyncModal = ({syncOptions, setSyncOptions, syncState, startSync, stopSync, closeSyncModal}) => {

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeSyncModal} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title is-uppercase has-letter-spacing">
                        <span className="icon mr-3">
                            <i className="fa fa-exchange" />
                        </span>
                        Sync
                    </p>
                    <button className="delete" aria-label="close" onClick={closeSyncModal} />
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">URL</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   defaultValue={syncOptions.url}
                                   disabled={false}
                                   onChange={(e) => setSyncOptions({...syncOptions, url: e.target.value})}
                                   placeholder="pg-sync.hjs.dev" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Room ID</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   defaultValue={syncOptions.roomId}
                                   disabled={false}
                                   onChange={(e) => setSyncOptions({...syncOptions, roomId: e.target.value})}
                                   placeholder="000000" />
                        </div>
                    </div>

                    <div className="field has-text-centered my-5">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox"
                                       checked={syncOptions.consent}
                                       disabled={false}
                                       onChange={(e) => setSyncOptions({...syncOptions, consent: e.target.checked})} />
                                <span className="ml-3">I agree to connect to the server listed above</span>
                            </label>
                        </div>
                    </div>

                    <div className="field is-grouped is-grouped-centered">
                        {renderConnectButton(syncOptions, syncState, startSync, stopSync)}
                        <div className="control">
                            <button className="button is-light" onClick={closeSyncModal}>Close</button>
                        </div>
                    </div>

                </section>
            </div>
        </div>

    )
}
