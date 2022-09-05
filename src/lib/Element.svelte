<script lang="ts">
  import { onMount, tick } from "svelte";
  import { server, picked } from "./data";
  import type { Element } from "$lib/servers";

  export let id: number;
  export let picker = false;

  let el: Element;
  
  onMount(async () => {
    el = await $server.element(id);
  })

  async function pick() {
    if (!picker) {
      picked.set(-1);
      await tick()
      picked.set(id);
    }
  }

  $: $server.element(id).then((v) => {el = v});
</script>

{#if el}
<div class="element" style:background-color={`#${el.color.toString(16).padStart(6, '0')}`} on:click={pick}>
  {el.name}
</div>
{/if}

<style>
  .element {
    border-radius: 2vh;
    width: 8.5vh;
    height: 8.5vh;
    margin: 0.5vh;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0.25vh;
  }
</style>