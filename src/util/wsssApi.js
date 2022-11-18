
class WsssSync {
    constructor() {
        this.socket = null
        this.subscribers = {}
    }

    subscribe = (event, handler) => {
        let subs = this.subscribers[event]
        if (!subs) {
            subs = []
        }
        subs.push(handler)
        this.subscribers[event] = subs
    }

    disconnect = () => {
        if (this.socket) {
            this.socket.close(1000);
            this.socket = null
        }
    }

    sendMessage = (payload) => {
        console.log("[sock] sending message")
        this.socket.send(JSON.stringify(payload))
    }

    connect = (syncOptions) => {
        if (this.socket) {
            console.log("[sock] already connected")
            return
        }

        let baseUrl = syncOptions.url.replace("https", "wss").replace("http", "ws")
        let fullUrl = `${baseUrl}/api/v0/room/${syncOptions.roomId}/connect`
        if (syncOptions.readKey && syncOptions.readKey !== "") {
            fullUrl += `?readKey=${syncOptions.readKey}`
        }
        console.log(`[sock] connecting to '${fullUrl}'`)
        this.socket = new WebSocket(fullUrl);

        this.socket.onerror = function(error) {
            console.log(`[sock] connection error: ${error.message}`);
        };

        this.socket.onopen = function(event) {
            console.log(`[sock] connection open`);
        }

        this.socket.onmessage = (event) => this.onMessage(event.data)

        this.socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[sock] connection closed cleanly (code=${event.code}, reason=${event.reason})`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.log('[sock] connection died');
            }
        }
    }

    onMessage = (message) => {
        let payload = JSON.parse(message)
        let command = payload.command
        let subs = this.subscribers[command]
        if (subs) {
            console.log("[wsss] sending to sub")
            subs.forEach((s) => s(payload))
        }
    }
}

export default WsssSync = new WsssSync()
