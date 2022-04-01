import { FloatingBallCoreContext } from './FBCoreContext';
import FloatingBallCore from '@floating-ball/core';

export const fbCore = new FloatingBallCore('#595857', 'top right');

const Provider = ({ children }: any) => {
  return (
    <FloatingBallCoreContext.Provider value={fbCore}>
      {children}
    </FloatingBallCoreContext.Provider>
  );
};

export default Provider;
