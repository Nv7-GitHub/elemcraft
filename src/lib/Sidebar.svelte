<script>
import { elements } from "./data";
import Element from "./Element.svelte";

</script>
<div class="sidebar">
  {#each elements as _, id}
    <Element id={id}></Element>
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
  }
</style>