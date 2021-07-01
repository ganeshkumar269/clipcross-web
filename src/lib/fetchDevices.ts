import { activeDevicesRoute, id_token } from "./stores"
import Cookies from 'js-cookie'

const fetchDevices = async ():Promise<string[]> => {
    let idToken = Cookies.get('id_token')
    console.log("fetchDevices.ts idToken",idToken)
    id_token.subscribe(value=>idToken=value)

    console.log("Device Route: ", activeDevicesRoute.toString())
    return fetch(activeDevicesRoute.toString(),{
        method:"GET",
        credentials: 'include',
    })
    .then(data=>data.json())
    .then(data=>{
        console.log("FetchDevices.ts data: ", data)
        return data
    })
    .catch(console.log)
}    

export default fetchDevices