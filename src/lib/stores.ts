import {readable, writable} from 'svelte/store'
import Cookies from 'js-cookie';
console.log("This from the stores.ts")
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

export const clips = writable({})

export const wsStore = readable(null,(set)=>{
    if(typeof window === 'undefined') return
    console.log("wsStore start function")
    let idToken = Cookies.get('id_token') 
    let deviceId =Cookies.get('device_id')
    let wsUrl = wsRoute + `?id_token=${idToken}&` + `device_id=${deviceId}`
    console.log(wsUrl)
    set(new WebSocket(wsUrl.toString()))

    return function stop(){console.log("WsStore stop function")}
})