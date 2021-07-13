import https from 'https'
import md5 from 'md5'

export const get = async ({headers,query}) =>{
    // const queryJson = await JSON.parse(query)
    console.log({headers,query:URLSearchParams})
    const code = query.get('code')
    const state = query.get('state')
    const [reqType,port] = state.split('-')
    console.log({reqType,port})
    let redirect_url = new URL("http://localhost:5000")
    let auth_url = new URL("https://localhost:3000/auth")
    if(reqType == "web"){
        redirect_url = new URL(`http://localhost:5000`)
    }
    if(reqType == "des"){
        redirect_url = new URL(`http://localhost:${port}`)    
    }
    auth_url.searchParams.append("request_type",reqType)
    auth_url.searchParams.append("state",state)
    auth_url.searchParams.append("code",code)

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const opts = {
        method:"GET",
        agent:httpsAgent,
    }
    const res = await fetch(auth_url.toString(),opts)
    const data = await res.json()
    console.log({data})
    if(data.status==200){
        let response_json = {refresh_token:data.refresh_token,id_token:data.id_token,device_id:data.device_id}
        console.log(response_json)
        console.log(redirect_url)
        if(reqType == "web"){
            const expiryDate = new Date(new Date().getFullYear() + 1, new Date().getMonth()).toUTCString()
            const rt_cookie = `refresh_token=${data.refresh_token};Path=/;HttpOnly;Secure;SameSite=Strict;Expires=${expiryDate}`
            const it_cookie = `id_token=${data.id_token};Path=/;Secure;SameSite=Strict;Expires=${expiryDate}`
            const did_cookie = `device_id=${data.device_id};Path=/;Secure;SameSite=Strict;Expires=${expiryDate}`
            const authCallBackCookie = `authCallBackCookie=${new Date().toString()}`
            console.log({rt_cookie,it_cookie,did_cookie})
            return {
                headers:{
                    'set-cookie':[rt_cookie,it_cookie,did_cookie,authCallBackCookie],
                    'Location':redirect_url.toString()
                },
                status:302
            }
        }else {
            redirect_url.searchParams.append("refresh_token",data.refresh_token)
            redirect_url.searchParams.append("id_token",data.id_token)
            redirect_url.searchParams.append("device_id",data.device_id)

            console.log("[authcallback.ts] redirect_url ", redirect_url.toString())

            return {
                status:302,
                headers:{
                    "Location" : redirect_url.toString()
                }
            }

        }
    }

    return {
        status:400,
    }
}

