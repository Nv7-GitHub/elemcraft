<script lang="ts">
  import { picked } from "./data";
  import Element from "./Element.svelte";
  import { scale } from "svelte/transition";

  let mousex = 100;
  let mousey = 100;

  function updateMouse(e: MouseEvent) {
    mousex = e.clientX;
    mousey = e.clientY;
  }
</script>

<svelte:window on:mousemove={updateMouse}></svelte:window>

{#if $picked >= 0}
  <div in:scale out:scale class="picked" style:top={mousey + "px"} style:left={mousex + "px"}>
    <Element id={$picked} picker={true}></Element>
  </div>
{/if}

<style>
  .picked {
    position: absolute;
    pointer-events: none;
  }
</style>