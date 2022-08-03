/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState, useEffect, SetStateAction, Dispatch,
} from 'react';
import Header from '../../components/Header';
import Pagination from '../../components/ui/Pagination/Pagination';
import { StateContext } from '../../state/State';
import {
  Car,
  OrderType, SortType, Winner,
  WinnerForStats,
} from '../../types/types';
import WinnersList from './WinnersTable';
import AppLoader from '../../services/AppLoader';
import CarIcon from '../Garage/CarIcon';

function Winners() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);

  const [winners, setWinners] = useState([] as WinnerForStats[]) as [WinnerForStats[], Dispatch<SetStateAction<WinnerForStats[]>>];
  async function prepareWinnersForDisplay(allWinners: Winner[]): Promise<WinnerForStats[]> {
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
        image: () => CarIcon({ color: car.color }),
        winsNum: winner.wins,
      } as WinnerForStats;
    });
    return winnersForStats;
  }
  useEffect(() => {
    async function getWinners() {
      const winnersResp = await AppLoader.getWinners(currentPage, SortType.ID, OrderType.ASC);
      console.log(winnersResp);
      const winnersForStats = await prepareWinnersForDisplay(winnersResp);
      setWinners(winnersForStats);
    }
    getWinners();
  }, [currentPage]);
  const sortWinners = async (sort: SortType, order: OrderType) => {
    const sortedWinners = await AppLoader.getWinners(currentPage, sort, order);
    const winnersForStats = await prepareWinnersForDisplay(sortedWinners);
    setWinners(winnersForStats);
  };
  return (
    <div>
      Winners
      <StateContext.Consumer>
        {(state) => (
          <Header state={state} />
        )}
      </StateContext.Consumer>
      <div>
        <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
        <WinnersList winners={winners} sortWinners={sortWinners} />
      </div>

    </div>
  );
}

export default Winners;
