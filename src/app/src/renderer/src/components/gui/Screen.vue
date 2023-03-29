<template>
  <div>
    <PromptVue />
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
  data() {
    return {
      a: 20,
      b: 40
    };
  }
})
</script>

<style scoped></style>
