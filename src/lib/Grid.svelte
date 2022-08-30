<script lang="ts">
import GridCell from "./GridCell.svelte";

  const WIDTH = 5;
  const HEIGHT = 5;
</script>

<div class="workspace">
  <div class="grid">
    {#each {length: HEIGHT} as _}
      <div class="row">
        {#each {length: WIDTH} as _}
          <GridCell></GridCell>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .workspace {
    background-color: #fafafa;
    width: calc(100vw - 10vh);
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .grid {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
  }
</style>