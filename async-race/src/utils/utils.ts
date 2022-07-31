import { carBrand, carModal, randomCarsNum } from '../data/constants';
import { CarValues } from '../types/types';

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

export const calculateTime = (velocity: number, distance: number): number => {
  const time = Number(parseFloat((distance / velocity).toString()).toFixed(2));
  return time;
};
