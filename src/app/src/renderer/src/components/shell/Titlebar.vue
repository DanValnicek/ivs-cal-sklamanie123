<template>
  <div class="titlebar">
    <div class="content">
      <div class="left">IVS Calc</div>
      <div class="controls">
        <div class="control" @click="onMinimizeClock">
          <span class="inner">
            <i class="ri-subtract-line"></i>
          </span>
        </div>
        <div class="control control--close" @click="onCloseClick">
          <span class="inner">
            <i class="ri-close-line"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Titlebar',
  methods: {
    onMinimizeClock() {
      // @ts-ignore - ipcRenderer is defined in the preload script
      window.ipcRenderer.send('w:minimize');
    },
    onCloseClick() {
      // @ts-ignore - ipcRenderer is defined in the preload script
      window.ipcRenderer.send('w:close');
    }
  }
})
</script>

<style lang="scss" scoped>
.titlebar {
  user-select: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.content {
  display: flex;
  height: 31px;
  padding: 4px;
  overflow: hidden;
  justify-content: space-between;
  align-items: stretch;
}

.left {
  padding: 0 12px;
  display: flex;
  align-items: center;
  transform: skewX(8deg);
  font-size: 0.9rem;
}

.controls {
  -webkit-app-region: no-drag;
  display: flex;
  align-items: stretch;
}

.control {
  width: 45px; // Corresponds with windows
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  transition: background 0.15s ease, color 0.15s ease;

  .inner {
    display: inline-block;
    transform: skewX(8deg);
  }

  &:hover {
    background: var(--c-primary);
    color: var(--c-on-primary);
  }

  &.control--close {
    &:hover {
      background: var(--c-error);
      color: var(--c-on-error);
    }
    .inner {
      transform: skewX(8deg) scale(1.25);
    }
  }
}
</style>
