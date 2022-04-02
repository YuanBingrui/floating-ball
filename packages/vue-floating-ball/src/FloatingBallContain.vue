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
    <FloatingBallPopover :items="events" ref="fbPopoverRef" />
  </div>
</template>

<style lang="scss" scoped>
.floating-ball-contain {
  position: fixed;
  width: 3.5rem;
  height: 3.5rem;
  z-index: 30000;
}
</style>
