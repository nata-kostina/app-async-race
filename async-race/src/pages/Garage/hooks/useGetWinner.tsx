import {
  Dispatch, SetStateAction, useContext, useEffect,
} from 'react';
import { StateContext } from '../../../state/State';
import { ActionTypes } from '../../../state/types';
import {
  Car, DriveCarResult, ModalType, Result, WinnerCar,
} from '../../../types/types';
import { convertMsToSeconds } from '../../../utils/utils';

const useGetWinner = (
  cars: Car[],
  setHasBeenRacedAll: Dispatch<SetStateAction<boolean>>,
) => {
  const { state, dispatch } = useContext(StateContext);
  async function getWinner(promises: Promise<DriveCarResult>[], ids: number[]): Promise<WinnerCar | null> {
    if (promises.length === 0) {
      return null;
    }
    const { carId, result, time } = await Promise.race(promises);
    if (result === Result.FAIL) {
      const failedIndex = ids.findIndex((i) => i === carId);
      const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
      const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
      return getWinner(restPromises, restIds);
    }
    const winnerCar = cars.find((car) => car.id === carId) as Car;
    const timeInSec = convertMsToSeconds(time);
    return { ...winnerCar, time: timeInSec };
  }

  useEffect(() => {
    async function startRace() {
      const ids = cars.map((c) => c.id);
      const supposedWinner = await getWinner(state.driveCarPromises, ids);
      if (!supposedWinner) {
        console.log('Ooops! All cars were broken');
        setHasBeenRacedAll(true);
        return;
      }
      console.log('supposedWinner', supposedWinner);
      dispatch({ type: ActionTypes.SET_WINNER, payload: supposedWinner });
      dispatch({ type: ActionTypes.SET_MODAL, payload: ModalType.SHOW_WINNER });
      dispatch({ type: ActionTypes.SET_MODAL_VISIBILITY, payload: true });
      setHasBeenRacedAll(true);
    }
    if (!state.isRaceStarted) return;
    startRace();
  }, [state.driveCarPromises]);
};

export default useGetWinner;
