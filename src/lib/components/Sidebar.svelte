<script>
import { inv } from "../data";
import Element from "./Element.svelte";
import { scale } from "svelte/transition";

</script>
<div class="sidebar">
  {#each $inv as id}
    <div in:scale>
      <Element id={id}></Element>
    </div>
  {/each}
</div>

<style>
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 10vh;
    background-color: #ffffff;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;

    transition-duration: 0.1s;
  }
</style>