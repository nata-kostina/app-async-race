import React from 'react';
import { WinnerForStats } from '../../../types/types';
import ImgContainer from './styles';

interface WinnersItemProps {
  winner: WinnerForStats
}
function WinnersItem({ winner }: WinnersItemProps) {
  return (
    <tr>
      <td>{winner.carId}</td>
      <td>
        <ImgContainer>
          <winner.image />
        </ImgContainer>
      </td>
      <td>{winner.name}</td>
      <td>{winner.winsNum}</td>
      <td>{winner.time}</td>
    </tr>
  );
}

export default WinnersItem;
