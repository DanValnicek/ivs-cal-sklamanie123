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
        { value: 'abs ', area: 'abs', icon: 'abs' },
        { value: '!', area: 'fac', icon: 'fact' },
        { value: '7', color: 'l-2', area: 'n7', action: { type: 'insert', data: 7 } },
        { value: '4', color: 'l-2', area: 'n4', action: { type: 'insert', data: 4 } },
        { value: '1', color: 'l-2', area: 'n1', action: { type: 'insert', data: 1 } },
        { value: 'pm', color: 'l-2', area: 'pm', icon: 'pm' }, //change current number to negative
        { value: 'clr', area: 'clr', icon: 'clr', action: { type: 'clear' } },
        { value: 'root ', area: 'root', icon: 'root' },
        { value: '8', color: 'l-2', area: 'n8', action: { type: 'insert', data: 8 } },
        { value: '5', color: 'l-2', area: 'n5', action: { type: 'insert', data: 5 } },
        { value: '2', color: 'l-2', area: 'n2', action: { type: 'insert', data: 2 } },
        { value: '0', color: 'l-2', area: 'n0', action: { type: 'insert', data: 0 } },
        { value: 'bs', area: 'bs', icon: 'bs', action: { type: 'backspace' } },
        { value: '^ ', area: 'pow', icon: 'pow' },
        { value: '9', color: 'l-2', area: 'n9', action: { type: 'insert', data: 9 } },
        { value: '6', color: 'l-2', area: 'n6', action: { type: 'insert', data: 6 } },
        { value: '3', color: 'l-2', area: 'n3', action: { type: 'insert', data: 3 } },
        { value: '.', color: 'l-2', area: 'dot' },
        { value: '/ ', area: 'div', icon: 'div' },
        { value: '* ', area: 'mul', icon: 'mul' },
        { value: '- ', area: 'min', icon: 'min' },
        { value: '+ ', area: 'plus', icon: 'plus' },
        { value: 'eq', color: 'l-accent', area: 'eq', icon: 'eq' } //add event listener for ENTER
      ]
    }
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
