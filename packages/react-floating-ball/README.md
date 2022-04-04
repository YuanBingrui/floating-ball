# `react-floating-ball`

> A react component for floating ball

## Install

```
// npm
npm i --save react-floating-ball
// yarn
yarn add -D react-floating-ball
// pnpm
pnpm add -D react-floating-ball
```

## Usage

[Codesandbox](https://codesandbox.io/s/react-floating-ball-demo-et71vg?file=/src/App.js)

```
// cjs
const FloatingBall = require('react-floating-ball');
// esm
import FloatingBall from 'react-floating-ball';
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <FloatingBall
      theme='#61dafb'
      position='top left'
      events={[
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
      ]}
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

## DOCS

### props

| Name     |                       Description                       |       Type       |  default |
| -------- | :-----------------------------------------------------: | :--------------: | -------: |
| theme    |             set floating ball primary color             |      String      |  #61dafb |
| position | set floating ball init position.(top/bottom/left/right) |      String      | top left |
| events   |  events will be displayed on the floating ball popover  | Array<EventItem> |       [] |

### EventItem props

| Name   | Description |           Type            | default |
| ------ | :---------: | :-----------------------: | ------: |
| icon   | event icon  | String / React.ReactNode  |       - |
| text   | event name  |          String           |       - |
| handle |    event    | (item: EventItem) => void |       - |

### Provider and useFBCore()

> `useFBCore()` hook return floating ball core instance, u can do anything of floating ball, but u must Provider wrap your component
