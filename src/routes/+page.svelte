<script>
import ConnectUi from "$lib/components/ConnectUI.svelte";
import Grid from "$lib/components/Grid.svelte";
import Picker from "$lib/components/Picker.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";
import Suggest from "$lib/components/Suggest.svelte";
import { connected } from "$lib/ui";
</script>


{#if $connected}
<Grid></Grid>
<Sidebar></Sidebar>
<Picker></Picker>
<Suggest></Suggest>
{:else}
<ConnectUi></ConnectUi>
{/if}

