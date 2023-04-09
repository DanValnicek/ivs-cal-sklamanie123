<template>
  <div class="prompt-container">
    <div ref="prompt" class="prompt-text" contenteditable="true" @blur="handleBlur" @input="updatePromptValue">
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
  emits: ['cursor-info', 'update-prompt-value'],
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
        this.storeCursorInfo();
      });
    },
    handleBlur() { // auto focus prompt div for input and store new promptValue in state
      const prompt = this.$refs.prompt as HTMLDivElement;
      this.$nextTick(() => prompt.focus());
      // emit promptValue here
    },
    storeCursorInfo() {
      this.$emit('cursor-info', this.currentCursorPosition, this.currentCursorSelection);
    },
    updatePromptValue(event) {
      const newPromptValue = event.target.textContent;
      this.$emit('update-prompt-value', newPromptValue);
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
