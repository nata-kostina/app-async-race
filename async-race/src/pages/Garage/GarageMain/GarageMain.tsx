/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import {
  AnimationElement, Car, DriveCarResult, EngineStatus, IState, Result, UpdateCarParams, Winner,
} from '../../../types/types';
import AppLoader from '../../../services/AppLoader';
import FormCreate from '../FormCreate/FormCreate';
import {
  generateRandomCars, convertMsToSeconds, addTimeToAnimationElement, getPagesNum,
} from '../../../utils/utils';
import { startEngine, getTimeOfAllCars } from '../CarActions';
import { useToggleBtn } from '../hooks/CarHooks';
import useDidMountEffect from '../../../hooks/GeneralHooks';
import Modal from '../../../components/ui/Modal/Modal';
import useModal from '../../../components/ui/Modal/useModal';
import { carsLimitPerPage } from '../../../data/constants';
import Flex from '../../../components/Flex';
import CarList from '../CarList/CarList';
import { Container, StyledBtn, StyledMain } from './styles';

const useCars = (currentPage: number, hasBeenUpdated: boolean) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [totalCarsNum, setTotalCarsNum] = useState() as [number, Dispatch<SetStateAction<number>>];
  const [totalPagesNum, setTotalPagesNum] = useState() as [number, Dispatch<SetStateAction<number>>];
  useEffect(() => {
    let isActual = true;
    const fetchData = async () => {
      const data: Car[] = await AppLoader.getCars(currentPage);
      if (isActual) {
        const num = await AppLoader.getTotalCarsNum();
        setTotalCarsNum(Number(num));
        setCars(data);
        const pages = getPagesNum(Number(num), carsLimitPerPage);
        setTotalPagesNum(pages);
      } else console.log('This fetch is not actual');
    };
    fetchData();
    return () => {
      isActual = false;
    };
  }, [currentPage, hasBeenUpdated]);
  return [cars, setCars, totalCarsNum, totalPagesNum];
};
interface GarageProps {
  state: IState;
}
function GarageMain({ state }: GarageProps) {
  const [currentPage, setCurrentPage] = useState(state.currentGaragePage);

  const onPageChanged = (value: number) => {
    setCurrentPage(value);
    state.currentGaragePage = value;
  };
  const [modalHeader, setModalHeader] = useState('');
  const [modalContent, setModalContent] = useState() as [JSX.Element, Dispatch<SetStateAction<JSX.Element>>];

  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [hasBeenReset, setHasBeenReset] = useState(false);
  const [isRacing, setIsRacing] = useState(false);
  const [isBtnRaceDisabled, toggleRaceBtn] = useToggleBtn() as [boolean, () => void];
  const [isPaginationDisabled, togglePaginationBtns] = useToggleBtn() as [boolean, () => void];
  // eslint-disable-next-line max-len
  const [cars, setCars, totalCarsNum, totalPagesNum] = useCars(currentPage, hasBeenUpdated) as [Car[], Dispatch<SetStateAction<Car[]>>, string, number];
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
      await AppLoader.deleteWinner(id);
      setHasBeenUpdated(!hasBeenUpdated);
    } catch (e) {
      console.log('Ooops! Deleting was failed');
    }
  };

  const createCar = async (values: UpdateCarParams) => {
    if (values.name.length === 0) {
      setModalHeader('Winner');
      const element = (
        <div>
          Car Name can`t be empty.
        </div>
      );
      setModalContent(element);
      setShowModal(true);
      return;
    }
    try {
      const data: Car = await AppLoader.createCar(values);
      setCars([...cars, data]);
      setHasBeenUpdated(!hasBeenUpdated);
    } catch (e) {
      console.log('Ooops! Creating was failed');
    }
  };

  const generateCars = () => generateRandomCars().forEach((car) => createCar(car));
  const [animElements, setAnimElements] = useState([] as AnimationElement[]);
  const [asyncActionResults, setAsyncActionResults] = useState([] as Promise<DriveCarResult>[]);
  const onFinishRacing = async (promises: Promise<DriveCarResult>[]) => {
    await Promise.allSettled(promises);
    toggleRaceBtn();
    togglePaginationBtns();
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
        AppLoader.updateWinner({ wins: winner.wins + 1, time: bestTime }, winnerCar.id.toString());
      })
      .catch((e) => {
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
        const failedIndex = ids.findIndex((i) => i === carId);
        const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
        const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
        return raceAll(restPromises, restIds);
      }
      const winnerCar = cars.find((car) => car.id === carId) as Car;
      setCurrentWinner(winnerCar);
      setModalHeader('Winner');
      const element = (
        <div>
          Winner is
          {' '}
          {winnerCar.id}
        </div>
      );
      setModalContent(element);
      setShowModal(true);
      onFinishRacing(promises);
      const timeSec = convertMsToSeconds(time);
      handleWinner(winnerCar, timeSec);
      return (winnerCar as Car).id as number;
    }

    if (asyncActionResults.length === cars.length) {
      const ids = cars.map((c) => c.id);
      raceAll(asyncActionResults, ids);
    }
  };
  useDidMountEffect(startRace, [asyncActionResults]);

  const race = async () => {
    if (cars.length === 0) return;
    toggleRaceBtn();
    togglePaginationBtns();
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

  return (
    <StyledMain>
      <Container>
        <Flex direction="row" align="center" justify="space-between">

          <Flex direction="column" align="start" justify="start">
            <span>
              Garage
            </span>
            <span>
              Total Cars Number
              {' '}
              {totalCarsNum}
            </span>
            <span>
              Page
              {' '}
              {state.currentGaragePage}
            </span>
            <Flex direction="column" align="start" justify="start">
              <FormCreate createCar={createCar} />
            </Flex>
          </Flex>
          <Flex direction="column" align="end" justify="start">
            <StyledBtn
              type="button"
              onClick={generateCars}
            >
              <span>Generate Random Cars</span>
            </StyledBtn>
            <StyledBtn
              type="button"
              onClick={race}
              disabled={isBtnRaceDisabled}
            >
              <span>Start Race</span>
            </StyledBtn>
            <StyledBtn
              type="button"
              onClick={reset}
            >
              <span>Reset</span>
            </StyledBtn>
            <StyledBtn
              type="button"
              onClick={reset}
            >
              <span>Create A Car</span>
            </StyledBtn>
          </Flex>
        </Flex>

        <Pagination total={totalPagesNum} currentPage={currentPage} onPageChanged={onPageChanged} isDisabled={isPaginationDisabled} />
      </Container>
      <CarList
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
      <Modal
        isShown={showModal}
        headerText={modalHeader}
        onCloseClicked={() => setShowModal(false)}
      >
        {modalContent}
      </Modal>
    </StyledMain>
  );
}

export default GarageMain;
