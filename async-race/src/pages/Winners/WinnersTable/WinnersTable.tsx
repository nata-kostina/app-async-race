/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Flex from '../../../components/Flex';
import { OrderType, SortType, WinnerForStats } from '../../../types/types';
import WinnersItem from '../WinnerItem/WinnerItem';
import { StyledTable, StyledBtn } from './styles';

interface WinnersProps {
  winners: WinnerForStats[];
  sortWinners: (sort: SortType, order: OrderType) => void;
}
function WinnersList({ winners, sortWinners }: WinnersProps) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Car ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>
            Wins
            <Flex direction="row">
              <StyledBtn
                type="button"
                className="btn btn-sort_asc"
                onClick={() => sortWinners(SortType.WINS, OrderType.ASC)}
              >
                ↓
              </StyledBtn>
              <StyledBtn
                type="button"
                className="btn btn-sort_desc"
                onClick={() => sortWinners(SortType.WINS, OrderType.DESC)}
              >
                ↑
              </StyledBtn>
            </Flex>
          </th>
          <th>
            Best time
            <Flex direction="row">
              <StyledBtn
                type="button"
                className="btn btn-sort_asc"
                onClick={() => sortWinners(SortType.TIME, OrderType.ASC)}
              >
                ↓
              </StyledBtn>
              <StyledBtn
                type="button"
                className="btn btn-sort_desc"
                onClick={() => sortWinners(SortType.TIME, OrderType.DESC)}
              >
                ↑
              </StyledBtn>
            </Flex>
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner) => <WinnersItem winner={winner} key={winner.carId} />)}
      </tbody>
    </StyledTable>
  );
}

export default WinnersList;
