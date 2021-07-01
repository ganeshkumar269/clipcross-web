import https from 'https'


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
    const reqType = query.get("request_type")
    // const  = query.get("request_type")
    const signOutApiRoute = new URL("https://localhost:3000/logout")
    const cookies = parseCookies(headers?.cookie)
    console.log({cookies})
    const rt = cookies["refresh_token"]
    console.log({rt})
    if(rt ){
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        const opts = {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: await JSON.stringify({refresh_token:rt}),
            agent:httpsAgent,
        }
        console.log("started fetch")
        const res = await fetch(signOutApiRoute.toString(),opts)
        console.log(res)
        const data = await res.json()
        // const data = {status:200,newtoken:false,id_token:''}
        console.log({data})
        if(data.status == 200){
            const rt_cookie = `refresh_token=;Path=;Expires=0;`
            const it_cookie = `id_token=;Path=;maxAge=0;`
            return {
                headers:{
                    'set-cookie': [rt_cookie,it_cookie],
                    Location:"http://localhost:5000/",
                },
                status:302
            }
        }
        
    }
    return {
        headers:{
            Location:"http://localhost:5000"
        },
        status:302
    }
}