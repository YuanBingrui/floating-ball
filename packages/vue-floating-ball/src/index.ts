import { App, Plugin } from 'vue';
import FloatingBallCore from '@floating-ball/core';
import { injectionKey, useFBCore } from './Injector';
import FloatingBallContain from './FloatingBallContain.vue';

export { useFBCore };

const VueFloatingBall: Plugin = {
  install: (app: App) => {
    app.component('floating-ball', FloatingBallContain);
    const fbCore = new FloatingBallCore('#42b883', 'top right');
    app.provide(injectionKey, fbCore);
    app.config.globalProperties.$fb = fbCore;
    return app;
  },
};

export default VueFloatingBall;

declare module 'vue' {
  export interface ComponentCustomProperties {
    $fb: typeof FloatingBallCore;
  }
}
