import { Dispatch, SetStateAction } from 'react';
import { carBrand, carModal, randomCarsNum } from '../data/constants';
import { AnimationElement, CarValues } from '../types/types';

export const generateRandomCarName = (): string => {
  const randomBrand = carBrand[Math.floor(Math.random() * carBrand.length)];
  const randomModel = carModal[Math.floor(Math.random() * carModal.length)];
  return `${randomBrand} ${randomModel}`;
};

const generateRnadomColor = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const generateRandomCars = (): CarValues[] => {
  const cars = [];
  for (let i = 0; i < randomCarsNum; i += 1) {
    cars.push({
      name: generateRandomCarName(),
      color: generateRnadomColor(),
    });
  }
  return cars;
};

export const convertMsToSeconds = (ms: number) => Number((ms / 1000).toFixed(2));

export const calculateTime = (velocity: number, distance: number): number => {
  const time = Number(parseFloat((distance / velocity).toString()).toFixed(2));
  return time;
};

export const addTimeToAnimationElement = (
  timeArr: {
    time: number;
    id: string;
  }[],
  setAnimElements: Dispatch<SetStateAction<AnimationElement[]>>,
) => timeArr.forEach((value) => {
  setAnimElements((prevState) => {
    if (prevState.length === 0) {
      return [];
    }
    return prevState.map((el) => {
      if (el.carId.toString() === value.id) {
        return { ...el, time: value.time };
      }
      return el;
    });
  });
});

export const getPagesNum = (totalItemsNum: number, limiPerPage: number) => Math.ceil(totalItemsNum / limiPerPage);

export const getBestTime = (prevTime: number, newTime: number) => (newTime < prevTime ? newTime : prevTime);
