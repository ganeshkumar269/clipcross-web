import signOutDevice from "./signOutDevice"

import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher()


const handleSignOut = async (deviceId:string)=>{
    let result = await signOutDevice(deviceId)
    console.log(result)
    if(result == 200)
        dispatch('removeDevice',{text:deviceId})
}

export default handleSignOut
