import React from 'react';
import { WinnerForStats } from '../../types/types';

interface WinnersItemProps {
  winner: WinnerForStats
}
function WinnersItem({ winner }: WinnersItemProps) {
  return (
    <tr>
      <td>{winner.carId}</td>
      <td><winner.image /></td>
      <td>{winner.name}</td>
      <td>{winner.winsNum}</td>
      <td>{winner.time}</td>
    </tr>
  );
}

export default WinnersItem;
