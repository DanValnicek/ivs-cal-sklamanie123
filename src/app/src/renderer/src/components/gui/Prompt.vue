<template>
  <div class="prompt-container">
    <div class="prompt-text single-line" contenteditable="true">
      {{ current }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Prompt',
  props: {
    userInput: {
      type: String
    }
  },
  data() {
    return {
      current: '',
    }
  },
  watch: {
    userInput(newVal, oldVal) {
      this.current = `${this.current}${newVal}`;
      console.log(this.current);

    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
.prompt-container {
  display: flex;

  .prompt-text {
    display: block;
    transform: skewX(8deg);
    font-size: 20px;
    padding: 0px 12px;
  }

  [contenteditable="true"].single-line {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
  }

  [contenteditable="true"].single-line br {
    display: none;
  }

  [contenteditable="true"].single-line * {
    display: inline;
    white-space: nowrap;
  }
}
</style>
