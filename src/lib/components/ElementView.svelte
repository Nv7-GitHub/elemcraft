<script lang="ts">
  import type { Element } from "$lib/servers";
  import { createEventDispatcher } from "svelte";
  export let el: Element;

  const dispatch = createEventDispatcher();
</script>

<div class="element" style:background-color={`#${el.color.toString(16).padStart(6, '0')}`} on:click={(e) => {dispatch('click', e)}}>
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