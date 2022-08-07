import { MutableRefObject } from 'react';

export const startAnimation = (
  carRef: MutableRefObject<HTMLDivElement>,
  time: number,
): Animation => {
  const anim = carRef.current.animate([
    { transform: 'translateX(0%)', easing: 'linear' },
    { transform: 'translateX(80%)', easing: 'linear' },
  ], { duration: time, fill: 'both' });
  return anim;
};

export function stopAnimation(animRef: MutableRefObject<Animation>): void {
  animRef.current.pause();
}
