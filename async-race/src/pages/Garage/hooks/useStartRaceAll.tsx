import { useContext, useEffect } from 'react';
import { StateContext } from '../../../state/State';
import { ActionTypes } from '../../../state/types';
import { Car } from '../../../types/types';
import { getTimeOfAllCars } from '../CarActions';

const useRaceAll = (
  cars: Car[],
  isRaceStarted: boolean,
) => {
  const { dispatch } = useContext(StateContext);
  useEffect(() => {
    let isActual = true;
    const raceAll = async () => {
      if (cars.length === 0) return;
      try {
        const response = await getTimeOfAllCars(cars);
        if (isActual) {
          response.forEach(({ time, id }) => dispatch({
            type: ActionTypes.ADD_TIME,
            payload: { carId: Number(id), time },
          }));
          dispatch({ type: ActionTypes.SET_IS_RACING, payload: true });
        }
      } catch (e) {
        // console.log(e);
      }
    };
    if (isRaceStarted) {
      raceAll();
    }
    return () => {
      isActual = false;
    };
  }, [isRaceStarted]);
};

export default useRaceAll;
