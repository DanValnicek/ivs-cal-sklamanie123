<template>
  <button @click="emitUserInput" class="button" :class="{
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
      type: String,
    },
    color: {
      type: String,
    },
    area: {
      type: String,
      required: true
    },
  },
  emits: ['user-input'],
  data() {
    return {
      imageSrc: ''
    }
  },
  created() {
    this.imageSrc = new URL(`../../assets/icons/${this.icon}.svg`, import.meta.url).href;
  },
  methods: {
    emitUserInput() {
      this.$emit('user-input', this.value); //this needs to be unique for every button clicked even when it is the same button pressed twice
    }
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
