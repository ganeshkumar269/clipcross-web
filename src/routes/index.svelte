<script>
    import { pages } from "$lib/constants";
import { onMount } from "svelte";
    onMount(()=>{
        if(typeof window === "undefined") return
        window.location.replace(pages.home.link)
    })
</script>