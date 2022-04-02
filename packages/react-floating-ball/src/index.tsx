import { useEffect, useRef } from 'react';
import FloatingBall from './FloatingBall';
import FloatingBallPopover from './FloatingBallPopover';
import { useFBCore } from './hooks';
import Provider, { fbCore } from './Provider';
import { FloatingBallContainProps } from './types';
import './style.scss';

export { Provider, useFBCore };

const FloatingBallContain = ({
  theme = '#61dafb',
  position = 'top right',
  events = [],
}: FloatingBallContainProps) => {
  const fbContainRef = useRef<HTMLDivElement | null>(null);
  const fbRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fbCore
      .setTheme(theme)
      .setPosition(position)
      .collectAllEls({
        floatingBallParentEl: fbContainRef.current,
        floatingBallBoxEl: fbRef.current,
        popoverEl: popoverRef.current,
      })
      .render();
  }, [theme, position]);

  return (
    <Provider>
      <div className='floating-ball-contain' ref={fbContainRef}>
        <FloatingBall ref={fbRef} />
        <FloatingBallPopover ref={popoverRef} items={events} />
      </div>
    </Provider>
  );
};

export default FloatingBallContain;
