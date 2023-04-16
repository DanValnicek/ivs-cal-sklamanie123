<template>
  <div class="numpad-container">
    <NumpadButtonVue v-for="btn of buttonsData" :key="btn.value" :icon="btn.icon" :value="btn.value" :color="btn.color"
      :area="btn.area" :action="btn.action" @action="onAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NumpadButtonVue from './NumpadButton.vue';
export default defineComponent({
  name: 'NumpadVue',
  components: {
    NumpadButtonVue
  },
  emits: ['action'],
  data() {
    return {
      buttonsData: [
        { value: '.', color: 'l-2', area: 'dot', action: { type: 'insert', data: '.' } },
        { icon: 'pm', color: 'l-2', area: 'pm', action: { type: 'wrap', data: '-($)&' } }, //change current number to negative
        { value: '0', color: 'l-2', area: 'n0', action: { type: 'insert', data: 0 } },
        { value: '1', color: 'l-2', area: 'n1', action: { type: 'insert', data: 1 } },
        { value: '2', color: 'l-2', area: 'n2', action: { type: 'insert', data: 2 } },
        { value: '3', color: 'l-2', area: 'n3', action: { type: 'insert', data: 3 } },
        { value: '4', color: 'l-2', area: 'n4', action: { type: 'insert', data: 4 } },
        { value: '5', color: 'l-2', area: 'n5', action: { type: 'insert', data: 5 } },
        { value: '6', color: 'l-2', area: 'n6', action: { type: 'insert', data: 6 } },
        { value: '7', color: 'l-2', area: 'n7', action: { type: 'insert', data: 7 } },
        { value: '8', color: 'l-2', area: 'n8', action: { type: 'insert', data: 8 } },
        { value: '9', color: 'l-2', area: 'n9', action: { type: 'insert', data: 9 } },
        { icon: 'plus', area: 'plus', action: { type: 'insert', data: '+' } },
        { icon: 'min', area: 'min', action: { type: 'insert', data: '-' } },
        { icon: 'mul', area: 'mul', action: { type: 'insert', data: '*' } },
        { icon: 'div', area: 'div', action: { type: 'insert', data: '/' } },
        { icon: 'eq', color: 'l-accent', area: 'eq', action: { type: 'evaluate' } }, //add event listener for ENTER
        { icon: 'abs', area: 'abs', action: { type: 'wrap', data: '|$|&', options: { moveCursorInsideExpressionIfEmpty: true } } },
        { icon: 'fact', area: 'fac', action: { type: 'wrap', data: '$!&', options: { wrapSelectedExpression: true } } },
        { icon: 'root', area: 'root', action: { type: 'wrap', data: 'root&($)' } },
        { icon: 'pow', area: 'pow', action: { type: 'wrap', data: '$^&', options: { wrapSelectedExpression: true } } },
        { icon: 'clr', area: 'clr', action: { type: 'clear' } },
        { icon: 'bs', area: 'bs', action: { type: 'backspace' } }
      ]
    };
  },
  methods: {
    onAction(action: ButtonAction) {
      this.$emit('action', action);
    }
  }
})

</script>

<style lang="scss" scoped>
.numpad-container {
  padding: 4px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-template-areas:
    'abs clr bs div'
    'fac root pow mul'
    'n7 n8 n9 min'
    'n4 n5 n6 plus'
    'n1 n2 n3 eq'
    'pm n0 dot eq';
  gap: 8px;
  padding: 12px;
  padding-top: 0;
}
</style>
