/* eslint-disable no-param-reassign */
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
  IState,
  OrderType, SortType, Winner,
  WinnerForStats,
} from '../../types/types';
import WinnersList from './WinnersTable';
import AppLoader from '../../services/AppLoader';
import CarIcon from '../Garage/CarIcon';
import { getPagesNum } from '../../utils/utils';
import { winnersLimitPerPage } from '../../data/constants';

interface GarageProps {
  state: IState;
}
function Winners({ state }: GarageProps) {
  const [currentPage, setCurrentPage] = useState(state.currentWinnersPage);
  const [totalPagesNum, setTotalPagesNum] = useState() as [number, Dispatch<SetStateAction<number>>];

  const onPageChanged = (value: number) => {
    setCurrentPage(value);
    state.currentWinnersPage = value;
  };

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
      const winnersForStats = await prepareWinnersForDisplay(winnersResp);
      const num = await AppLoader.getTotalWinnersNum();
      setTotalPagesNum(Number(num));
      const pages = getPagesNum(Number(num), winnersLimitPerPage);
      setTotalPagesNum(pages);
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
      <span>
        Page
        {' '}
        {currentPage}
      </span>
      <span>
        Total Winners Number
        {' '}
        {winners.length}
      </span>
      <StateContext.Consumer>
        {(state2) => (
          <Header state={state2} />
        )}
      </StateContext.Consumer>
      <div>
        <Pagination total={totalPagesNum} currentPage={currentPage} onPageChanged={onPageChanged} isDisabled={false} />
        <WinnersList winners={winners} sortWinners={sortWinners} />
      </div>

    </div>
  );
}

export default Winners;
