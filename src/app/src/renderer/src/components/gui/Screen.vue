<template>
  <div>
    <PromptVue :prompt-value="promptValue" :cursor-info="cursorInfo" @cursor-info="getCursorInfo" @update-prompt-value="updatePromptValue" />
    <ResultVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PromptVue from './Prompt.vue';
import ResultVue from './Result.vue';

export default defineComponent({
  name: 'ScreenVue',
  components: {
    PromptVue,
    ResultVue
  },
  props: {
    promptValue: {
      type: String
    },
    cursorInfo: {
      type: Object
    }
  },
  emits: ['cursor-info', 'update-prompt-value'],

  methods: {
    getCursorInfo(cursorInfo: { selectionStart: number; selectionEnd: number; selectionContent: string }) {
      this.$emit('cursor-info', cursorInfo);
    },
    updatePromptValue(newPromptValue: string) {
      this.$emit('update-prompt-value', newPromptValue);
    }
  }
});
</script>

<style scoped></style>
