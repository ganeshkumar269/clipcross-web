<script lang='ts'>
    import { devices, id_token, refresh_token, wsRoute } from '$lib/stores'
    import md5 from 'md5'
    import ClipComp from '$lib/Clip/index.svelte'
    import type {Clip} from 'src/global'
    import { onMount } from 'svelte';
    import Cookies from 'js-cookie';
    
    let tempClip:Clip = {
        value:"temp value",
        format:"temp format",
        timestamp:4,
        hash:"temp hash"
    }
    
    let idToken = Cookies.get('id_token') 
    let deviceId =Cookies.get('device_id')
    let clips:Clip[] = [tempClip];
    let wsUrl = wsRoute + `?id_token=${idToken}&` + `device_id=${deviceId}`
    // console.log(wsUrl)
    let ws:WebSocket;
    
    const onWsOpen = (event) => {
        console.log("WebScoket Connection Opened")
        const payload = JSON.stringify({"syncflow":true})
        console.log(payload,ws)
        // ws.send(payload)
        getClipsFromServer()
        
    }
    const onWsMessage = async (data) => {
        console.log("onMessage",data)
        let dataJson = JSON.parse(data.data.toString())
        console.log(dataJson)
        console.log(typeof(dataJson))
        if(dataJson.syncflow == true){ 
            delete dataJson.syncflow
            for(const [key,value] of Object.entries(dataJson)){
                console.log({key,value})
                clips.push(value as Clip)
                devices.update(value=>[...value,key.toString()])
            }
        }
        if(dataJson?.status == 500){
            console.log("Got a 500")
            await updateRemoteClip()
        }
    }

    const updateRemoteClip = async ()=>{
        // document.execCommand('copy')
        const cb = navigator.clipboard 
        const cbTextValue = await cb.readText()
        console.log(cbTextValue)
        if(cbTextValue){
            let clip:Clip = {
                value:cbTextValue,
                format:"text",
                timestamp:Date.now(),
                hash:md5(cbTextValue)
            }
            console.log("updateRemoteClip clip",clip)
            ws.send(JSON.stringify({clip,vcbIds:["default-web"]}))
        }
    }



    const getClipsFromServer = async ()=>{
        setTimeout(()=>{
            ws.send(JSON.stringify({syncflow:true}))
        },3000)
    }
    onMount(()=> {
        ws = new WebSocket(wsUrl)
        console.log("ws created")
        // ws.send(JSON.stringify({"status":"hey"}))
        ws.onopen = onWsOpen
        ws.onmessage = onWsMessage
        ws.onerror = (event)=>{
            console.log("WS ERROR :(")
            console.log(event)
        }
    })
</script>

<svelte:head>
	<title>Clips</title>
</svelte:head>

<main>
    <button on:click="{getClipsFromServer}">Get Clips</button>
    {#each clips as clip, i }
        <ClipComp 
            value={clip.value} 
            format={clip.format} 
            timestamp={clip.timestamp}
            hash={clip.hash}
            deviceId={devices[i]}
        />
    {/each}
</main>

<style>

</style>