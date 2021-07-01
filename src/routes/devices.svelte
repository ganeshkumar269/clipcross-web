<script lang="ts">
	import {fade,scale} from "svelte/transition"
	import {flip} from "svelte/animate"

	// import DeviceComp from "./DeviceComp.svelte";
	import {activeDevicesRoute, authRoute, id_token,refresh_token,devices} from '$lib/stores'
	import removeItemFromArray from '$lib/removeItemFromArray'
	import handleAuthentication from "$lib/auth/handleSignIn";

	export let name: string;
	let currentPage = "clips"
	let deviceArrayLength:number = -1


	let unsub = devices.subscribe(value => deviceArrayLength = value.length)


</script>

<main>
	<h1>Hello {name}!</h1>
	<h3>device array length {deviceArrayLength}</h3>
	<!-- <button on:click={signInButtonClicked}>SignIn</button> -->
	<!-- <button on:click={clearURL}>clearURL</button> -->
	{#if currentPage == "clips"}
		Device
	{/if}
	<!-- {#each devices as device (device)}
		<div in:fade out:scale|local animate:flip={{duration: 500}}>
			<DeviceComp deviceId={device} on:removeDevice={(event)=>{removeItemFromArray(event.detail.text,devices)}}/> 
		</div>
	{:else}
		<p in:fade style="color: #69ca8e">ఏ పరికరాలు లేవు 😥 </p>
	{/each} -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>