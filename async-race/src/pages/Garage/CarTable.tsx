import React, { useState } from 'react';
import Modal from '../../components/ui/Modal/Modal';
import { Car, UpdateCarParams } from '../../types/types';
import useModal from '../../components/ui/Modal/useModal';
import FormEdit from './FormEdit';

interface CarTableProps {
  cars: Car[],
  updateCar: (values: UpdateCarParams, id: string) => void,
}
function CarTable({ cars, updateCar }:CarTableProps) {
  const [isShown, openModal, closeModal] = useModal();
  const onCloseClicked = () => closeModal();

  const [carToEdit, setCarToEdit] = useState('');
  const onEditClicked = (carId: number) => { setCarToEdit(carId.toString()); openModal(); };
  const onCarUpdated = (values: UpdateCarParams) => {
    closeModal();
    updateCar(values, carToEdit);
  };
  console.log('render', carToEdit);
  return (
    <div id="carTable">
      {!cars || cars.length === 0 ? 'There are no cars' : cars.map((car) => (
        <div className="car__item" id={car.id.toString()}>
          {car.id}
          {' '}
          {car.name}
          {' '}
          {car.color}
          <button type="button" onClick={() => onEditClicked(car.id)}>Edit</button>
        </div>
      ))}
      <Modal
        isShown={isShown}
        headerText="Edit Modal"
        ModalContent={() => FormEdit({ onCarUpdated })}
        onCloseClicked={onCloseClicked}
      />
    </div>
  );
}
export default CarTable;
