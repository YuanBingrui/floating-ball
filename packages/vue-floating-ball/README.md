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

```

// App.vue
<script setup>
import FloatingBall from 'vue3-floating-ball';
import { ref, onMounted } from 'vue';

const theme = ref('#42b883');
const position = ref('top left');
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
  <floating-ball :theme="theme" :position="position" :events="events" />
</template>

// main.js
import { createApp } from 'vue'
createApp(App).mount('#app')
```

## DOCS

### props

| Name     |                       Description                       |       Type       |  default |
| -------- | :-----------------------------------------------------: | :--------------: | -------: |
| theme    |             set floating ball primary color             |      String      |  #42b883 |
| position | set floating ball init position.(top/bottom/left/right) |      String      | top left |
| events   |  events will be displayed on the floating ball popover  | Array<EventItem> |       [] |

### EventItem props

| Name   | Description |           Type            | default |
| ------ | :---------: | :-----------------------: | ------: |
| icon   | event icon  |          String           |       - |
| text   | event name  |          String           |       - |
| handle |    event    | (item: EventItem) => void |       - |

### useFBCore() and `$fb`

> `useFBCore()` hook and `$fb` both return floating ball core instance, u can do anything of floating ball