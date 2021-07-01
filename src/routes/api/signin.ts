import https from 'https'
// import http from 'http'


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
    console.log("SignIn API")
    console.log({headers,params,query})
    const reqType = query.get("request_type")
    // const  = query.get("request_type")
    const signInApiRoute = new URL("https://localhost:3000/signin")
    const cookies = parseCookies(headers?.cookie)
    console.log({cookies})
    const rt = cookies["refresh_token"]
    let it = cookies["id_token"]
    console.log({rt,it})
    if(rt && it){
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        const opts = {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: await JSON.stringify({refresh_token:rt,id_token:it}),
            agent:httpsAgent,
        }
        console.log("started fetch")
        const res = await fetch(signInApiRoute.toString(),opts)
        console.log(res)
        const data = await res.json()
        // const data = {status:200,newtoken:false,id_token:''}
        console.log({data})
        if(data.status == 200){
            if(data.newtoken)
            it = data.id_token
            // const rt_cookie = "refresh_token="+rt+";httpOnly=true;domain=localhost"
            // const it_cookie = "id_token="+ it +";domain=localhost"
            const expiryDate = new Date(new Date().getFullYear() + 1, new Date().getMonth()).toUTCString()
            const rt_cookie = `refresh_token=${rt}; Path=/;HttpOnly;Secure;SameSite=Strict;Expires=${expiryDate}`
            const it_cookie = `id_token=${it};Path=/;Expires=${expiryDate};`
            const signInCookie = `signInCookie=${new Date().toString()}; Path=/;`
            return {
                headers:{
                    'set-cookie': [rt_cookie,it_cookie,signInCookie],
                    Location:"http://localhost:5000/",
                },
                status:302
            }
        }
        
    }
    return {
        status:302,
        headers:{

            Location:"http://localhost:5000/api/oauth?request_type="+reqType
        }
    }
}