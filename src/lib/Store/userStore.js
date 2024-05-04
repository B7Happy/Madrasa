import { writable } from "svelte/store";

//export const user = writable();
const state = {
    initialized: false,
    signedIn: false,
    username: undefined,
    error: undefined
  }
export const user = function () {
	const { subscribe, set } = writable('init');
  return {
    subscribe,
    // @ts-ignore
    signout: () => { set(null) },
	signin:  () => { set('John') }
}
}()

export const userProfile = writable({ isLoggedIn: false, role: '' });