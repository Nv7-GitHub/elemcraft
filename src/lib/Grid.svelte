<script lang="ts">
  const WIDTH = 5;
  const HEIGHT = 5;
</script>

<div class="workspace">
  <div class="grid">

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
    background-color: #ff0000;
    width: 50vh;
    height: 50vh;
  }
</style>