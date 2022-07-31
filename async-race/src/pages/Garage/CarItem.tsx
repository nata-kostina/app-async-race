/* eslint-disable max-len */
import React, {
  MutableRefObject, useRef, Dispatch, SetStateAction,
} from 'react';
import { Car, EngineStatus } from '../../types/types';
import CarIcon from './CarIcon';
import AppLoader from '../../services/AppLoader';
import { calculateTime } from '../../utils/utils';
import { startAnimation, stopAnimation } from '../../utils/animation';
import { useOnFinishAnimation, useToggleButtons } from './hooks/CarHooks';

interface CarItemProps {
  car: Car;
  onEditClicked: (car: Car) => void;
  onDeleteClicked: (id: number) => void;
}

function CarItem({
  car, onEditClicked, onDeleteClicked,
}: CarItemProps) {
  const carElement = useRef() as MutableRefObject<HTMLDivElement>;
  const animRef = useRef() as MutableRefObject<Animation>;
  const [isBtnStartDisabled, isBtnStopDisabled, toggleButtons] = useToggleButtons() as [boolean, boolean, () => void];
  const [isFinished, setIsFinished] = useOnFinishAnimation(toggleButtons) as [boolean, Dispatch<SetStateAction<boolean>>];
  const stopCar = async (id: string) => {
    stopAnimation(animRef, setIsFinished);
    try {
      await AppLoader.startEngine(id, EngineStatus.STOPPED);
    } catch (e) {
      console.log(e);
    }
  };

  const startCar = async (id: string) => {
    const { velocity, distance } = await AppLoader.startEngine(id, EngineStatus.STARTED);
    const time = calculateTime(velocity, distance);
    animRef.current = startAnimation(carElement, time, setIsFinished);
    toggleButtons();
    setIsFinished(false);

    await AppLoader.driveCar(id, EngineStatus.DRIVE)
      .then((response) => console.log(response))
      .catch((e) => {
        console.log(e);
        if (!isFinished) { stopCar(id); }
      });
  };

  return (
    <li className="car__item" id={car.id.toString()}>
      {car.id}
      {' '}
      {car.name}
      {' '}
      {car.color}
      <div ref={carElement} className="moving-container">
        <CarIcon color={car.color} />
      </div>
      <button type="button" onClick={() => onEditClicked(car)}>Edit</button>
      <button type="button" onClick={() => onDeleteClicked(car.id)}>Delete</button>
      <button
        type="button"
        onClick={() => startCar(car.id.toString())}
        disabled={isBtnStartDisabled}
      >
        Start

      </button>
      <button
        type="button"
        onClick={() => stopCar(car.id.toString())}
        disabled={isBtnStopDisabled}
      >
        Stop
      </button>
    </li>
  );
}

export default CarItem;
