/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import {
  AnimationElement, Car, DriveCarResult, EngineStatus, IState, Result, UpdateCarParams, Winner,
} from '../../types/types';
import CarTable from './CarTable';
import AppLoader from '../../services/AppLoader';
import FormCreate from './FormCreate';
import { generateRandomCars, convertMsToSeconds, addTimeToAnimationElement } from '../../utils/utils';
import { startEngine, getTimeOfAllCars } from './CarActions';
import { useToggleBtn } from './hooks/CarHooks';
import useDidMountEffect from '../../hooks/GeneralHooks';
import Modal from '../../components/ui/Modal/Modal';

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
interface GarageProps {
  state: IState;
}
function Garage({ state }: GarageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);

  const [showModal, setShowModal] = useState(false);
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [hasBeenReset, setHasBeenReset] = useState(false);
  const [isRacing, setIsRacing] = useState(false);
  const [isBtnRaceDisabled, toggleRaceBtn] = useToggleBtn() as [boolean, () => void];
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
    console.log('onFinishRacing');
    await Promise.allSettled(promises);
    toggleRaceBtn();
    setIsRacing(false);
    state.isRacing = false;
    setAsyncActionResults([]);
  };
  const [currentWinner, setCurrentWinner] = useState({} as Car);

  function getBestTime(prevTime: number, newTime: number) {
    return newTime < prevTime ? newTime : prevTime;
  }

  async function handleWinner(winnerCar: Car, time: number) {
    await AppLoader.getWinner(winnerCar.id)
      .then((winner) => {
        const bestTime = getBestTime(winner.time, time);
        console.log('current time', time);
        console.log('winner.time', winner.time);
        AppLoader.updateWinner({ wins: winner.wins + 1, time: bestTime }, winnerCar.id.toString());
      })
      .catch((e) => {
        console.log('OOOPS, winner not found');
        AppLoader.createWinner({ id: winnerCar.id, wins: 1, time });
      });
  }
  const startRace = () => {
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
      const winnerCar = cars.find((car) => car.id === carId) as Car;
      // setWinner(winnerCar, time);
      setCurrentWinner(winnerCar);
      setShowModal(true);
      onFinishRacing(promises);
      const timeSec = convertMsToSeconds(time);
      handleWinner(winnerCar, timeSec);
      return (winnerCar as Car).id as number;
    }

    if (asyncActionResults.length === cars.length) {
      console.log('condition');
      const ids = cars.map((c) => c.id);
      raceAll(asyncActionResults, ids);
    }
  };
  useDidMountEffect(startRace, [asyncActionResults]);

  const race = async () => {
    toggleRaceBtn();
    const timeArr = await getTimeOfAllCars(cars);
    addTimeToAnimationElement(timeArr, setAnimElements);
    setIsRacing(true);
    state.isRacing = true;
  };

  const startDriving = (asyncAction: () => Promise<DriveCarResult>): void => {
    const result = asyncAction();
    setAsyncActionResults((prevState) => [...prevState, result]);
  };
  const reset = () => {
    setHasBeenReset(true);
  };
  const onModalClosed = () => {
    setShowModal(false);
  };

  return (
    <div className="Garage">
      Garage
      <span>{totalCarsNum}</span>
      <FormCreate createCar={createCar} />
      <button type="button" onClick={generateCars}>Generate Random Cars</button>
      <button type="button" onClick={race} disabled={isBtnRaceDisabled}>Start Race</button>
      <button type="button" onClick={reset}>Reset</button>
      <CarTable
        cars={cars}
        updateCar={updateCar}
        deleteCar={deleteCar}
        isRacing={isRacing}
        animElements={animElements}
        setAnimElements={setAnimElements}
        startDriving={startDriving}
        hasBeenReset={hasBeenReset}
        setHasBeenReset={setHasBeenReset}
      />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
      <Modal
        isShown={showModal}
        headerText="Winner"
        onCloseClicked={onModalClosed}
      >
        <div>
          Winner is
          {' '}
          {currentWinner.id}
        </div>
      </Modal>
    </div>
  );
}

export default Garage;
