<script lang='ts'>
    import { devices, id_token, refresh_token, wsRoute,clips } from '$lib/stores'
    import md5 from 'md5'
    import ClipComp from '$lib/Clip/index.svelte'
    import type {Clip} from 'src/global'
    import { onDestroy, onMount } from 'svelte';
    import Cookies from 'js-cookie';
    
    let idToken = Cookies.get('id_token') 
    let deviceId =Cookies.get('device_id')
    let clipsArray: any = {};
    let wsUrl = wsRoute + `?id_token=${idToken}&` + `device_id=${deviceId}`
    let prevClipBoardText:string = "This is the first clip"
    let ws:WebSocket;

    const onWsOpen = (event) => {
        console.log("WebScoket Connection Opened")
        const payload = JSON.stringify({"syncflow":true})
        console.log(payload,ws)
        syncflowWithServer()
    }

    const onWsMessage = async (data) => {
        console.log("onMessage",data)
        let dataJson = JSON.parse(data.data.toString())
        console.log(dataJson)
        console.log(typeof(dataJson))
        if(dataJson.syncflow == true){ 
            clipsArray = dataJson.clips
        }
        else if(dataJson.updateClip == true){
            dataJson?.vcbIds?.forEach(el=>{
                clipsArray[dataJson.device_id][el] = dataJson?.clip 
            })
            writeToClipboard(dataJson?.clip?.value)
        }
    }

    const onWsError = (error)=>{
        console.log("Ws Error error, ", error)
    }

    const updateRemoteClip = async (text:string)=>{
        if(text){
            let clip:Clip = {
                value:text,
                format:"text",
                timestamp:Date.now(),
                hash:md5(text)
            }
            const dataToBeSent = {
                clip,
                updateClip : true,
                vcbIds:["default-web"]
            }
            console.log("updateRemoteClip data: ",dataToBeSent)
            ws.send(JSON.stringify(dataToBeSent))
        }
    }
    
    const syncflowWithServer = async ()=>{
        const data = {
            syncflow : true,
            data : {
                "default-web" : {
                    value : prevClipBoardText,
                    timestamp : Date.now(),
                    hash : md5(prevClipBoardText),
                    format: "text"
                }
            }
        }
        ws.send(JSON.stringify(data))
    }
    
    const clipboardLoop = setInterval(async ()=>{
        if(typeof window === 'undefined') return
        if(!document.hasFocus()) return

        const clipboardText = await navigator.clipboard.readText()
        console.log("Text Read ",clipboardText)
        if(prevClipBoardText != clipboardText){
            console.log("Current Content Changed")
            prevClipBoardText = clipboardText
            clipsArray[deviceId]["default-web"]["value"] =prevClipBoardText 
            updateRemoteClip(clipboardText)
        }
    },1000)

    const writeToClipboard = (str:string)=>{
        if(!str) return
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.writeText(str)
            }
        });
    }

    const refreshButton = ()=>{
        clipsArray = clipsArray
    }
    onMount(()=> {
        ws = new WebSocket(wsUrl) 
        if(!ws) return
        ws.onopen = onWsOpen
        ws.onmessage = onWsMessage
        ws.onerror = onWsError
    })
</script>

<svelte:head>
	<title>Clips</title>
</svelte:head>

<main>
    <br>
    <button on:click="{syncflowWithServer}">Get Clips</button>
    <button on:click="{refreshButton}">Refresh</button>
    {#each Object.entries(clipsArray) as [dId, val1], i }
        {#each Object.entries(val1) as [vId, clip]}
            <ClipComp 
                value={clip.value} 
                format={clip.format} 
                timestamp={clip.timestamp}
                hash={clip.hash}
                deviceId={dId}
                vcbId={vId}
            />
        {/each}
    {/each}
</main>

<style>

</style>