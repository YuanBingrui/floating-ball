import React from 'react';

export type Item = {
  icon: string | React.ReactNode;
  text: string;
  handle: (item: Item) => void;
};
export interface FloatingBallPopoverProps {
  items?: Item[];
}

export interface FloatingBallContainProps {
  theme?: string;
  position?: string;
  column?: number;
  canMove?: boolean;
  events?: Item[];
}
