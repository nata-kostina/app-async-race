import {
  AnimationElement, Car, DriveCarResult, EngineStatus, Result,
} from '../../types/types';
import { calculateTime } from '../../utils/utils';
import AppLoader from '../../services/AppLoader';
import { startAnimation, stopAnimation } from '../../utils/animation';
import addToLogs from '../../logs/log';

export const startEngine = async (id: string): Promise<{
  id: string;
  time: number;
}> => {
  const { velocity, distance } = await AppLoader.startEngine(id, EngineStatus.STARTED);
  const time = calculateTime(velocity, distance);
  return { id, time };
};

export const stopCar = async (element: AnimationElement) => {
  stopAnimation(element.animRef);
  try {
    await AppLoader.stopEngine(element.carId.toString(), EngineStatus.STOPPED);
  } catch {
    addToLogs(`Failed to stop a car ${element.carId.toString()}`);
  }
};

export const getTimeOfAllCars = (cars: Car[]): Promise<{
  time: number;
  id: string;
}[]> => {
  const timePromises: Promise<{ time: number, id: string }>[] = [];
  cars.forEach((car) => {
    timePromises.push(startEngine(car.id.toString()));
  });
  return Promise.all(timePromises);
};

export async function driveCar(id: number, time: number, onSuccessFinishActions: () => void, onInterruptActions: () => void): Promise<DriveCarResult> {
  const result = await AppLoader.driveCar(id.toString(), EngineStatus.DRIVE)
    .then(() => {
      onSuccessFinishActions();
      return {
        carId: id,
        result: Result.SUCCESS,
        time,
      };
    })
    .catch(() => {
      onInterruptActions();
      return {
        carId: id,
        result: Result.FAIL,
        time,
      };
    });
  return result;
}
export const startCarAnimation = (element: AnimationElement, onStartActions: () => void) => {
  onStartActions();
  const anim = startAnimation(element.carRef, element.time as number);
  return anim;
};

export const findAnimationElement = (animElements: AnimationElement[], id: number) => animElements.find((el) => el.carId === id) as AnimationElement;
