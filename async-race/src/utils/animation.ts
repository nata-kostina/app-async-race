/* eslint-disable max-len */

import { MutableRefObject } from 'react';

export const startAnimation = (
  carElement: MutableRefObject<HTMLDivElement>,
  time: number,
  setIsFinished: (v: boolean) => void,
): Animation => {
  const anim = carElement.current.animate([
    { transform: 'translateX(0%)', easing: 'linear' }, // keyframe
    { transform: 'translateX(80%)', easing: 'linear' }, // keyframe
  ], { duration: time, fill: 'forwards' });
  anim.commitStyles();
  anim.onfinish = () => {
    setIsFinished(true);
  };
  return anim;
};

export function stopAnimation(animRef: MutableRefObject<Animation>, setIsFinished: (v: boolean) => void): void {
  animRef.current.pause();
  setIsFinished(true);
}
