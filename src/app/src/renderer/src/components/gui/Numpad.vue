<template>
  <div class="numpad-container">
    <NumpadButtonVue v-for="btn of buttonsData" :key="btn.value" :icon="btn.icon" :value="btn.value" :color="btn.color"
      :area="btn.area" @user-input="emitUserInput" />
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
  emits: ['user-input'],
  data() {
    return {
      buttonsData: [
        { value: 'abs ', area: 'abs', icon: 'abs' },
        { value: '!', area: 'fac', icon: 'fact' },
        { value: '7', color: 'l-2', area: 'n7' },
        { value: '4', color: 'l-2', area: 'n4' },
        { value: '1', color: 'l-2', area: 'n1' },
        { value: 'pm', color: 'l-2', area: 'pm', icon: 'pm' }, //change current number to negative
        { value: 'clr', area: 'clr', icon: 'clr' },
        { value: 'root ', area: 'root', icon: 'root' },
        { value: '8', color: 'l-2', area: 'n8' },
        { value: '5', color: 'l-2', area: 'n5' },
        { value: '2', color: 'l-2', area: 'n2' },
        { value: '0', color: 'l-2', area: 'n0' },
        { value: 'bs', area: 'bs', icon: 'bs' },
        { value: '^ ', area: 'pow', icon: 'pow' },
        { value: '9', color: 'l-2', area: 'n9' },
        { value: '6', color: 'l-2', area: 'n6' },
        { value: '3', color: 'l-2', area: 'n3' },
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
    emitUserInput(value: string) {
      this.$emit('user-input', value);
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
