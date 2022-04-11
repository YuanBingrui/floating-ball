<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import FloatingBall from './FloatingBall.vue';
import FloatingBallPopover from './FloatingBallPopover.vue';
import { useFBCore } from './Injector';

export default defineComponent({
  name: 'FloatingBallContain',
  props: {
    theme: {
      type: String,
      default: '#42b883',
    },
    position: {
      type: String,
      default: 'top right',
    },
    column: {
      type: Number,
      default: 2,
    },
    canMove: {
      type: Boolean,
      default: true,
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FloatingBall,
    FloatingBallPopover,
  },
  setup(props) {
    const fbContainRef = ref<HTMLDivElement | null>(null);
    const fbRef = ref<typeof FloatingBall | null>(null);
    const fbPopoverRef = ref<typeof FloatingBallPopover | null>(null);

    const fbCore = useFBCore();
    onMounted(() => {
      fbCore
        .setTheme(props.theme)
        .setPosition(props.position)
        .setColumn(props.column)
        .setCanMove(props.canMove)
        .collectAllEls({
          floatingBallParentEl: fbContainRef.value,
          floatingBallBoxEl: fbRef.value?.$el,
          popoverEl: fbPopoverRef.value?.$el,
        })
        .render();
    });
    watch(
      () => props.theme,
      () => {
        fbCore.setTheme(props.theme).render();
      }
    );
    watch(
      () => props.position,
      () => {
        fbCore.setPosition(props.position).render();
      }
    );
    watch(
      () => props.column,
      () => {
        fbCore.setColumn(props.column).render();
      }
    );
    watch(
      () => props.canMove,
      () => {
        fbCore.setCanMove(props.canMove).render();
      }
    );
    return {
      fbContainRef,
      fbRef,
      fbPopoverRef,
    };
  },
});
</script>

<template>
  <div class="floating-ball-contain" ref="fbContainRef">
    <FloatingBall ref="fbRef" />
    <FloatingBallPopover :items="events" ref="fbPopoverRef">
      <template v-slot:picon="{ item }">
        <slot name="icon" :item="item">{{ item.icon }}</slot>
      </template>
      <template v-slot:ptext="{ item }">
        <slot name="text" :item="item">{{ item.text }}</slot>
      </template>
    </FloatingBallPopover>
  </div>
</template>

<style lang="scss" scoped>
.floating-ball-contain {
  position: fixed;
  width: 56px;
  height: 56px;
  z-index: 30000;
}
</style>
