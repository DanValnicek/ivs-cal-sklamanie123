<template>
  <div id="ncte" ref="outer" class="outer">
    <div class="inner">
      <titlebar />
      <div class="content">
        <ScreenVue
          :promptValue="promptValue"
          :cursor-index="selectionStart"
          @cursor-info="handleCursorInfo"
          @update-prompt-value="updatePromptValue"
        />
        <NumpadVue @user-input="handleUserInput" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { argbFromHex, hexFromArgb, themeFromSourceColor } from '@material/material-color-utilities';

import Titlebar from './components/shell/Titlebar.vue';
import ScreenVue from './components/gui/Screen.vue';
import NumpadVue from './components/gui/Numpad.vue';

export default defineComponent({
  name: 'App',
  components: {
    Titlebar,
    ScreenVue,
    NumpadVue
  },
  data() {
    return {
      promptValue: '',

      cursorInfo: {
        selectionStart: 0,
        selectionEnd: 0,
        selectionContent: ''
      }
    };
  },
  created() {
    const theme = themeFromSourceColor(argbFromHex('#a09bff'), []);

    console.log(theme.schemes.dark);

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
    };

    for (const varName of Object.keys(cols)) {
      document.documentElement.style.setProperty('--' + varName, hexFromArgb(cols[varName]));
    }
  },
  methods: {
    handleCursorInfo(cursorInfo: object) {
      // update cursor info on change
      this.cursorInfo.selectionStart = cursorInfo.selectionStart;
      this.cursorInfo.selectionEnd = cursorInfo.selectionEnd;
      this.cursorInfo.selectionContent = this.promptValue.substring(this.cursorInfo.selectionStart, this.cursorInfo.selectionEnd);
    },

    handleUserInput(userInput: string) {
      if (userInput === 'clr') this.promptValue = '';

      if (userInput === 'bs') {
        if (this.cursorInfo.selectionStart === 0) {
          return;
        }
        const strBeforeCursor = this.promptValue.substring(0, this.cursorInfo.selectionStart - 1);
        const strAfterCursor = this.promptValue.substring(this.cursorInfo.selectionStart);
        this.promptValue = strBeforeCursor + strAfterCursor;
        this.cursorInfo.selectionStart--;
        this.cursorInfo.selectionEnd--;
      }
    },
    updatePromptValue(newPromptValue: string) {
      this.promptValue = newPromptValue;
    },
    calculateExpression() {
      console.log(this.promptValue);
    }
  }
});
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
