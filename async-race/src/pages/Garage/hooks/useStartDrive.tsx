import {
  MutableRefObject, Dispatch, SetStateAction, useContext, useEffect,
} from 'react';
import AppLoader from '../../../services/AppLoader';
import { StateContext } from '../../../state/State';
import { ActionTypes } from '../../../state/types';
import { Car, AnimationElement, EngineStatus } from '../../../types/types';
import {
  stopCar, startCarAnimation, startEngine,
} from '../CarActions';

const useStartDrive = (
  car: Car,
  anim: MutableRefObject<Animation>,
  isDriving: boolean,
  setIsDriving: Dispatch<SetStateAction<boolean>>,
  toggleButtons: () => void,
  carRef: MutableRefObject<HTMLDivElement>,
) => {
  const { dispatch } = useContext(StateContext);
  const animRef = anim;

  const onSuccessFinishActions = (element: AnimationElement) => {
    stopCar(element);
    setIsDriving(false);
    toggleButtons();
  };

  const onInterruptActions = (element: AnimationElement) => {
    stopCar(element);
    setIsDriving(false);
    toggleButtons();
  };

  const createCarAnimation = (time: number) => {
    const animElement: AnimationElement = {
      animRef, carRef, carId: car.id, time,
    };
    dispatch({ type: ActionTypes.SET_ANIM_ELEMENT, payload: animElement });
    return animElement;
  };

  useEffect(() => {
    let isActual = true;
    const startDrive = async () => {
      const { time } = await startEngine(car.id.toString());
      const animElement = createCarAnimation(time);
      animRef.current = startCarAnimation(animElement, () => animElement.animRef.current.cancel());

      AppLoader.driveCar(car.id.toString(), EngineStatus.DRIVE)
        .then(() => {
          if (isActual) {
            onSuccessFinishActions(animElement);
          }
        })
        .catch(() => {
          if (isActual) {
            onInterruptActions(animElement);
          }
        });
    };
    if (isDriving) {
      startDrive();
    }
    return () => {
      dispatch({ type: ActionTypes.CLEAR_ANIM_ELEMENT, payload: car.id });
      isActual = false;
    };
  }, [isDriving]);
};

export default useStartDrive;
