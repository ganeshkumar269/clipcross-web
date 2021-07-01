<script lang='ts'>
    export let value:string;
    export let format:string;
    export let timestamp:number;
    export let hash:string;
    export let deviceId:string
</script>

<main>
    <span>{value}</span>
    <span>DeviceId: {deviceId}</span>
    <button on:click>Copy</button>
</main>

<style>

</style>