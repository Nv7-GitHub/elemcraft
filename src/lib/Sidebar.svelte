<script>
import Element from "./Element.svelte";

</script>
<div class="sidebar">
  <Element name="Air"></Element>
</div>

<style>
  .sidebar {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 10vh;
    background-color: #ffffff;

    display: flex;
    flex-direction: column;
  }
</style>