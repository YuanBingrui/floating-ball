<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default defineComponent({
  name: 'App',
  components: { ColorPicker, VueSlider, vSelect },
  setup() {
    const theme = ref('#42b883');
    const options = ref([
      { value: 'top left', label: '左上(top left)' },
      { value: 'bottom left', label: '左下(bottom left)' },
      { value: 'top right', label: '右上(top right)' },
      { value: 'bottom right', label: '右下(bottom right)' },
    ]);
    const events = ref([
      { icon: 'H', text: 'home', handle: (e) => console.log(e) },
      {
        icon: 'O',
        text: 'home2',
        handle: (e) => console.log(e),
      },
      {
        icon: 'M',
        text: 'home3',
        handle: (e) => console.log(e),
      },
    ]);
    const H = ref(0);
    const V = ref(0);
    const p = ref(options.value[0]);
    const position = computed({
      get() {
        return p.value.value;
      },
      set(newValue) {
        p.value = { value: newValue, label: newValue };
      },
    });
    function changeColor(color) {
      theme.value = color.hex;
    }
    function handleSlider(e, type) {
      if (type === 'H') {
        H.value = e;
        position.value = `${e} ${V.value}`;
        return;
      }
      V.value = e;
      position.value = `${H.value} ${e}`;
    }
    return {
      theme,
      position,
      events,
      changeColor,
      H,
      V,
      handleSlider,
      p,
      options,
    };
  },
});
</script>

<template>
  <div class="app">
    <floating-ball :theme="theme" :position="position" :events="events" />
    <div class="tools">
      <div class="title-box">
        <div class="title">主题色(theme)</div>
        <color-picker
          theme="light"
          :color="theme"
          :sucker-hide="true"
          :sucker-canvas="null"
          :sucker-area="[]"
          @changeColor="changeColor"
        />
      </div>
      <div class="title-box title-box-margin">
        <div class="title">初始位置(position)</div>
        <div class="position">
          <VueSlider
            direction="ttb"
            style="height: 150px; margin: 12px 0"
            @change="(e) => handleSlider(e, 'H')"
          />
          <VueSlider
            style="width: 180px; margin-bottom: 12px"
            @change="(e) => handleSlider(e, 'V')"
          />
          <v-select :options="options" v-model="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
}
.tools {
  display: flex;
  justify-content: center;
}
.position {
  height: 338px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title-box-margin {
  margin-left: 48px;
}
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
}
@media (max-width: 768px) {
  .app {
    padding-top: 24px;
  }
  .tools {
    flex-direction: column;
  }
  .title-box {
    margin-bottom: 16px;
  }
  .title {
    margin-bottom: 16px;
  }
  .title-box-margin {
    margin-left: 0;
  }
  .position {
    height: auto;
  }
}
</style>
