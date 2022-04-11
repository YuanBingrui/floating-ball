<script lang="ts">
import { defineComponent } from 'vue';
import { useFBCore } from './Injector';

export default defineComponent({
  name: 'FloatingBallPopover',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const fbCore = useFBCore();
    function handleClick(item: any) {
      item?.handle?.(item);
      fbCore.close();
    }
    return {
      handleClick,
    };
  },
});
</script>

<template>
  <div class="floating-ball-popover">
    <div
      class="floating-ball-popover-item"
      v-for="(item, index) in items"
      :key="index"
      @click="handleClick(item)"
    >
      <div class="floating-ball-popover-item-icon">
        <slot name="picon" :item="item">{{ item.icon }}</slot>
      </div>
      <div class="floating-ball-popover-item-word">
        <slot name="ptext" :item="item">{{ item.text }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating-ball-popover {
  position: absolute;
  padding: 12px;
  border-radius: 32px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  transition: transform 0.2s;
  &-item {
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    margin-right: 32px;
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60px;
    @mixin popover-common {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-icon {
      @include popover-common;
      height: 60px;
      font-size: 36px;
      border-radius: 50%;
      overflow: hidden;
      img,
      svg {
        width: 70%;
        height: 70%;
        border-radius: 50%;
      }
    }
    &-word {
      @include popover-common;
      height: 16px;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
