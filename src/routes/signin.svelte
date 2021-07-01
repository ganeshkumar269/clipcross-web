<script context="module">
	export const load = async ({fetch,page})=>{
		const res = await fetch('/api/signin')
		console.log(res)
		const data = res.data()
		return {
			status:200
		}
	}
</script>


<script lang="ts">
	let loading = false
	const showLoadingScreen = ()=>{
		loading = true
	}
	const onSubmit = ()=>{
		
	}
</script>
<main>
	<h1>Sign In With Google</h1>
	<button on:submit|preventDefault ="{onSubmit}">SignIn</button>
	{#if loading}
		<h1>Loading Bro!</h1>
	{/if}
</main>