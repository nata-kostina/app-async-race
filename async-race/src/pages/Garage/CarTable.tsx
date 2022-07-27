import React from 'react';
import Modal from '../../components/ui/Modal/Modal';
import { Car } from '../../types/types';
import useModal from '../../components/ui/Modal/useModal';
// import Form from '../../components/ui/Form/Form';
import FormEdit from './FormEdit';

interface CarTableProps {
  cars: Car[]
}
function CarTable({ cars }:CarTableProps) {
  const [isShown, openModal, closeModal] = useModal();
  const onEditClicked = () => openModal();
  const onCloseClicked = () => closeModal();

  return (
    <div id="carTable">
      {!cars || cars.length === 0 ? 'There are no cars' : cars.map((car) => (
        <div className="car__item" id={car.id.toString()}>
          {car.id}
          {' '}
          {car.name}
          {' '}
          {car.color}
          <button type="button" onClick={onEditClicked}>Edit</button>
        </div>
      ))}
      <Modal
        isShown={isShown}
        headerText="Edit Modal"
        ModalContent={FormEdit}
        onCloseClicked={onCloseClicked}
      />
    </div>
  );
}
export default CarTable;
