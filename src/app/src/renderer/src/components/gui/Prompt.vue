<template>
  <div class="prompt-container">
    <div ref="prompt" class="prompt-text single-line" contenteditable="true" @blur="handleBlur">
      {{ promptValue }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Prompt',
  props: {
    promptValue: {
      type: String
    }
  },
  data() {
    return {
      currentCursorPosition: 0,
      currentCursorSelection: ''
    };
  },
  mounted() {
    this.handleBlur();
    this.getCursorInfo();

  },
  methods: {
    getCursorInfo() {
      const prompt = this.$refs.prompt as HTMLDivElement;
      prompt.addEventListener('mouseup', () => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const position = range?.startOffset;

        console.log(`Cursor position is: ${position}`);
        console.log(`Selected text is: ${selection?.toString()}`);

        this.currentCursorPosition = position || 0;
        this.currentCursorSelection = selection?.toString() || '';
      });
    },
    handleBlur() { // auto focus prompt div for input
      const prompt = this.$refs.prompt as HTMLDivElement;
      this.$nextTick(() => prompt.focus());
    }
  }
});
</script>

<style lang="scss" scoped>
.prompt-container {
  display: flex;

  .prompt-text {
    display: block;
    transform: skewX(8deg);
    font-size: 20px;
    padding: 0px 12px;
    outline: none;
  }
}
</style>
