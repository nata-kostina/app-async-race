/* eslint-disable max-len */
import React, { Dispatch, SetStateAction, useState } from 'react';
import Modal from '../../components/ui/Modal/Modal';
import {
  AnimationElement, Car, DriveCarResult, UpdateCarParams,
} from '../../types/types';
import useModal from '../../components/ui/Modal/useModal';
import FormEdit from './FormEdit';
import CarItem from './CarItem';

interface CarTableProps {
  cars: Car[],
  updateCar: (values: UpdateCarParams, car: Car) => void,
  deleteCar: (id: string) => void,
  isRacing: boolean,
  animElements: AnimationElement[],
  setAnimElements: Dispatch<SetStateAction<AnimationElement[]>>,
  startDriving: (asyncAction: () => Promise<DriveCarResult>) => void,
  hasBeenReset: boolean,
  setHasBeenReset: Dispatch<SetStateAction<boolean>>,
}
function CarTable({
  cars, updateCar, deleteCar, isRacing, animElements, setAnimElements, startDriving, hasBeenReset, setHasBeenReset,
}: CarTableProps) {
  const [isShown, openModal, closeModal] = useModal();
  const onCloseClicked = () => closeModal();

  const [carToEdit, setCarToEdit] = useState<Car>({} as Car);
  const onEditClicked = (car: Car) => { setCarToEdit(car); openModal(); };
  const onDeleteClicked = (carId: number) => { deleteCar(carId.toString()); };
  const onCarUpdated = (values: UpdateCarParams) => {
    closeModal();
    updateCar(values, carToEdit);
  };

  const onStartRace = (anim: AnimationElement) => {
    console.log(anim);
  };
  return (
    <div id="carTable">
      {!cars || cars.length === 0 ? 'There are no cars'
        : cars.map((car) => (
          <CarItem
            car={car}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
            key={car.id}
            isRacing={isRacing}
            onStartRace={onStartRace}
            animElements={animElements}
            setAnimElements={setAnimElements}
            startDriving={startDriving}
            hasBeenReset={hasBeenReset}
            setHasBeenReset={setHasBeenReset}
          />
        ))}

      <Modal
        isShown={isShown}
        headerText="Edit Modal"
        onCloseClicked={onCloseClicked}
      >
        <FormEdit onCarUpdated={onCarUpdated} carToEdit={carToEdit} />
      </Modal>
    </div>
  );
}
export default CarTable;

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
