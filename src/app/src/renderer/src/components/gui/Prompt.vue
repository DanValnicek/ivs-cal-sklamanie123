<template>
  <div class="prompt-container">
    <input
      ref="prompt"
      :value="promptValue"
      class="prompt-text"
      @blur="handleBlur"
      @input="handleInput"
      @focus="handleCursorInfo"
      @click="handleCursorInfo"
      @mouseout="handleMouseout"
      @keyup="handleCursorInfo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Prompt',
  props: {
    promptValue: {
      type: String
    },
    cursorInfo: {
      type: Object
    }
  },
  emits: ['update:cursorInfo', 'update:promptValue'],
  data() {
    return {
      currentCursorPosition: 0
    };
  },
  watch: {
    cursorInfo: {
      handler(newVal) {
        this.currentCursorPosition = newVal.selectionStart;
        if (newVal.refocus) {
          this.focusPrompt();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.focusPrompt();
  },
  methods: {
    handleBlur() {
      this.focusPrompt();
    },
    handleCursorInfo() {
      this.getCursorInfo();
    },
    handleMouseout() {
      // I know this is a hacky way to do this, but there is literally no other way, except watching selection every ms soooo...
      setTimeout(this.handleCursorInfo, 1);
    },
    handleInput() {
      const prompt = this.$refs.prompt as HTMLTextAreaElement;
      const newPromptValue = prompt.value;
      this.$emit('update:promptValue', newPromptValue);
    },
    focusPrompt() {
      const prompt = this.$refs.prompt as HTMLTextAreaElement;
      this.$nextTick(() => {
        prompt.focus();
        prompt.setSelectionRange(this.currentCursorPosition, this.currentCursorPosition);
      });
    },
    getCursorInfo() {
      this.$nextTick(() => {
        const prompt = this.$refs.prompt as HTMLTextAreaElement;
        const cursorInfo = {
          selectionStart: prompt.selectionStart || 0,
          selectionEnd: prompt.selectionEnd || 0,
          selectionContent: this.promptValue?.substring(prompt.selectionStart, prompt.selectionEnd) || ''
        };
        this.currentCursorPosition = cursorInfo.selectionStart;
        this.$emit('update:cursorInfo', cursorInfo);
      });
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
    border: none;
    background-color: transparent;
    resize: none;
    font-family: jb;

    color: white;
  }
}
</style>
