import { id_token, logoutRoute, refresh_token } from "../stores"
let idToken = ""
let refreshToken = ""
const unsub = id_token.subscribe(value=>idToken = value)
const unsub2 = refresh_token.subscribe(value=>refreshToken = value)

const signOutDevice = async (device:string) => {
    console.log(device)
    console.log({idToken})
    if(idToken == '') return
    if(refreshToken == '') return
    const bodyJsonString = JSON.stringify({refresh_token:refreshToken})
    return fetch(logoutRoute.toString(),{
        method:'POST',
        headers:{
            Authorization : 'Bearer ' + idToken,
            'Content-Type': 'application/json',
        },
        body: bodyJsonString 
    })
    .then(data=>data.json())
    .then(data=>{
        console.log(data)
        return data.status
    })
    .catch(console.log)
}

export default signOutDevice