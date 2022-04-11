# `vue3-floating-ball`

> A vue3 component for floating ball

## Install

```
// npm
npm i --save vue3-floating-ball
// yarn
yarn add -D vue3-floating-ball
// pnpm
pnpm add -D vue3-floating-ball
```

## Usage

[Codesandbox](https://codesandbox.io/s/vue3-floatiing-ball-demo-xoyidq?file=/src/App.vue)

```

// App.vue
<script setup>
import { ref } from 'vue';

const theme = ref('#42b883');
const position = ref('top left');
const column = ref(2);
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
  }
])
</script>

<template>
  <floating-ball :theme="theme" :position="position" :events="events" :column="column" />
</template>

// main.js
import { createApp } from 'vue'
import FloatingBall from 'vue3-floating-ball';

createApp(App).use(FloatingBall).mount('#app')
```

## DOCS

### props

| Name     |                       Description                       |       Type       |  default |
| -------- | :-----------------------------------------------------: | :--------------: | -------: |
| theme    |             set floating ball primary color             |      String      |  #42b883 |
| position | set floating ball init position.(top/bottom/left/right) |      String      | top left |
| column   |      set floating ball column of popover.(max: 4)       |      Number      |        2 |
| events   |  events will be displayed on the floating ball popover  | Array<EventItem> |       [] |

### EventItem props

| Name   | Description |              Type               | default |
| ------ | :---------: | :-----------------------------: | ------: |
| icon   | event icon  | String / v-slot:icon="{ item }" |       - |
| text   | event name  | String / v-slot:text="{ item }" |       - |
| handle |    event    |    (item: EventItem) => void    |       - |

### useFBCore() and `$fb`

> `useFBCore()` hook and `$fb` both return floating ball core instance, u can do anything of floating ball
