/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Car, UpdateCarParams,
} from '../../../types/types';
import FormEdit from '../FormEdit/FormEdit';
import CarItem from '../CarItem/CarItem';
import StyledList from './styles';

interface CarTableProps {
  cars: Car[],
  updateCar: (values: UpdateCarParams, car: Car) => void,
  deleteCar: (id: string) => void,
  hasBeenReset: boolean,
  setHasBeenReset: Dispatch<SetStateAction<boolean>>,
  onEditClicked: (car: Car) => void;
}
function CarList({
  cars, updateCar, deleteCar, hasBeenReset, setHasBeenReset, onEditClicked,
}: CarTableProps) {
  const [carToEdit, setCarToEdit] = useState<Car>({} as Car);

  const onDeleteClicked = (carId: number) => { deleteCar(carId.toString()); };
  const onCarUpdated = (values: UpdateCarParams) => {
    updateCar(values, carToEdit);
  };

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

// cars.map((car) => (
//   <CarItem
//     car={car}
//     onEditClicked={onEditClicked}
//     onDeleteClicked={onDeleteClicked}
//     key={car.id}
//     isRacing={isRacing}
//     onStartRace={onStartRace}
//     animElements={animElements}
//     setAnimElements={setAnimElements}
//     startDriving={startDriving}
//   />
// ))

// (
//   <CarItem
//     car={cars[0]}
//     onEditClicked={onEditClicked}
//     onDeleteClicked={onDeleteClicked}
//     key={cars[0].id}
//     isRacing={isRacing}
//     onStartRace={onStartRace}
//     animElements={animElements}
//     setAnimElements={setAnimElements}
//     startDriving={startDriving}
//   />
// )
