<template>
  <div>
    <PromptVue :userInput="userInput" />
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
    userInput: {
      type: String
    }
  },
})
</script>

<style scoped></style>
