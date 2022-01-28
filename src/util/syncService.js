import WsssSync from "./wsssApi";

export const [disconnectedState, connectingState, connectedState] = [0, 1, 2]

export const Init = (evidenceData, setEvidenceData, setSyncData) => {
    WsssSync.subscribe("welcome", (payload) => {
        setSyncData({
            me: payload.body.member,
            state: payload.body.room.state,
            members: payload.body.room.members
        })
        setEvidenceData(payload.body.room.state.data)
    })
    WsssSync.subscribe("update/members", (payload) => {
        setSyncData((prevState) => {
            return {...prevState, members: payload.body}
        })
    })
    WsssSync.subscribe("update/state", (payload) => {
        setSyncData((prevState) => {
            return {...prevState, state: payload.body}
        })
        setEvidenceData(payload.body.data)
    })
}

export const CreateRoom = (syncOptions, initialState) => {
    let payload = {
        id: "",
        name: "",
        state: initialState,
        permissions: {},
    }
}

export const StartSync = (syncState, setSyncState, syncData, setSyncData, syncOptions) => {
    setSyncState(connectingState)
    WsssSync.connect(syncOptions.roomId);
    setSyncState(connectedState)
}

export const StopSync = (syncState, setSyncState) => {
    WsssSync.disconnect()
    setSyncState(disconnectedState)
}

export const UpdateRoomState = (syncOptions, syncData, newData) => {
    let payload = {
        "id": "uahiegh",
        "command": "post/state",
        "status": 200,
        "body": {
            "writeKey": syncOptions.writeKey,
            "version": syncData.state.version,
            "data": newData
        }
    }
    WsssSync.sendMessage(payload)
}

export const UpdateMemberData = (syncOptions, memberKey, newData) => {
    let payload = {
        "id": "oaieja",
        "command": "post/member",
        "status": 200,
        "body": {
            "memberKey": memberKey,
            "data": newData
        }
    }
    WsssSync.sendMessage(payload)
}
