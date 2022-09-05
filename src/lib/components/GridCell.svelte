<script lang="ts">
  import { COLS, picked, recipe, ROWS } from "../data";
  import Element from "./Element.svelte";
  import { scale } from "svelte/transition";

  export let row: number;
  export let col: number;

  function choose() {
    if ($recipe[row][col] >= 0) {
      // Already picked, remove
      $recipe[row][col] = -1;
      recipe.set($recipe);
    } else {
      $recipe[row][col] = $picked;
      recipe.set($recipe);
      picked.set(-1);
    }
  }

  export let transition: any;
</script>

<div class="cell" on:click={choose} in:transition out:transition>
  {#if row < $ROWS && col < $COLS && $recipe[row][col] >= 0}
    <div in:scale out:scale class="container">
      <Element id={$recipe[row][col]}></Element>
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