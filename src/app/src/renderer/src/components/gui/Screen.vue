<template>
  <div>
    <PromptVue 
      v-model:promptValue="pPromptValue" 
      v-model:cursorInfo="pCursorInfo" 
      :error="promptError" 
    />
    <ResultVue 
      :value="promptEvaluation" 
      :error="promptError" 
    />
  </div>
</template>

<script lang="ts">
/**
 * @file Screen.vue
 * @brief This component is the screen of the calculator. It contains the prompt and the result.
 * @author Jakub Vodrážka, Martin Brázda
 * 
 * @params promptValue: String - The value of the prompt (expression).
 * @params cursorInfo: Object - The cursor info bundled.
 * @props promptEvaluation: Number - The evaluation of the prompt (result).
 * @props promptError: Boolean - State of the expression (invalid or valid).
 * 
 * @emits update:cursorInfo - The cursor info bundled.
 * @emits update:promptValue - The value of the prompt (expression).
 */

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
    promptEvaluation: {
      type: Number
    },
    promptError: {
      type: Boolean
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
