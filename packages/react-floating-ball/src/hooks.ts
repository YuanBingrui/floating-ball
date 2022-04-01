import { useContext } from 'react';
import { FloatingBallCoreContext } from './FBCoreContext';

export const useFBCore = () => {
  return useContext(FloatingBallCoreContext);
};
