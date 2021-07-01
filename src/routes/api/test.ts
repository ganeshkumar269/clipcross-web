export const get = async ({headers,params,query})=>{
    console.log(headers,query,params)
    return {
        headers:{
            'set-cookie':[
                'testapi=sdad'
            ],
            Location:"http://localhost:5000/",
        },
        status:302
    }
}