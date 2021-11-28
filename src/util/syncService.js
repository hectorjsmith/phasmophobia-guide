export const [disconnectedState, connectingState, connectedState] = [0, 1, 2]

export const StartSync = (syncState, setSyncState) => {
    setSyncState(connectingState)
    setSyncState(connectedState)
}

export const StopSync = (syncState, setSyncState) => {
    setSyncState(disconnectedState)
}
