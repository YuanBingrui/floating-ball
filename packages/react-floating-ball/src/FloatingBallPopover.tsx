import { forwardRef } from 'react';
import { useFBCore } from './hooks';
import type { FloatingBallPopoverProps, Item } from './types';

const FloatingBallPopover = forwardRef<any, FloatingBallPopoverProps>(
  ({ items = [] }, ref) => {
    const fbCore = useFBCore();

    const handleClick = (item: Item) => {
      item?.handle?.(item);
      fbCore.close();
    };

    return (
      <div className='floating-ball-popover' ref={ref}>
        {items.map((item, index) => (
          <div
            className='floating-ball-popover-item'
            key={index}
            onClick={() => handleClick(item)}
          >
            <div className='floating-ball-popover-item-icon'>{item.icon}</div>
            <div className='floating-ball-popover-item-word'>{item.text}</div>
          </div>
        ))}
      </div>
    );
  }
);

export default FloatingBallPopover;
