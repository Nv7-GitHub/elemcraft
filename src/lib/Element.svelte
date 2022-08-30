<script lang="ts">
  export let name: string;
  export let color: string;
</script>

<div class="element" style:background-color={"#" + color}>
  {name}
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