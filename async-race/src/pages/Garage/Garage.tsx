/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState, useEffect, useRef, MutableRefObject, Dispatch, SetStateAction,
} from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import {
  AnimationElement, Car, DriveCarResult, EngineStatus, Result, UpdateCarParams,
} from '../../types/types';
import CarTable from './CarTable';
import AppLoader from '../../services/AppLoader';
import FormCreate from './FormCreate';
import { generateRandomCars, calculateTime, addTimeToAnimationElement } from '../../utils/utils';
import { startEngine, getTimeOfAllCars } from './CarActions';
import { useToggleRaceButton } from './hooks/CarHooks';

const useCars = (currentPage: number, hasBeenUpdated: boolean) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [totalCarsNum, setTotalCarsNum] = useState('0');
  useEffect(() => {
    let isActual = true;
    const fetchData = async () => {
      const data: Car[] = await AppLoader.getCars(currentPage);
      if (isActual) {
        const num = await AppLoader.getTotalCount();
        setTotalCarsNum(num);
        setCars(data);
      } else console.log('This fetch is not actual');
    };
    fetchData();
    return () => {
      isActual = false;
    };
  }, [currentPage, hasBeenUpdated]);
  return [cars, setCars, totalCarsNum];
};

function Garage() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);

  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [isRacing, setIsRacing] = useState(false);
  const [isBtnRaceDisabled, toggleButton] = useToggleRaceButton() as [boolean, () => void];

  // eslint-disable-next-line max-len
  const [cars, setCars, totalCarsNum] = useCars(currentPage, hasBeenUpdated) as [Car[], Dispatch<SetStateAction<Car[]>>, string];
  const updateCar = async (values: UpdateCarParams, car: Car) => {
    try {
      await AppLoader.updateCar(values, car.id.toString());
      setHasBeenUpdated(!hasBeenUpdated);
    } catch (e) {
      console.log('Ooops! Updating was failed');
    }
  };

  const deleteCar = async (id: string) => {
    try {
      await AppLoader.deleteCar(id);
      setHasBeenUpdated(!hasBeenUpdated);
    } catch (e) {
      console.log('Ooops! Deleting was failed');
    }
  };

  const createCar = async (values: UpdateCarParams) => {
    try {
      const data: Car = await AppLoader.createCar(values);
      setCars([...cars, data]);
    } catch (e) {
      console.log('Ooops! Creating was failed');
    }
  };

  const generateCars = () => generateRandomCars().forEach((car) => createCar(car));
  const [animElements, setAnimElements] = useState([] as AnimationElement[]);
  const [asyncActionResults, setAsyncActionResults] = useState([] as Promise<DriveCarResult>[]);
  const onFinishRacing = async (promises: Promise<DriveCarResult>[]) => {
    await Promise.allSettled(promises);
    toggleButton();
    setIsRacing(false);
    setAsyncActionResults([]);
  };
  const [winner, setWinner] = useState({} as Car);

  useEffect(() => {
    async function raceAll(promises: Promise<DriveCarResult>[], ids: number[]): Promise<number> {
      if (promises.length === 0) {
        onFinishRacing([]);
        return -1;
      }
      const { carId, result, time } = await Promise.race(promises);
      if (result === Result.FAIL) {
        console.log('Failed Car ID', carId);
        const failedIndex = ids.findIndex((i) => i === carId);
        const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
        const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
        return raceAll(restPromises, restIds);
      }
      console.log('Success Car ID', carId);
      const winnerCar = cars.find((car) => car.id === carId);
      setWinner(winnerCar as Car);
      onFinishRacing(promises);
      return (winnerCar as Car).id as number;
    }

    if (asyncActionResults.length === cars.length) {
      const ids = cars.map((c) => c.id);
      raceAll(asyncActionResults, ids);
    }
  }, [asyncActionResults]);

  const race = async () => {
    toggleButton();
    const timeArr = await getTimeOfAllCars(cars);
    addTimeToAnimationElement(timeArr, setAnimElements);
    setIsRacing(true);
  };

  const startDriving = (asyncAction: () => Promise<DriveCarResult>): void => {
    const result = asyncAction();
    setAsyncActionResults((prevState) => [...prevState, result]);
  };

  return (
    <div className="Garage">
      Garage
      <span>{totalCarsNum}</span>
      <FormCreate createCar={createCar} />
      <button type="button" onClick={generateCars}>Generate Random Cars</button>
      <button type="button" onClick={race} disabled={isBtnRaceDisabled}>Start Race</button>
      <CarTable
        cars={cars}
        updateCar={updateCar}
        deleteCar={deleteCar}
        isRacing={isRacing}
        animElements={animElements}
        setAnimElements={setAnimElements}
        startDriving={startDriving}
      />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
