import { useRef, useEffect } from 'react';

const useDidMountEffect = <T>(func: () => void, dep: T[]) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      func();
    } else { didMountRef.current = true; }
  }, dep);
};

export default useDidMountEffect;
