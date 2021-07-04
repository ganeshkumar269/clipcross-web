<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	const signOut = ()=>{
		goto('/api/signout')
	}
</script>


<main>
	<button on:click="{signOut}" style="width: 100px;">LogOut</button>
	<a href="/">Home</a>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>
