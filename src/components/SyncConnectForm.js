import { useRef, useState, useEffect } from "react";
import { isRoomIdValid, isUserNameValid } from "../utils/validation";

export const SyncConnectForm = ({roomId, userName, connect}) => {
    const userNameRef = useRef(null);
    const roomIdRef = useRef(null);

    const [usernameValid, setUsernameValid] = useState(isUserNameValid(userName))
      const [roomIdValid, setRoomIdValid] = useState(isRoomIdValid(roomId))
    
      const onUsernameChange = (e) => {
        const username = e.target.value
        setUsernameValid(isUserNameValid(username))
      }
    
      const onRoomIdChange = (e) => {
        const roomId = e.target.value
        setRoomIdValid(isRoomIdValid(roomId))
      }
    
      useEffect(() => {
        userNameRef.current.focus()
      }, [userNameRef])
    

      const handleConnect = () => {
        connect(roomIdRef.current.value, userNameRef.current.value)
      }

    return (
        <>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            ref={userNameRef}
            className="input"
            type="text"
            defaultValue={userName ?? ''}
            onChange={onUsernameChange}
            maxLength={20}
            placeholder="username"
          />
        </div>
        {usernameValid || (
          <p class="help is-danger">This username is invalid</p>
        )}
      </div>

      <div className="field">
        <label className="label">Room ID</label>
        <div className="control">
          <input
            ref={roomIdRef}
            className="input"
            type="text"
            defaultValue={roomId ?? ''}
            onChange={onRoomIdChange}
            placeholder="000 000"
          />
        </div>
        {roomIdValid || (
          <p class="help is-danger">This room ID is invalid</p>
        )}
      </div>

      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button
            className="button is-success"
            disabled={!(usernameValid && roomIdValid)}
            onClick={handleConnect}
          >
            Connect
          </button>
        </div>
      </div>
    </>
    )
}
