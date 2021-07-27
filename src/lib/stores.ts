import {readable, writable} from 'svelte/store'
import Cookies from 'js-cookie';
console.log("This from the stores.ts")
export const id_token = writable("")
export const refresh_token = writable("")
export const device_id = writable("")