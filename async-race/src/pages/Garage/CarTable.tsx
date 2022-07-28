import React, { useState } from 'react';
import Modal from '../../components/ui/Modal/Modal';
import { Car, UpdateCarParams } from '../../types/types';
import useModal from '../../components/ui/Modal/useModal';
import FormEdit from './FormEdit';
import CarSVG from '../../components/CarSVG';

interface CarTableProps {
  cars: Car[],
  updateCar: (values: UpdateCarParams, car: Car) => void,
  deleteCar: (id: string) => void
}
function CarTable({ cars, updateCar, deleteCar }: CarTableProps) {
  const [isShown, openModal, closeModal] = useModal();
  const onCloseClicked = () => closeModal();

  const [carToEdit, setCarToEdit] = useState<Car>({} as Car);
  const onEditClicked = (car: Car) => { setCarToEdit(car); openModal(); };
  const onDeleteClicked = (carId: number) => { deleteCar(carId.toString()); };
  const onCarUpdated = (values: UpdateCarParams) => {
    closeModal();
    updateCar(values, carToEdit);
  };
  return (
    <div id="carTable">
      {!cars || cars.length === 0 ? 'There are no cars' : cars.map((car) => (
        <div className="car__item" id={car.id.toString()}>
          {car.id}
          {' '}
          {car.name}
          {' '}
          {car.color}
          <div className="img-container">
            <CarSVG colorProp={car.color} />
          </div>
          <button type="button" onClick={() => onEditClicked(car)}>Edit</button>
          <button type="button" onClick={() => onDeleteClicked(car.id)}>Delete</button>
        </div>
      ))}
      <Modal
        isShown={isShown}
        headerText="Edit Modal"
        ModalContent={() => FormEdit({ onCarUpdated, carToEdit })}
        onCloseClicked={onCloseClicked}
      />
    </div>
  );
}
export default CarTable;
