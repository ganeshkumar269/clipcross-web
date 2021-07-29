<script context="module" lang="ts">
	import { Button } from '@colorfuldots/svelteit'
	import { goto } from '$app/navigation';
	import {api, pages, WINDOWS_APP_DOWNLOAD_LINK} from '$lib/constants'
	import { onMount } from 'svelte';

	const handleWebVersionButtonOnClick = (e)=>{
		console.log(e)
		console.log("Clicked Web Version")
		goto(pages.webapp.link)
	}
	const redirectToWindowsAppDownloadPage = (e)=>{
		window.open(WINDOWS_APP_DOWNLOAD_LINK)
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="row">
	<div class="text-center">
		<h1><strong>ClippyCross</strong></h1>
		<br>
		<h3><i>For Everthing Clipboard.</i></h3>
	</div>
	<div id="buttons">
		<Button success outined rounded block on:click={redirectToWindowsAppDownloadPage}><strong>Windows App</strong></Button>
		<br>
		<Button success outined rounded block on:click={handleWebVersionButtonOnClick}><strong>Web Version</strong></Button>
	</div>
</div>
<style>
	#buttons {
		display:grid;
		margin-left: auto;
		margin-right: auto;
		width: 20%;
		margin-top: 5%;
	}
	h1 {
		color : #7582F9;
	}
	h3 {
		color : #CA3E47;
	}
</style>
