<template>
  <div id="ncte" ref="outer" class="outer">
    <div class="inner">
      <titlebar />
      <div class="content">
        <ScreenVue :promptValue="promptValue" @cursor-info="handleCursorInfo" @update-prompt-value="updatePromptValue" />
        <NumpadVue @user-input="handleUserInput" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { argbFromHex, hexFromArgb, themeFromSourceColor } from '@material/material-color-utilities'

import Titlebar from './components/shell/Titlebar.vue'
import ScreenVue from './components/gui/Screen.vue'
import NumpadVue from './components/gui/Numpad.vue'

export default defineComponent({
  name: 'App',
  components: {
    Titlebar,
    ScreenVue,
    NumpadVue
  },
  data() {
    return {
      userInput: '',
      promptValue: '',
      currentCursorPosition: 0,
      currentCursorSelection: ''
    }
  },
  created() {
    const theme = themeFromSourceColor(argbFromHex('#a09bff'), [])

    console.log(theme.schemes.dark)

    const cols = {
      'c-bg': theme.schemes.dark.background,
      'c-on-bg': theme.schemes.dark.onBackground,

      'c-surface': theme.schemes.dark.surface,
      'c-on-surface': theme.schemes.dark.onSurface,

      'c-surface-variant': theme.schemes.dark.surfaceVariant,

      'c-error': theme.schemes.dark.error,
      'c-error-container': theme.schemes.dark.errorContainer,
      'c-on-error': theme.schemes.dark.onError,

      'c-primary': theme.schemes.dark.primary,
      'c-on-primary': theme.schemes.dark.onPrimary,

      'c-primary-container': theme.schemes.dark.primaryContainer,
      'c-on-primary-container': theme.schemes.dark.onPrimaryContainer,

      'c-secondary': theme.schemes.dark.secondary,
      'c-on-secondary': theme.schemes.dark.onSecondary,

      'c-secondary-container': theme.schemes.dark.secondaryContainer,
      'c-on-secondary-container': theme.schemes.dark.onSecondaryContainer
    }

    for (const varName of Object.keys(cols)) {
      document.documentElement.style.setProperty('--' + varName, hexFromArgb(cols[varName]))
    }
  },
  methods: {
    handleCursorInfo(currentCursorPosition, currentCursorSelection) { // update cursor info on change
      this.currentCursorPosition = currentCursorPosition;
      this.currentCursorSelection = currentCursorSelection;
    },

    handleUserInput(value: string) {
      this.userInput = value;

      if (this.userInput === "eq") {
        this.calculateExpression();
        return;
      }

      if (this.userInput === 'clr') {
        this.promptValue = '';
        return;
      }

      if (this.userInput === '.') {
        // implement checking that number has only one dot
        this.promptValue += `${this.userInput}`;
        return;
      }

      if (this.userInput === 'bs') {
        // implement the functionality of deleting the last number or in the case of function to delete the function symbol and the whitespaces around it
        this.promptValue = this.promptValue.substring(0, this.promptValue.length - 1); //.slice(0, -1) does not work for some reason
        console.log(this.promptValue);
        return;
      }

      if (!isNaN(Number(this.userInput))) {
        this.promptValue += `${this.userInput}`;
      } else {
        this.promptValue += ` ${this.userInput} `;
      }
    },
    updatePromptValue(newPromptValue) {
      this.promptValue = newPromptValue;
      console.log(this.promptValue);

    },
    calculateExpression() {
      console.log(this.promptValue);
    }
  }
})
</script>

<style lang="scss" scoped>
.outer {
  padding: 0 57px; // sinusova veta and stuff a/sin(A)-c/sin(C)
}

.inner {
  transform: skew(-8deg);
  pointer-events: all;
  height: 400px;
  background: var(--c-bg);
  color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 3px 3px 4px -3px rgba(0, 0, 0, 1);
}

.content {
  background: var(--c-surface);
  height: calc(100% - 39px);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
</style>
