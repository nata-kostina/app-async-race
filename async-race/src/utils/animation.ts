/* eslint-disable no-multiple-empty-lines */
import { MutableRefObject } from 'react';

export const startAnimation = (
  carRef: MutableRefObject<HTMLDivElement>,
  time: number,
  onFinishActions: () => void,
): Animation => {
  const anim = carRef.current.animate([
    { transform: 'translateX(0%)', easing: 'linear' }, // keyframe
    { transform: 'translateX(80%)', easing: 'linear' }, // keyframe
  ], { duration: time, fill: 'forwards' });
  anim.commitStyles();
  anim.onfinish = () => {
    // debugger;
    console.log('onfinish');
    onFinishActions();
  };
  return anim;
};

// eslint-disable-next-line max-len
export function stopAnimation(animRef: MutableRefObject<Animation>): void {
  animRef.current.pause();
}
