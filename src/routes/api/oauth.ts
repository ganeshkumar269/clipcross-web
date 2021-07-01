import https from 'https'
import fs from 'fs'
export const get = async ({params,query,headers})=>{
    console.log("OAUTH API")
    console.log({headers,params,query})
    const request_type = query.get("request_type")
    const port = query.get("port")
    if(request_type == undefined)
        return {status:400}
    const authURL = new URL("https://localhost:3000/auth")
    authURL.searchParams.append("request_type",request_type)
    authURL.searchParams.append("port",port)

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const opts = {
        method:"GET",
        agent:httpsAgent,
    }
    console.log(opts)
    const res = await fetch(authURL.toString(),opts)

    console.log(res)
    const data = await res.json()
    console.log(data)
    if(data.status != 200)
        return {status:data.status}
    return {
        headers:{
            Location:data.redirect_url,
        },
        status:302
    }
}