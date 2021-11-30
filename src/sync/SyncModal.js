
import {disconnectedState, connectingState} from "../util/syncService";
import {useState} from "react";

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

const JoinRoomForm = ({syncOptions, setSyncOptions, syncState, startSync, stopSync, closeSyncModal}) => {
    return (
        <>
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
        </>
    )
}

const CreateRoomForm = ({syncOptions, setSyncOptions, createRoom, closeSyncModal}) => {
    return (
        <>
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
                <label className="label">Room Name</label>
                <div className="control">
                    <input className="input"
                           type="text"
                           defaultValue={syncOptions.roomName}
                           disabled={false}
                           onChange={(e) => setSyncOptions({...syncOptions, roomName: e.target.value})}
                           placeholder="room name" />
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

            <div className="field is-grouped is-grouped-centered mt-5">
                <div className="control">
                    <button className="button is-success"
                            onClick={createRoom}>Create</button>
                </div>
                <div className="control">
                    <button className="button is-light" onClick={closeSyncModal}>Close</button>
                </div>
            </div>
        </>
    )
}

export const SyncModal = ({syncOptions, setSyncOptions, syncState, startSync, stopSync, closeSyncModal}) => {

    const [joinRoomTab, createRoomTab] = ['joinRoom', 'createRoom']
    const [selectedTab, setSelectedTab] = useState(joinRoomTab)

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
                    <div className="tabs is-boxed is-centered">
                        <ul>
                            <li className={selectedTab === joinRoomTab ? "is-active" : ""}>
                                <a className="px-5" onClick={() => setSelectedTab(joinRoomTab)}>
                                    <span className="icon is-small"><i className="fa fa-sign-in" aria-hidden="true" /></span>
                                    <span>Join Room</span>
                                </a>
                            </li>
                            <li className={selectedTab === createRoomTab ? "is-active" : ""}>
                                <a className="px-5" onClick={() => setSelectedTab(createRoomTab)}>
                                    <span className="icon is-small"><i className="fa fa-user-plus" aria-hidden="true" /></span>
                                    <span>Create Room</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    { selectedTab === joinRoomTab ?
                        <JoinRoomForm syncState={syncState}
                                      syncOptions={syncOptions}
                                      setSyncOptions={setSyncOptions}
                                      startSync={startSync}
                                      stopSync={stopSync}
                                      closeSyncModal={closeSyncModal} />
                        :
                        <CreateRoomForm syncOptions={syncOptions}
                                        setSyncOptions={setSyncOptions}
                                        createRoom={() => console.log("create room")}
                                        closeSyncModal={closeSyncModal} />
                    }
                </section>
            </div>
        </div>
    )
}
