
export const SyncModal = ({syncOptions, setSyncOptions, closeSyncModal}) => {

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
                                       checked={syncOptions.confirm}
                                       disabled={false}
                                       onChange={(e) => setSyncOptions({...syncOptions, confirm: e.target.checked})} />
                                <span className="ml-3">I agree to connect to the server listed above</span>
                            </label>
                        </div>
                    </div>

                </section>
            </div>
        </div>

    )
}
