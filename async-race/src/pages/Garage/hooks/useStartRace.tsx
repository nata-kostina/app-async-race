import {
  MutableRefObject, useContext, useEffect,
} from 'react';
import { StateContext } from '../../../state/State';
import { ActionTypes } from '../../../state/types';
import { Car, AnimationElement } from '../../../types/types';
import {
  stopCar, driveCar, startCarAnimation,
} from '../CarActions';

const useStartRace = (
  car: Car,
  anim: MutableRefObject<Animation>,
  isRacing: boolean,
  carRef: MutableRefObject<HTMLDivElement>,
) => {
  const { state, dispatch } = useContext(StateContext);
  const animRef = anim;

  const onSuccessFinishActions = (element: AnimationElement) => {
    stopCar(element);
    dispatch({ type: ActionTypes.SET_IS_RACING, payload: false });
  };
  const onInterruptActions = (element: AnimationElement) => {
    stopCar(element);
    dispatch({ type: ActionTypes.SET_IS_RACING, payload: false });
  };

  const createCarAnimation = (time: number) => {
    const animElement: AnimationElement = {
      animRef, carRef, carId: car.id, time,
    };
    dispatch({ type: ActionTypes.SET_ANIM_ELEMENT, payload: animElement });
    return animElement;
  };

  useEffect(() => {
    async function getPromise() {
      const { time } = state.carsTime.find((el) => el.carId === car.id) as { carId: number, time: number };
      const animElement = createCarAnimation(time);
      animRef.current = startCarAnimation(animElement, () => animElement.animRef.current.cancel());
      const promise = driveCar(
        car.id,
        animElement.time as number,
        () => onSuccessFinishActions(animElement),
        () => onInterruptActions(animElement),
      );
      dispatch({ type: ActionTypes.ADD_PROMISE, payload: promise });
    }
    if (state.isRacing) {
      getPromise();
    }
  }, [isRacing]);
};

export default useStartRace;
