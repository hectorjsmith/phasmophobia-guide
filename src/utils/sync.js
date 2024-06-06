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
  console.log('syncing change', data)
  publishNewState(roomId, userName, data)
}

const onRawSync = (setDataFromSync) => (rawData) => {
  const data = rawData.new.state
  console.log('on raw sync', rawData, data)
  setDataFromSync(data)
}

const onRawLoad = (setDataFromSync) => (rawData) => {
  const data = rawData.data?.[0]?.state
  console.log('on raw load', rawData, data)
  setDataFromSync(data)
}

const publishNewState = (roomId, userName, data) => {
  console.log('publishing new state', data)
  supabase
    .from('room_state')
    .insert({
      room_id: roomId,
      state: data,
      updated_by: userName,
    })
    .then(() => console.log('published new state', data))
}

const loadCurrentRoomState = (roomId, handler) => {
  supabase
    .from('room_state')
    .select('*')
    .eq('room_id', roomId)
    .order('set_at', { ascending: false })
    .limit(1)
    .then(handler)
}

const subscribeForUpdates = (roomId, handler) => {
  const channel = supabase.channel(roomId)
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
