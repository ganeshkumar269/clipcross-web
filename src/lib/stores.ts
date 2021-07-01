import {writable} from 'svelte/store'

export const id_token = writable("")
export const refresh_token = writable("")
export const authenticated = writable(false)
export const devices = writable([])
export const apiRoute = new URL("https://localhost:3000/")
// export const apiRoute = new URL("https://")

export const logoutRoute = new URL(apiRoute + "logout")
export const activeDevicesRoute = new URL(apiRoute + "activedevices")
export const authRoute = new URL(apiRoute + "signin?request_type=web")
export const refreshAccessTokenRoute = new URL(apiRoute + "refreshaccesstoken")
export const wsRoute = new URL("wss://localhost:3000")