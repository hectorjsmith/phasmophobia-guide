import { supabase } from './supabase'

export const connectSync = (
  setOnChangeHandler,
  setDataFromSync,
  setConnected,
  roomId,
  userName,
) => {
  console.log('connecting ...')
  setOnChangeHandler(() => syncChange(roomId, userName))
  setConnected(roomId, userName)
  loadCurrentRoomState(roomId, onRawLoad(setDataFromSync))
  subscribeForUpdates(roomId, onRawSync(setDataFromSync))
}

export const disconnectSync = (setOnChangeHandler, setDisconnected) => {
  console.log('disconnecting ...')
  setOnChangeHandler(() => () => {})
  setDisconnected()
}

const syncChange = (roomId, userName) => (data) => {
  publishNewState(roomId, userName, data)
}

const onRawSync = (setDataFromSync) => (rawData) => {
  const data = rawData.new.state
  setDataFromSync(data)
}

const onRawLoad = (setDataFromSync) => (rawData) => {
  const data = rawData.data?.[0]?.state
  setDataFromSync(data)
}

const publishNewState = (roomId, userName, data) => {
  const escapedRoomId = escapeRoomId(roomId)
  supabase
    .from('room_state')
    .insert({
      room_id: escapedRoomId,
      state: data,
      updated_by: userName,
    })
    .then(() => console.log('published new state', data))
}

const loadCurrentRoomState = (roomId, handler) => {
  const escapedRoomId = escapeRoomId(roomId)
  supabase
    .from('room_state')
    .select('*')
    .eq('room_id', escapedRoomId)
    .order('set_at', { ascending: false })
    .limit(1)
    .then(handler)
}

const subscribeForUpdates = (roomId, handler) => {
  const escapedRoomId = escapeRoomId(roomId)
  const channel = supabase.channel(escapedRoomId)
  channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
      },
      handler,
    )
    .subscribe()
}

const escapeRoomId = (roomId) => roomId.replace(/\s/g, '')
