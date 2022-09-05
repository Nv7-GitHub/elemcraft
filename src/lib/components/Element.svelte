<script lang="ts">
  import { onMount, tick } from "svelte";
  import { server, picked } from "../data";
  import type { Element } from "$lib/servers";
  import ElementView from "./ElementView.svelte";

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
  <ElementView el={el} on:click={pick}></ElementView>
{/if}