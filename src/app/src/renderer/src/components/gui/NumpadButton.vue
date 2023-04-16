<template>
  <button @mousedown="emitAction" class="button" :class="{
    'l-2': color == 'l-2',
    'l-accent': color == 'l-accent'
  }" :style="{ 'grid-area': area }">
    <div class="inner">
      <span v-if="icon" class="button-text">
        <img :src="imageSrc" />
      </span>
      <span v-else class="button-text">{{ value }}</span>
    </div>
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
    action: {
      type: Object
    }
  },
  emits: ['action'],
  data() {
    return {
      imageSrc: ''
    }
  },
  created() {
    this.imageSrc = new URL(`../../assets/icons/${this.icon}.svg`, import.meta.url).href;
  },
  methods: {
    emitAction() {
      console.log(this.action);
      this.$emit('action', this.action);
    }
  }
});
</script>

<style scoped lang="scss">
.button {
  --btn-bg: #272329;
  border: none;
  border-radius: 4px;
  background: linear-gradient(to bottom, var(--btn-bg), black 150%);
  color: #fff;
  padding: 1px;
  padding-bottom: 3px;
  position: relative;
  cursor: pointer;
  transition: filter var(--t);

  .inner {
    transition: transform var(--t);
  }

  &::before {
    border-radius: 4px;
    content: '';
    background: var(--btn-bg);
    top: 1px;
    left: 1px;
    bottom: 2px;
    right: 1px;
    position: absolute;
    z-index: 0;

    transition: bottom 0.1s ease-out;
  }

  &:hover {
    filter: brightness(125%);

    &::before {
      bottom: 4px;
    }

    .inner {
      transform: translateY(-2px);
    }
  }

  &:active {
    filter: brightness(90%);

    &::before {
      bottom: 1px;
    }
    .inner {
      transform: translateY(1px);
    }
  }

  .button-text {
    display: block;
    transform: skewX(8deg);
    font-size: 1.2rem;
    font-family: jb;
    font-weight: 500;
  }

  &.l-2 {
    --btn-bg: #322C37;
  }

  &.l-accent {
    --btn-bg: #D6BAFF;
  }
}
</style>
