import { supabase } from '../utils/supabase'

export const newSetAndSyncEvidenceDataFn = (setEvidenceData, syncState) => {
  return (newEvidence) => {
    let result = null
    if (syncState.isConnected) {
      const roomId = escapeRoomId(syncState.roomId)
      supabase
        .from('room_state')
        .insert({
          room_id: roomId,
          state: newEvidence,
          updated_by: syncState.userId,
        })
        .then(() => (result = setEvidenceData(newEvidence)))
    } else {
      result = setEvidenceData(newEvidence)
    }
    return result
  }
}

export const handleConnect = (syncState, setSyncState, setEvidenceData) => {
  const roomId = escapeRoomId(syncState.roomId)
  const onSync = newSyncEventHandler(setEvidenceData)

  subscribeForUpdates(roomId, onSync)
  getCurrentRoomState(roomId, setEvidenceData)
  setSyncState({
    ...syncState,
    isConnected: true,
  })
}

export const handleDisconnect = (syncState, setSyncState) => {
  setSyncState({
    ...syncState,
    isConnected: false,
  })
}

const escapeRoomId = (roomId) => {
  return roomId.replace(/ /g, '')
}

const newSyncEventHandler = (setEvidenceData) => {
  return (payload) => {
    const newState = payload.new.state
    setEvidenceData(newState)
  }
}

const subscribeForUpdates = (roomId, onSync) => {
  const channel = supabase.channel(roomId)
  channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
      },
      onSync,
    )
    .subscribe()
}

const getCurrentRoomState = (roomId, setEvidenceData) => {
  supabase
    .from('room_state')
    .select('*')
    .eq('room_id', roomId)
    .order('set_at', { ascending: false })
    .limit(1)
    .then((value) => {
      if (value.data && value.data[0]) {
        setEvidenceData(value.data[0].state)
      }
    })
}
