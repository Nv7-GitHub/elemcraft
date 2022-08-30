<script lang="ts">
  import { picked } from "./data";
  import Element from "./Element.svelte";
  import { scale, slide } from "svelte/transition";

  let id = -1;

  function choose() {
    if (id >= 0) {
      // Already picked, remove
      id = -1;
    } else {
      id = $picked;
      picked.set(-1);
    }
  }

  export let transition: any;
</script>

<div class="cell" on:click={choose} in:transition out:transition>
  {#if id >= 0}
    <div in:scale out:scale class="container">
      <Element id={id}></Element>
    </div>
  {/if}
</div>

<style>
  .cell {
    background-color: #ffffff;
    width: 10vh;
    height: 10vh;
    border: 1px solid #000000;
    border-radius: 2.5vh;
    margin: 0.5vh;
    transition-duration: 0.1s;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .container {
    pointer-events: none;
  }
</style>