/* eslint-disable array-callback-return */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, {
  MutableRefObject, useRef, Dispatch, SetStateAction, useEffect,
} from 'react';
import {
  AnimationElement, Car, DriveCarResult, EngineStatus,
} from '../../types/types';
import CarIcon from './CarIcon';
import AppLoader from '../../services/AppLoader';
import { calculateTime } from '../../utils/utils';
import { useOnFinishAnimation, useToggleButtons } from './hooks/CarHooks';
import {
  driveCar, findAnimationElement, startCarAnimation, stopCar,
} from './CarActions';

interface CarItemProps {
  car: Car;
  onEditClicked: (car: Car) => void;
  onDeleteClicked: (id: number) => void;
  isRacing: boolean;
  onStartRace: (anim: AnimationElement) => void;
  animElements: AnimationElement[],
  setAnimElements: Dispatch<SetStateAction<AnimationElement[]>>,
  startDriving: (asyncAction: () => Promise<DriveCarResult>) => void,
  hasBeenReset: boolean,
  setHasBeenReset: Dispatch<SetStateAction<boolean>>,
}

function CarItem({
  car, onEditClicked, onDeleteClicked, isRacing, onStartRace, animElements, setAnimElements, startDriving, hasBeenReset, setHasBeenReset,
}: CarItemProps) {
  const carRef = useRef() as MutableRefObject<HTMLDivElement>;
  const animRef = useRef(new Animation()) as MutableRefObject<Animation>;
  const [isBtnStartDisabled, isBtnStopDisabled, toggleButtons] = useToggleButtons() as [boolean, boolean, () => void];
  const [isFinished, setIsFinished] = useOnFinishAnimation(toggleButtons) as [boolean, Dispatch<SetStateAction<boolean>>];

  useEffect(() => {
    const anim = animElements.find((el) => el.carId === car.id);
    if (!anim) {
      setAnimElements((prevState) => [...prevState, {
        animRef, carRef, carId: car.id,
      }]);
    }
  }, []);

  const onStartActions = () => {
    toggleButtons();
    setIsFinished(false);
    console.log('onStartActions', animRef.current.playState);
  };
  const onSuccessFinishActions = (element: AnimationElement) => {
    setIsFinished(true);
    stopCar(element);
  };
  const onFinishAnimationActions = () => {
    setIsFinished(true);
    console.log(animRef.current.playState);
  };
  const onInterruptActions = (element: AnimationElement) => {
    stopCar(element);
    setIsFinished(true);
  };
  useEffect(() => {
    if (isRacing) {
      setIsFinished(false);
      const element = findAnimationElement(animElements, car.id);
      element.animRef.current = startCarAnimation(element, onStartActions, onFinishAnimationActions);
      startDriving(() => driveCar(car.id, element.time as number, () => onSuccessFinishActions(element), () => onInterruptActions(element)));
    }
  }, [isRacing]);

  useEffect(() => {
    if (hasBeenReset) {
      animRef.current.cancel();
      setHasBeenReset(false);
    }
  }, [hasBeenReset]);
  const onStartClicked = async () => {
    const { velocity, distance } = await AppLoader.startEngine(car.id.toString(), EngineStatus.STARTED);
    const time = calculateTime(velocity, distance);
    animRef.current = startCarAnimation({
      animRef, carRef, carId: car.id, time,
    }, onStartActions, onFinishAnimationActions);
    driveCar(car.id, time, () => onSuccessFinishActions({
      animRef, carRef, carId: car.id, time,
    }), () => onInterruptActions({
      animRef, carRef, carId: car.id, time,
    }));
  };
  const onStopClicked = async () => {
    stopCar({ animRef, carRef, carId: car.id });
    setIsFinished(true);
  };
  debugger;
  console.log('render playState', animRef.current.playState);
  return (
    <li className="car__item" id={car.id.toString()}>
      {car.id}
      {' '}
      {car.name}
      {' '}
      {car.color}
      <div ref={carRef} className="moving-container">
        <CarIcon color={car.color} />
      </div>
      <button type="button" onClick={() => onEditClicked(car)}>Edit</button>
      <button type="button" onClick={() => onDeleteClicked(car.id)}>Delete</button>
      <button
        type="button"
        onClick={() => onStartClicked()}
        disabled={isBtnStartDisabled}
      >
        Start

      </button>
      <button
        type="button"
        onClick={() => onStopClicked()}
        disabled={isBtnStopDisabled}
      >
        Stop
      </button>
    </li>
  );
}

export default CarItem;
