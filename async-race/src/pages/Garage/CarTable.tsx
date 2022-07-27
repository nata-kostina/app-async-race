import React from 'react';
import { Car } from '../../types/types';

interface CarTableProps {
  cars: Car[]
}
function CarTable({ cars }:CarTableProps) {
  return (
    <div id="car">
      {!cars || cars.length === 0 ? 'There are no cars' : cars.map((car) => (
        <div>
          {car.id}
          {' '}
          {car.name}
          {' '}
          {car.color}
        </div>
      ))}
    </div>
  );
}
export default CarTable;
