<template>
  <button @mousedown="emitAction" class="button" :class="{
    'l-2': color == 'l-2',
    'l-accent': color == 'l-accent',
    'disabled': isDisabled
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
/**
 * @file NumpadButton.vue
 * @brief This component is a button for the numpad.
 * @author Jakub Vodrážka, Martin Brázda
 * 
 * @params icon: String - The name of the icon.
 * @params value: String - The value of the button.
 * @params color: String - The color of the button.
 * @params area: String - The grid area of the button.
 * @params isDisabled: Boolean - The state of the button (disabled or enabled).
 * @params action: Object - The action of the button.
 * 
 * @emits action - The action of the button.
 * 
 */
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
    isDisabled: {
      type: Boolean
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

  &:hover:not(.disabled) {
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

  &.disabled {
    filter: brightness(0.5);
    pointer-events: none;
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
