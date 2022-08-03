/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { OrderType, SortType, WinnerForStats } from '../../types/types';
import WinnersItem from './WinnerItem';

interface WinnersProps {
  winners: WinnerForStats[];
  sortWinners: (sort: SortType, order: OrderType) => void;
}
function WinnersList({ winners, sortWinners }: WinnersProps) {
  return (
    <table className="Winners">
      <thead>
        <tr>
          <th>Car ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>
            Wins number
            <button
              type="button"
              className="btn btn-sort_asc"
              onClick={() => sortWinners(SortType.WINS, OrderType.ASC)}
            >
              Sort ACS
            </button>
            <button
              type="button"
              className="btn btn-sort_desc"
              onClick={() => sortWinners(SortType.WINS, OrderType.DESC)}
            >
              Sort DESC
            </button>
          </th>
          <th>
            Best time
            <button
              type="button"
              className="btn btn-sort_asc"
              onClick={() => sortWinners(SortType.TIME, OrderType.ASC)}
            >
              Sort ACS
            </button>
            <button
              type="button"
              className="btn btn-sort_desc"
              onClick={() => sortWinners(SortType.TIME, OrderType.DESC)}
            >
              Sort DESC
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner) => <WinnersItem winner={winner} key={winner.carId} />)}
      </tbody>
    </table>
  );
}

export default WinnersList;
