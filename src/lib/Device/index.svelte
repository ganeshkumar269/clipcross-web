<script lang='ts'>
    import handleSignOut from "$lib/auth/handleSignOut";    
    // export let deviceName:string = ''
    export let deviceId:string = ''
</script>

<main on:dblclick>
    <span>Device Id : {deviceId}</span>
    <button on:click={()=>handleSignOut(deviceId)}>LogOut</button>
</main>

<style>
    main {
        background-color: aqua;
        align-content:inherit;
        margin:auto;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 50%;
        padding: 10px;
    }
</style>