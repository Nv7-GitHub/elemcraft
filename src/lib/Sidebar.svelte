<script>
import Element from "./Element.svelte";

</script>
<div class="sidebar">
  <Element name="Air" color="00ffff"></Element>
  <Element name="Earth" color="964b00"></Element>
  <Element name="Fire" color="ffa500"></Element>
  <Element name="Water" color="0000ff"></Element>
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