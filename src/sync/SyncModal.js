
import {disconnectedState, connectingState, CreateRoom, StartSync} from "../util/syncService";
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

const JoinRoomForm = ({syncOptions, syncState, startSync, closeSyncModal}) => {
    return (
        <>
            <div className="field is-grouped is-grouped-centered">
                {renderConnectButton(syncOptions, syncState, startSync, () => {})}
                <div className="control">
                    <button className="button is-light" onClick={closeSyncModal}>Close</button>
                </div>
            </div>
        </>
    )
}

const CreateRoomForm = ({createRoom, closeSyncModal}) => {
    return (
        <>
            <div className="field is-grouped is-grouped-centered mt-5">
                <div className="control">
                    <button className="button is-success"
                            onClick={createRoom}>Create + Join</button>
                </div>
                <div className="control">
                    <button className="button is-light" onClick={closeSyncModal}>Close</button>
                </div>
            </div>
        </>
    )
}

const SyncModalConnectBody = ({syncOptions, setSyncOptions, syncState, startSync, createRoomAndStartSync, closeSyncModal}) => {
    const [joinRoomTab, createRoomTab] = ['joinRoom', 'createRoom']
    const [selectedTab, setSelectedTab] = useState(joinRoomTab)

    return (
        <>
            <div className="tabs is-boxed is-centered">
                <ul>
                    <li className={selectedTab === joinRoomTab ? "is-active" : ""}>
                        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                        <a className="px-5" onClick={() => setSelectedTab(joinRoomTab)}>
                            <span className="icon is-small"><i className="fa fa-sign-in" aria-hidden="true" /></span>
                            <span>Join Room</span>
                        </a>
                    </li>
                    <li className={selectedTab === createRoomTab ? "is-active" : ""}>
                        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                        <a className="px-5" onClick={() => setSelectedTab(createRoomTab)}>
                            <span className="icon is-small"><i className="fa fa-user-plus" aria-hidden="true" /></span>
                            <span>Create Room</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="field">
                <label className="label">URL</label>
                <div className="control">
                    <input className="input"
                           type="text"
                           defaultValue={syncOptions.url ?? ""}
                           disabled={false}
                           onChange={(e) => setSyncOptions({...syncOptions, url: e.target.value})}
                           placeholder="http://example.com" />
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
                           placeholder="room-id" />
                </div>
            </div>
            <div className="columns">
                <div className="column is-6">
                    <div className="field">
                        <label className="label">Read Key</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   defaultValue={syncOptions.readKey}
                                   disabled={false}
                                   onChange={(e) => setSyncOptions({...syncOptions, readKey: e.target.value})}
                                   placeholder="" />
                        </div>
                    </div>
                </div>
                <div className="column is-6">
                    <div className="field">
                        <label className="label">Write Key</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   defaultValue={syncOptions.writeKey}
                                   disabled={false}
                                   onChange={(e) => setSyncOptions({...syncOptions, writeKey: e.target.value})}
                                   placeholder="" />
                        </div>
                    </div>
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

            { selectedTab === joinRoomTab ?
                <JoinRoomForm syncState={syncState}
                              syncOptions={syncOptions}
                              startSync={startSync}
                              closeSyncModal={closeSyncModal} />
                :
                <CreateRoomForm createRoom={() => { createRoomAndStartSync(syncOptions) }}
                                closeSyncModal={closeSyncModal} />
            }
        </>
    )
}


const SyncModalConnectedBody = ({syncOptions, setSyncOptions, syncData, syncState, stopSync, updateMemberData, closeSyncModal}) => {
    if (syncData.members === null || syncData.me === null) {
        return ""
    }
    return (
        <>
            <div className="field">
                <label className="label">My Name</label>
                <div className="control">
                    <input className="input"
                           type="text"
                           defaultValue={syncOptions.memberName}
                           disabled={false}
                           onChange={(e) => setSyncOptions({...syncOptions, memberName: e.target.value})}
                           placeholder="" />
                </div>
            </div>

            <div className="field is-grouped is-grouped-right">
                <div className="control">
                    <button className="button is-success"
                            onClick={updateMemberData}>Update</button>
                </div>
                {renderConnectButton(syncOptions, syncState, f => f, stopSync)}
            </div>

            <hr className="my-5" />
            <div className="columns is-multiline">
                {syncData.members.map((member) => {
                    return (
                        <div key={member.id} className="column is-4">
                            <p className={member.id === syncData.me.id ? "has-text-weight-bold" : ""}>
                                {member.data.name ?? member.id}
                            </p>
                        </div>
                    )
                })}
            </div>
            <ul>

            </ul>

        </>
    )
}

export const SyncModal = ({syncOptions, setSyncOptions, syncData, syncState, startSync, stopSync, updateMemberData, createRoomAndStartSync, closeSyncModal}) => {
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
                    {
                        syncState === connectingState || syncState === disconnectedState ?
                            <SyncModalConnectBody syncOptions={syncOptions}
                                                  setSyncOptions={setSyncOptions}
                                                  syncState={syncState}
                                                  startSync={startSync}
                                                  createRoomAndStartSync={createRoomAndStartSync}
                                                  closeSyncModal={closeSyncModal} />
                            :
                            <SyncModalConnectedBody syncOptions={syncOptions}
                                                    setSyncOptions={setSyncOptions}
                                                    syncData={syncData}
                                                    syncState={syncState}
                                                    stopSync={stopSync}
                                                    updateMemberData={updateMemberData}
                                                    closeSyncModal={closeSyncModal} />
                    }
                </section>
            </div>
        </div>
    )
}
