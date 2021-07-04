<script lang='ts'>
    import { devices, id_token, refresh_token, wsRoute,clips,wsStore } from '$lib/stores'
    import md5 from 'md5'
    import ClipComp from '$lib/Clip/index.svelte'
    import type {Clip} from 'src/global'
    import { onDestroy, onMount } from 'svelte';
    import Cookies from 'js-cookie';
    
    let tempClip:Clip = {
        value:"temp value",
        format:"temp format",
        timestamp:4,
        hash:"temp hash"
    }
    
    let idToken = Cookies.get('id_token') 
    let deviceId =Cookies.get('device_id')
    let clipsArray: any = {};
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
            clipsArray = dataJson.clips
        }
        else if(dataJson.updateClip == true){
            dataJson?.vcbIds?.forEach(el=>{
                clipsArray[dataJson.device_id][el] = dataJson?.clip 
            })
        }
    }
    
    const updateRemoteClip = async (cbTextValue:string)=>{
        // document.execCommand('copy')
        console.log(cbTextValue)
        if(cbTextValue){
            let clip:Clip = {
                value:cbTextValue,
                format:"text",
                timestamp:Date.now(),
                hash:md5(cbTextValue)
            }
            const dataToBeSent = {
                clip,
                updateClip : true,
                vcbIds:["default-web"]
            }
            console.log("updateRemoteClip data ",dataToBeSent)
            ws.send(JSON.stringify(dataToBeSent))
        }
    }
    
    
    
    const getClipsFromServer = async ()=>{
        setTimeout(()=>{
            ws.send(JSON.stringify({syncflow:true}))
        },3000)
    }
    let text:HTMLTextAreaElement
    console.log("text Element ", text)
    let currentContent:string
    
    
    const clipboardLoop = setInterval(()=>{
        // text.focus()
        if(typeof window === 'undefined') return
        navigator.clipboard.readText()
        .then(textRead=>{
            console.log("Text Read ",textRead)
            if(currentContent != textRead){
                console.log("Current Content Changed")
                currentContent = textRead
                text.value = currentContent
                clipsArray[deviceId]["default-web"]["value"] = currentContent
                updateRemoteClip(currentContent)
            }
        })
    },1000)

    const writeToClipboard = (str:string)=>{
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
        
        console.log("After Mount Text Element,", text)
    })
    const unsub = wsStore.subscribe(val=>{
        ws=val
        console.log("WebSocket Set in clips.svelte")
        if(ws){
            ws.onopen = onWsOpen
            ws.onmessage = onWsMessage
            ws.onerror = (event)=>{
                console.log("WS ERROR :(")
                console.log(event)
            }
        }
    })
    onDestroy(unsub)
</script>

<svelte:head>
	<title>Clips</title>
</svelte:head>

<main>
    <textarea type="text" bind:this={text}>Temp Text</textarea>
    
    <br>
    <button on:click="{getClipsFromServer}">Get Clips</button>
    <button on:click="{getClipsFromServer}">Refresh</button>
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