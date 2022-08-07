import { useContext, useEffect } from 'react';
import AppLoader from '../../../services/AppLoader';
import { StateContext } from '../../../state/State';
import { ActionTypes } from '../../../state/types';
import { Car, EngineStatus } from '../../../types/types';
import { stopAnimation } from '../../../utils/animation';
import { findAnimationElement } from '../CarActions';

const useStopDrive = (
  car: Car,
  hasBeenDriven: boolean,
) => {
  const { state, dispatch } = useContext(StateContext);
  useEffect(() => {
    let isActual = true;
    const stopDrive = async () => {
      await AppLoader.stopEngine(car.id.toString(), EngineStatus.STOPPED)
        .then(() => {
          if (isActual) {
            const animElement = findAnimationElement(state.animElements, car.id);
            if (animElement) stopAnimation(animElement.animRef);
          }
        })
        .catch(() => {
          if (isActual) {
            console.log('Is actual');
          }
        });
    };
    if (hasBeenDriven) {
      stopDrive();
    }
    return () => {
      dispatch({ type: ActionTypes.CLEAR_ANIM_ELEMENT, payload: car.id });
      isActual = false;
    };
  }, [hasBeenDriven]);
};

export default useStopDrive;
