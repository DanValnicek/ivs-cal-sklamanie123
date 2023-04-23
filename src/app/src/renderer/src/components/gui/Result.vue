<template>
  <div class="result-container">
    <div class="result-text" :class="{ error: error }">
      {{ value || 0 }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Result',
  props: {
    value: {
      type: Number
    },
    error: {
      type: Boolean
    }
  },
  data() {
    return {
      result: null
    }
  }
})
</script>

<style scoped lang="scss">
.result-container {
  display: flex;
  justify-content: flex-end;
  padding: 0px 12px;

  .result-text {
    display: block;
    transform: skewX(8deg);
    padding: 8px;
    font-size: 32px;
    font-weight: 500;

    &.error {
      color: var(--c-error);
    }
  }
}
</style>
