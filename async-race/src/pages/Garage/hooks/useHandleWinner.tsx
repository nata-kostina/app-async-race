import { useEffect } from 'react';
import AppLoader from '../../../services/AppLoader';
import { WinnerCar } from '../../../types/types';
import { getBestTime } from '../../../utils/utils';

const useHandleWinner = (
  winner: WinnerCar,
  hasBeenRaceStarted: boolean,
) => {
  useEffect(() => {
    async function handleWinnerCar() {
      await AppLoader.getWinner(winner.id)
        .then((car) => {
          const bestTime = getBestTime(car.time, winner.time);
          AppLoader.updateWinner({ wins: car.wins + 1, time: bestTime }, car.id.toString());
        })
        .catch(() => {
          AppLoader.createWinner({ id: winner.id, wins: 1, time: winner.time });
        });
    }
    if (hasBeenRaceStarted) {
      handleWinnerCar();
    }
  }, [winner]);
};

export default useHandleWinner;
