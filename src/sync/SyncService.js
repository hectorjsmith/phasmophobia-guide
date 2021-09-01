
class SyncService {
    constructor() {
        this.updateHandler = f => f
        this.onConnectHandlers = []
        this.onCloseHandlers = []

        this.onOpen = this.onOpen.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    connect(url, roomId) {
        let fullUrl = `ws://${url}/sync/${roomId}`
        console.log(`[sock] connecting to '${fullUrl}'`)
        this.socket = new WebSocket(fullUrl);

        this.socket.onerror = function(error) {

            console.log(`[sock] connection error: ${error.message}`);
        };

        this.socket.onopen = this.onOpen
        this.socket.onmessage = this.onMessage
        this.socket.onclose = this.onClose
    }

    registerOnUpdateFunc(onUpdate) {
        this.updateHandler = onUpdate
    }

    registerOnConnectFunc(onConnect) {
        this.onConnectHandlers.push(onConnect)
    }

    registerOnCloseFunc(onClose) {
        this.onCloseHandlers.push(onClose)
    }

    sendUpdate(payload) {
        console.log("[sock] sending to server:", payload);
        this.socket.send(JSON.stringify(payload));
    }

    disconnect() {
        this.socket.close(1000)
    }

    isConnected() {
        return this.socket !== undefined && this.socket.readyState === this.socket.OPEN
    }

    onOpen(event) {
        console.log("[sock] connection established");
        this.onConnectHandlers.forEach(handler => handler(event))
    }

    onMessage(event) {
        console.log(`[sock] update from server: ${event.data}`);
        const jsonData = JSON.parse(event.data)
        this.updateHandler(jsonData)
    }

    onClose(event) {
        if (event.wasClean) {
            console.log(`[sock] connection closed cleanly (code=${event.code}, reason=${event.reason})`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[sock] connection died');
        }
        this.onCloseHandlers.forEach(handler => handler(event))
    }
}

export const syncService = new SyncService()