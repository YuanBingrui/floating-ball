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
        <slot name="picon" :item="item">{{ (item as any).icon }}</slot>
      </div>
      <div class="floating-ball-popover-item-word">
        <slot name="ptext" :item="item">{{ (item as any).text }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating-ball-popover {
  position: absolute;
  padding: 0.2rem;
  border-radius: 2rem;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  transition: transform 0.2s;
  &-item {
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0.2rem 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 3.8rem;
    @mixin popover-common {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-icon {
      @include popover-common;
      height: 3.4rem;
      font-size: 2.3rem;
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
      height: 1rem;
      font-size: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
