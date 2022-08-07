import CarSVG from '../../components/CarSVG';
import AppLoader from '../../services/AppLoader';
import { GetWinnerResponse, WinnerForStats, Car } from '../../types/types';

async function prepareWinnersForDisplay(allWinners: GetWinnerResponse[]): Promise<WinnerForStats[]> {
  const promises = allWinners.map((winner) => AppLoader.getCar(winner.id));
  const cars = await Promise.allSettled(promises)
    .then((responses) => responses.filter((promise) => promise.status === 'fulfilled') as PromiseFulfilledResult<Car>[])
    .then((data: PromiseFulfilledResult<Car>[]) => data.map((el) => el.value));
  const winnersForStats = allWinners.map((winner) => {
    const car = cars.find((c) => c.id === winner.id) as Car;
    return {
      carId: winner.id,
      name: car.name,
      time: winner.time,
      image: () => CarSVG({ colorProp: car.color }),
      winsNum: winner.wins,
    } as WinnerForStats;
  });
  return winnersForStats;
}

export default prepareWinnersForDisplay;
