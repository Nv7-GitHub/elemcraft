<script lang="ts">
  import { tick } from "svelte";
  import { elements, picked } from "./data";

  export let id: number;
  export let picker = false;

  let el = elements[id];

  async function pick() {
    if (!picker) {
      picked.set(-1);
      await tick()
      picked.set(id);
    }
  }

  $: el = elements[id];
</script>

<div class="element" style:background-color={el.color} on:click={pick}>
  {el.name}
</div>

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