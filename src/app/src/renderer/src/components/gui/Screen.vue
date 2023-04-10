<template>
  <div>
    <PromptVue :promptValue="promptValue" :cursor-index="cursorIndex" @cursor-info="getCursorInfo"
      @update-prompt-value="updatePromptValue" />
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
    cursorIndex: {
      type: Number
    }
  },
  emits: ['cursor-info', 'update-prompt-value'],

  methods: {
    getCursorInfo(selectionStart, selectionEnd) {
      this.$emit('cursor-info', selectionStart, selectionEnd);
    },
    updatePromptValue(newPromptValue) {
      this.$emit('update-prompt-value', newPromptValue);
    }
  }
})
</script>

<style scoped></style>
