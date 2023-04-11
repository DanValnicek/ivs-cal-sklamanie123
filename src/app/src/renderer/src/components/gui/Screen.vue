<template>
  <div>
    <PromptVue v-model:promptValue="pPromptValue" v-model:cursorInfo="pCursorInfo" />
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
  emits: ['update:cursorInfo', 'update:promptValue'],
  data() {
    return {
      pPromptValue: '',
      pCursorInfo: {},
    };
  },
  watch: {
    promptValue(newVal) {
      this.pPromptValue = newVal;
    },
    pPromptValue(newVal) {
      this.$emit('update:promptValue', newVal);
    },
    cursorInfo(newVal) {
      this.pCursorInfo = newVal;
    },
    pCursorInfo(newVal) {
      this.$emit('update:cursorInfo', newVal);
    }
  }
});
</script>

<style scoped></style>
