# `@floating-ball/core`

> floating ball core

## Install

```
// npm
npm i --save @floating-ball/core
// yarn
yarn add -D @floating-ball/core
// pnpm
pnpm add -D @floating-ball/core
```

## Usage

```
// cjs
const floatingBallCore = require('@floating-ball/core');

// esm
import floatingBallCore from '@floating-ball/core';

// pass theme, position and column as initvalue
const fbCore = new floatingBallCore('#595857', 'top right', 2, true)

// or nothing
const fbCore = new floatingBallCore()
```

## DOCS

### args

| Args   | role     |                       Description                       |  Type   |      default |
| ------ | -------- | :-----------------------------------------------------: | :-----: | -----------: |
| first  | theme    |             set floating ball primary color             | String  |      #202a31 |
| second | position | set floating ball init position.(top/bottom/left/right) | String  | bottom right |
| third  | column   |      set floating ball column of popover.(max: 4)       | Number  |            2 |
| fourth | canMove  |       control the floating ball can move by mouse       | Boolean |         true |
