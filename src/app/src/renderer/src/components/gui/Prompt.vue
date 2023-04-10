<template>
  <div class="prompt-container">
    <textarea rows="1" wrap="soft" overflow="hidden" ref="prompt" :value="promptValue" class="prompt-text"
      @blur="handleBlur" @input="handleChangePromptValue"></textarea>


    <!-- <div ref="prompt" class="prompt-text" contenteditable="true" @blur="handleBlur" @input="updatePromptValue">
      {{ promptValue }}
    </div> -->
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
    cursorIndex: {
      type: Number
    }
  },
  emits: ['cursor-info', 'update-prompt-value'],
  data() {
    return {
      lastCursorPosition: 0
    };
  },
  watch: {
    cursorIndex(newVal) {
      this.lastCursorPosition = newVal;
      this.handleBlur();
    }
  },
  mounted() {
    this.getCursorInfo();
    this.handleBlur();
  },
  methods: {
    handleBlur() {
      const prompt = this.$refs.prompt as HTMLTextAreaElement;
      this.$nextTick(() => {
        prompt.focus();
        prompt.setSelectionRange(this.lastCursorPosition, this.lastCursorPosition);
      });
    },

    getCursorInfo() {
      const prompt = this.$refs.prompt as HTMLTextAreaElement;
      prompt.addEventListener('mouseup', () => {
        const selectionStart = prompt.selectionStart;
        const selectionEnd = prompt.selectionEnd;

        this.lastCursorPosition = selectionStart;
        this.$emit('cursor-info', selectionStart, selectionEnd);
      })
    },

    handleChangePromptValue() {
      const prompt = this.$refs.prompt as HTMLTextAreaElement;
      const newPromptValue = prompt.value;

      this.$emit('update-prompt-value', newPromptValue)


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
    outline: none;

    color: white;
  }
}
</style>
