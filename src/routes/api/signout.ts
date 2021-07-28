import https from 'https'
import { api,WEBSITE_URL } from '$lib/constants'
import jwt_decode from 'jwt-decode'

const parseCookies = (cookie:string)=>{
    if(!cookie) return {}
    const cookieArr:string[] = cookie.split(';')
    let list:any = {}
    cookieArr?.forEach(i=>{
        console.log("cookie: ",i)
        let [key,val] = i.split('=')
        key = key.trim()
        val = val.trim()
        list[key] = val
    })
    return list 
}


export const get = async ({headers,params,query})=>{
    console.log("SignOut API")
    console.log({headers,params,query})
    const signOutApiRoute = new URL(api.get("logout"))
    const cookies = parseCookies(headers?.cookie)
    console.log({cookies})
    const rt = cookies["refresh_token"]
    const it = cookies["id_token"]
    console.log({rt,it})
    if(rt && it){

        const jwt_payload:any = jwt_decode(it)
        console.log({jwt_payload})

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        const opts = {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: await JSON.stringify({refresh_token:rt, email:jwt_payload?.email}),
            agent:httpsAgent,
        }
        console.log("started fetch")
        const res = await fetch(signOutApiRoute.toString(),opts)
        console.log(res)
        const data = await res.json()
        // const data = {status:200,newtoken:false,id_token:''}
        console.log({data})
        if(data.status == 200){
            const rt_cookie = `refresh_token=;Path=/;maxAge=0;`
            const it_cookie = `id_token=;Path=/;maxAge=0;`
            return {
                headers:{
                    'set-cookie': [rt_cookie,it_cookie],
                    Location: WEBSITE_URL,
                },
                status:302
            }
        }
        
    }
    return {
        headers:{
            Location:WEBSITE_URL
        },
        status:302
    }
}