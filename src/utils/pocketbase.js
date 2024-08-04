import PocketBase from 'pocketbase';

export const api = new PocketBase(process.env.REACT_APP_POCKETBASE_URL);
