<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import handleSignIn from "$lib/auth/handleSignIn";
	import fetchDevices from "$lib/fetchDevices";
	import { authRoute, devices, id_token } from "$lib/stores";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";
	import { goto } from '$app/navigation';


	let signInButtonClicked;
	const closeTheTab = () => window.close()
	let doStuff = async () =>{
		let search_string = window.location.search.toString()
		console.log(search_string)
		if(search_string.startsWith("?authcallback")){
			console.log("Cookies: " , Cookies.get())
			console.log("Equal")
			let dev = await fetchDevices()
			devices.set(dev)
			console.log(dev)
		}
		if(search_string.startsWith("?access_token")){
			let dev = await fetchDevices()
			devices.set(dev)
			console.log(dev)
		} 
	}
	onMount(()=>{
		signInButtonClicked =() => {
			// window.open(authRoute.toString())
			goto('/api/signin?request_type=web')
		}
		// doStuff()
		console.log("INDEX PAGE")
		id_token.set(Cookies.get('id_token'))
		console.log("cookies:")// + Cookies.get("refresh_token"))
		console.log(typeof(Cookies.get()))
		for(let [key,val] of Object.entries(Cookies.get()))
			console.log(val,key)
	})
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
<button on:click={signInButtonClicked}>SignIn</button>
<a href="/clips">Clips</a>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
