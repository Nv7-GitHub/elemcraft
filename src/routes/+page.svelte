<script>
import ConnectUi from "$lib/components/ConnectUI.svelte";
import Grid from "$lib/components/Grid.svelte";
import Picker from "$lib/components/Picker.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";
import Suggest from "$lib/components/Suggest.svelte";
import TopBar from "$lib/components/TopBar.svelte";
import { connected } from "$lib/ui";
</script>


<svelte:head>
  <title>ElemCraft</title>
</svelte:head>

{#if $connected}
<Grid></Grid>
<Sidebar></Sidebar>
<Picker></Picker>
<Suggest></Suggest>
<TopBar></TopBar>
{:else}
<ConnectUi></ConnectUi>
{/if}

