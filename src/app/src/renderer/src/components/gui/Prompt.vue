<template>
  <div class="prompt-container">
    <div class="prompt-text">
      20*sqrt(40)
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Prompt'
})
</script>

<style lang="scss" scoped>
.prompt-container {
  display: flex;

  .prompt-text {
    display: block;
    transform: skewX(8deg);
    padding: 8px;
    font-size: 1.5rem;
  }
}
</style>