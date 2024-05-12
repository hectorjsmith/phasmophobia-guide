import { supabase } from '../util/supabase'

export const newSetAndSyncEvidenceDataFn = (setEvidenceData, syncState) => {
  return (newEvidence) => {
    let result = null
    if (syncState.isConnected) {
      supabase
        .from('room_state')
        .insert({
          room_id: syncState.roomId,
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
  const roomId = syncState.roomId.replace(/ /g, '')
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
