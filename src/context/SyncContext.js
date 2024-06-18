import { createContext, useState } from 'react'

const SyncContext = createContext()

const SyncContextProvider = ({ children }) => {
  const isSyncFeatureEnabled = process.env.REACT_APP_REALTIME_SYNC_ENABLED === 'true'
  const [room, setRoom] = useState('')
  const [userName, setUserName] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const setConnected = (roomId, userName) => {
    setRoom(roomId)
    setUserName(userName)
    setIsConnected(true)
  }

  const setDisconnected = () => {
    setIsConnected(false)
  }

  return (
    <SyncContext.Provider
      value={{
        isSyncFeatureEnabled,
        room,
        userName,
        isConnected,
        setConnected,
        setDisconnected,
      }}
    >
      {children}
    </SyncContext.Provider>
  )
}

export { SyncContext, SyncContextProvider }
