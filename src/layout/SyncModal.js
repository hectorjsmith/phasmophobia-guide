
const renderFormBody = (syncState, setSyncState, onConnect, onDisconnect) => {
    return (
        <>
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input"
                        type="text"
                        defaultValue={syncState.userId ?? ""}
                        disabled={syncState.isConnected}
                        onChange={(e) => setSyncState({...syncState, userId: e.target.value})}
                        placeholder="pineapple pen" />
                </div>
            </div>

            <div className="field">
                <label className="label">Room ID</label>
                <div className="control">
                    <input className="input"
                        type="text"
                        defaultValue={syncState.roomId ?? ""}
                        disabled={syncState.isConnected}
                        onChange={(e) => setSyncState({...syncState, roomId: e.target.value})}
                        placeholder="000 000" />
                </div>
            </div>

            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-danger"
                        onClick={onDisconnect}>Disconnect</button>
                </div>
                <div className="control">
                    <button className="button is-success"
                        onClick={onConnect}>Connect</button>
                </div>
            </div>
        </>
    )
}

export const SyncModal = ({syncState, setSyncState, onConnect, onDisconnect, toggleSyncModalOpen}) => {
    return (
            <div className="modal is-active">
                <div className="modal-background" onClick={toggleSyncModalOpen} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title is-uppercase has-letter-spacing">
                            <span className="icon mr-3">
                                <i className="fa fa-exchange" />
                            </span>
                            Sync
                        </p>
                        <button className="delete" aria-label="close" onClick={toggleSyncModalOpen} />
                    </header>
                    <section className="modal-card-body">
                        {renderFormBody(syncState, setSyncState, onConnect, onDisconnect)}
                    </section>
                </div>
            </div>
    )
}