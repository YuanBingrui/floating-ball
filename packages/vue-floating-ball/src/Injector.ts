import { inject } from 'vue';
import type FloatingBallCore from '@floating-ball/core';

export const injectionKey = Symbol('FloatingBallCore');

export const useFBCore = () => {
  return inject(injectionKey) as FloatingBallCore;
};
