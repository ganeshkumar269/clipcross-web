<script lang='ts'>
    export let value:string;
    export let format:string;
    export let timestamp:number;
    export let hash:string;
    export let deviceId:string
    export let vcbId:string

    const formatString = (str:string)=>{
        if(str.length > 50)
            return str.substr(0,50)
        return str
    }

    const handleCopyButton = ()=>{
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.writeText(value)
                .then(t=>{
                    console.log("Successfully updated the clipboard t",t)
                })
            }
        })
    }
    $: formatedString = formatString(value)
</script>

<main>
    <span> {formatedString} </span>
    <span> DeviceId: {deviceId} </span>
    <span> vcbId: {vcbId} </span>
    <button on:click={handleCopyButton}> Copy This Text</button>
</main>

<style>

</style>