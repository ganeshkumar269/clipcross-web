import cleanCurrentURL from "../cleanCurrentUrl"
import { activeDevicesRoute, authenticated, devices, id_token, refresh_token } from "../stores"

const handleSignIn = () => {
    let uri = new URL(window.location.toString())
    

    const idToken = uri.searchParams.get('id_token').toString()
    const refreshToken = uri.searchParams.get('refresh_token').toString()
    
    // cleanCurrentURL() 
    
    console.log({idToken,refreshToken})
    id_token.set(idToken)
    refresh_token.set(refreshToken)
    authenticated.set(true)
}

export default handleSignIn