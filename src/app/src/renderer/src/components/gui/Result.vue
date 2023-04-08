<template>
  <div class="result-container">
    <div class="result-text">
      800
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Result'
})
</script>

<style scoped lang="scss">
.result-container {
  display: flex;
  justify-content: flex-end;

  .result-text {
    display: block;
    transform: skewX(8deg);
    padding: 8px;
    font-size: 2.5rem;
    font-weight: 500;
  }
}
</style>
