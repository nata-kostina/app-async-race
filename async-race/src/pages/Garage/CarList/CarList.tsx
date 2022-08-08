import React, { Dispatch, SetStateAction } from 'react';
import { Car } from '../../../types/types';
import CarItem from '../CarItem/CarItem';
import StyledList from './styles';

interface CarTableProps {
  cars: Car[],
  deleteCar: (id: string) => void,
  hasBeenReset: boolean,
  setHasBeenReset: Dispatch<SetStateAction<boolean>>,
  onEditClicked: (car: Car) => void;
}
function CarList({
  cars, deleteCar, hasBeenReset, setHasBeenReset, onEditClicked,
}: CarTableProps) {
  const onDeleteClicked = (carId: number) => { deleteCar(carId.toString()); };

  return (
    <StyledList>
      {!cars || cars.length === 0 ? 'There are no cars'
        : cars.map((car) => (
          <CarItem
            car={car}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
            key={car.id}
            hasBeenReset={hasBeenReset}
            setHasBeenReset={setHasBeenReset}
          />
        ))}
    </StyledList>
  );
}
export default CarList;
