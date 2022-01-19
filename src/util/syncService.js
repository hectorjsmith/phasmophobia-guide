export const [disconnectedState, connectingState, connectedState] = [0, 1, 2]

let socket = null

export const CreateRoom = (url, id, name, permissions) => {

}

export const StartSync = (syncState, setSyncState, syncData, setSyncData, syncOptions) => {
    setSyncState(connectingState)
    connect(syncOptions,
        () => setSyncState(connectedState),
        () => setSyncState(disconnectedState),
        (message) => onMessage(message, syncData, setSyncData))
}

export const StopSync = (syncState, setSyncState) => {
    disconnect(() => setSyncState(disconnectedState))
}

export const UpdateRoomState = (syncOptions, writeKey, version, newData) => {
    if (socket === null) {
        console.log("[sock] not connected")
        return
    }
    let payload = {
        "id": "uahiegh",
        "command": "post/state",
        "status": 200,
        "body": {
            "writeKey": writeKey,
            "version": version,
            "data": newData
        }
    }
    socket.send(JSON.stringify(payload))
}

export const UpdateMemberData = (syncOptions, memberKey, newData) => {
    if (socket === null) {
        console.log("[sock] not connected")
        return
    }
    let payload = {
        "id": "oaieja",
        "command": "post/member",
        "status": 200,
        "body": {
            "memberKey": memberKey,
            "data": newData
        }
    }
    socket.send(JSON.stringify(payload))
}

const onMessage = (message, syncData, setSyncData) => {
    let payload = JSON.parse(message)
    switch (payload.command) {
        case "welcome":
            setSyncData({
                me: payload.body.member,
                state: payload.body.room.state,
                members: payload.body.room.members
            })
            break;
        case "update/members":
            setSyncData({...syncData, members: payload.body});
            break;
        case "update/state":
            setSyncData({...syncData, state: payload.body})
            break;
        default:
            console.log(`[sock] unrecognized message type: ${payload.command}`)
    }
}

const disconnect = (onClose = () => {}) => {
    if (socket !== null) {
        socket.close(1000)
        socket = null
        onClose()
    }
}

const connect = (syncOptions, onOpen = f => f, onClose = f => f, onMessage = f => f) => {
    if (socket != null) {
        disconnect()
    }

    let fullUrl = `ws://localhost:8080/api/v0/room/${syncOptions.roomId}/connect`
    console.log(`[sock] connecting to '${fullUrl}'`)
    socket = new WebSocket(fullUrl);

    socket.onerror = function(error) {
        console.log(`[sock] connection error: ${error.message}`);
    };

    socket.onopen = function(event) {
        onOpen()
        console.log(`[sock] connection open`);
    }

    socket.onmessage = function(event) {
        console.log(`[sock] message received: ${event.data}`);
        onMessage(event.data)
    }

    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[sock] connection closed cleanly (code=${event.code}, reason=${event.reason})`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[sock] connection died');
        }
        onClose()
    }
}

