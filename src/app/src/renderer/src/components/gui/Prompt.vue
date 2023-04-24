<template>
  <div class="prompt-container">
    <input
      ref="prompt"
      :value="promptValue"
      class="prompt-text"
      :class="{ error: error }"
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
/**
 * @file Prompt.vue
 * @brief This component is the prompt of the calculator. It contains the expression.
 * @author Jakub Vodrážka, Martin Brázda
 * 
 * @props promptValue: String - The value of the prompt (expression).
 * @props error: Boolean - State of the expression (invalid or valid).
 * @props cursorInfo: Object - The cursor info bundled.
 * 
 * @emits update:cursorInfo - The cursor info bundled.
 * @emits update:promptValue - The value of the prompt (expression).
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Prompt',
  props: {
    promptValue: {
      type: String
    },
    error: {
      type: Boolean
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
    /**
     * @brief Emits the new prompt value when it is changed by the user.
     */
    handleInput() {
      const prompt = this.$refs.prompt as HTMLTextAreaElement;
      const newPromptValue = prompt.value;
      this.$emit('update:promptValue', newPromptValue);
    },
    /**
     * @brief Focuses the prompt and sets the cursor position when user focuses the app.
     */
    focusPrompt() {
      const prompt = this.$refs.prompt as HTMLTextAreaElement;
      this.$nextTick(() => {
        prompt.focus();
        prompt.setSelectionRange(this.currentCursorPosition, this.currentCursorPosition);
      });
    },
    /**
     * @brief Gets the current cursor info in prompt and emits it.
     */
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
    transition: color var(--t);

    &.error {
      color: var(--c-error);
    }
  }
}
</style>
