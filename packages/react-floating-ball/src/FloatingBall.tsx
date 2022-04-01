import { forwardRef } from 'react';

const FloatingBall = forwardRef<any, any>(({}, ref) => {
  return (
    <div className='floating-ball-box' ref={ref}>
      <div className='floating-ball-out'></div>
      <div className='floating-ball-in'></div>
      <div className='floating-ball-center'></div>
    </div>
  );
});

export default FloatingBall;
