import {
  Dispatch,
  SetStateAction,
  useContext, useEffect,
} from 'react';
import { StateContext } from '../../../state/State';
import { ActionTypes } from '../../../state/types';

const useStopRaceAll = (
  hasBeenRaceStarted: boolean,
  setHasBeenRaceStarted: Dispatch<SetStateAction<boolean>>,
  onFinishRaceActions: () => void,
) => {
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    async function stopRace() {
      await Promise.allSettled(state.driveCarPromises);
      onFinishRaceActions();
      setHasBeenRaceStarted(false);
      dispatch({ type: ActionTypes.SET_IS_RACE_STARTED, payload: false });
      dispatch({ type: ActionTypes.CLEAR_DRIVE_CAR_PROMISES, payload: [] });
      dispatch({ type: ActionTypes.CLEAR_ANIM_ELEMENTS, payload: [] });
      dispatch({ type: ActionTypes.CLEAR_TIME_ARR, payload: null });
    }
    if (hasBeenRaceStarted) {
      stopRace();
    }
  }, [hasBeenRaceStarted]);
};

export default useStopRaceAll;
