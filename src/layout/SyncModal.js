import { useContext, useEffect, useRef, useState } from 'react'
import { SyncContext } from '../context/SyncContext'

const checkUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9-_]+$/
  return username && username.length <= 20 && usernameRegex.test(username)
}

const checkRoomId = (roomId) => {
  const cleanRoomId = roomId.replace(/ /g, '')
  const roomIdRegex = /^[0-9]+$/
  return (
    roomId &&
    cleanRoomId.length >= 6 &&
    cleanRoomId.length <= 12 &&
    roomIdRegex.test(cleanRoomId)
  )
}

const RenderFormBody = ({
  syncState,
  setSyncState,
  onConnect,
  onDisconnect,
}) => {
  const {room, setRoom, userName, setUserName, isConnected} = useContext(SyncContext)

  const [usernameValid, setUsernameValid] = useState(
    checkUsername(userName),
  )
  const [roomIdValid, setRoomIdValid] = useState(checkRoomId(room))

  const onUsernameChange = (e) => {
    const username = e.target.value
    if (!checkUsername(username)) {
      setUsernameValid(false)
      return
    }
    setUsernameValid(true)
    setUserName(username)
  }

  const onRoomIdChange = (e) => {
    const roomId = e.target.value
    if (!checkRoomId(roomId)) {
      setRoomIdValid(false)
      return
    }
    setRoomIdValid(true)
    setRoom(roomId)
  }

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [isConnected])

  return (
    <>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            defaultValue={userName ?? ''}
            disabled={isConnected}
            onChange={onUsernameChange}
            maxLength={20}
            placeholder="username"
            ref={inputRef}
          />
        </div>
        {usernameValid ? null : (
          <p class="help is-danger">This username is invalid</p>
        )}
      </div>

      <div className="field">
        <label className="label">Room ID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            defaultValue={room ?? ''}
            disabled={isConnected}
            onChange={onRoomIdChange}
            placeholder="000 000"
          />
        </div>
        {roomIdValid ? null : (
          <p class="help is-danger">This room ID is invalid</p>
        )}
      </div>

      <div className="field is-grouped is-grouped-centered">
        <div className="control" hidden={!isConnected}>
          <button className="button is-danger" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
        <div className="control" hidden={isConnected}>
          <button
            className="button is-success"
            disabled={!usernameValid || !roomIdValid}
            onClick={onConnect}
          >
            Connect
          </button>
        </div>
      </div>
    </>
  )
}

export const SyncModal = ({
  syncState,
  setSyncState,
  onConnect,
  onDisconnect,
  toggleSyncModalOpen,
}) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={toggleSyncModalOpen} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-uppercase has-letter-spacing">
            <span className="icon mr-3">
              <i className="fa fa-users" />
            </span>
            Realtime Sync
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={toggleSyncModalOpen}
          />
        </header>
        <section className="modal-card-body">
          <RenderFormBody
            syncState={syncState}
            setSyncState={setSyncState}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
          />
        </section>
      </div>
    </div>
  )
}
