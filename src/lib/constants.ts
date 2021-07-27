// const mode = process.env?.isLive ? process.env?.isLive : "testing"
const mode = "testing"

export const WEBSITE_URL = mode == "testing" ? "http://localhost:5000" : "" 

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
const api_live_home = "https://localhost:3000"

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
       if(mode == "testing"){
           return api_testing_home + this.endpoints[route]
       }else{
           return api_live_home + this.endpoints[route]
       } 
    }
}