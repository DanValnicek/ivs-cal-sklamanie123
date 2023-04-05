<template>
  <button class="button" :class="{
    'l-2': color == 'l-2',
    'l-accent': color == 'l-accent'
  }" :style="{ 'grid-area': area }">
    <span v-if="icon" class="button-text">
      <img :src="imageSrc" />
    </span>
    <span v-else class="button-text">{{ value }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NumpadButtonVue',
  props: {
    icon: {
      type: String,
      default: null
    },
    value: {
      type: Number,
    },
    color: {
      type: String,
    },
    area: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      imageSrc: ''
    }
  },
  created() {
    this.imageSrc = new URL(`../../assets/icons/${this.icon}.svg`, import.meta.url).href;
  }
});
</script>

<style scoped lang="scss">
.button {
  border: none;
  background: transparent;
  border-radius: 4px;
  color: #fff;

  .button-text {
    display: block;
    transform: skewX(8deg);
    font-size: 1.2rem;
    font-family: jb;
    font-weight: 500;
  }

  background-color: #272329;

  &.l-2 {
    background-color: #322C37;
  }

  &.l-accent {
    background-color: #D6BAFF;
  }
}
</style>
