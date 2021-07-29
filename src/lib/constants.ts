// const mode = process.env?.isLive ? process.env?.isLive : "testing"
let mode = "live"

export const WEBSITE_URL = mode == "testing" ? "http://localhost:5000" : "https://clipcross-web.vercel.app" 
// export const WEBSITE_URL = "http"
export const WINDOWS_APP_DOWNLOAD_LINK = "https://1drv.ms/u/s!ApWi4MTjMcsap03PPKiHiiFkwMWn?e=g7muyT";

export const pages = {
    "home" : {
        "name" : "Home",
        "link" : "/home"
    },
    "login" : {
        "name" : "Login",
        "link" : "/api/signin?request_type=web"
    },
    "logout" : {
        "name" : "Logout",
        "link" : "/api/signout"
    },
    "webapp" : {
        "name" : "WebApp",
        "link" : "/clips"
    }
}

const api_testing_home = "https://localhost:3000"
const api_live_home = "https://clippycross-server.ddns.net"

export const api = {
    "endpoints" : {
        "home" : "",
        "login" : "/signin",
        "logout" : "/logout",
        "wsHome" :"",
        "token" : "/refreshaccesstoken",
        "auth" : "/auth"
    },
    get(route:string){
        if(route == "wsHome"){
            if(mode =="testing") return "wss://localhost:3000/"
            else return "wss://clippycross-server.ddns.net/"    
        }
        if(mode == "testing"){
            return api_testing_home + this.endpoints[route]
        }else{
            return api_live_home + this.endpoints[route]
        } 
    }
}