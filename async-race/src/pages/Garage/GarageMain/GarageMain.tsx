/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState, Dispatch, SetStateAction, useContext,
} from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import {
  Car, UpdateCarParams, WinnerCar,
  ModalType,
} from '../../../types/types';
import AppLoader from '../../../services/AppLoader';
import FormCreate from '../FormCreate/FormCreate';
import {
  generateRandomCars,
} from '../../../utils/utils';
import Flex from '../../../components/Flex';
import CarList from '../CarList/CarList';
import { Container, StyledBtn, StyledMain } from './styles';
import { StateContext } from '../../../state/State';
import useRaceAll from '../hooks/useStartRaceAll';
import useGetWinner from '../hooks/useGetWinner';
import useStopRaceAll from '../hooks/useStopRaceAll';
import useHandleWinner from '../hooks/useHandleWinner';
import useFetchCars from '../hooks/useFetchCars';
import { ActionTypes } from '../../../state/types';
import { useToggleBtn } from '../../../hooks/GeneralHooks';
import Portal from '../../../components/ui/Modal/Portal';
import FormEdit from '../FormEdit/FormEdit';
import addToLogs from '../../../logs/log';

function GarageMain() {
  const { state, dispatch } = useContext(StateContext);
  const [isBtnRaceDisabled, setIsRaceBtnDisabled] = useState(false);
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [hasBeenReset, setHasBeenReset] = useState(false);
  const [hasBeenRaceStarted, setHasBeenRaceStarted] = useState(false);
  const [isPaginationDisabled, togglePaginationBtns] = useToggleBtn() as [boolean, () => void];
  const [cars, setCars, totalCarsNum, totalPagesNum] = useFetchCars(state.currentGaragePage, hasBeenUpdated) as [Car[], Dispatch<SetStateAction<Car[]>>, string, number];
  useRaceAll(cars, state.isRaceStarted);
  useGetWinner(cars, setHasBeenRaceStarted);
  const onPageChanged = (value: number) => dispatch({ type: ActionTypes.SET_GARAGE_PAGE, payload: value });
  const onFinishRaceActions = () => {
    setIsRaceBtnDisabled(false);
    togglePaginationBtns();
  };
  useStopRaceAll(hasBeenRaceStarted, setHasBeenRaceStarted, onFinishRaceActions);
  useHandleWinner(state.winner as WinnerCar, hasBeenRaceStarted);
  const updateCar = async (values: UpdateCarParams, car: Car) => {
    try {
      await AppLoader.updateCar(values, car.id.toString());
      setHasBeenUpdated(!hasBeenUpdated);
    } catch {
      addToLogs(`Failed to update car ${car.id.toString()}`);
    }
  };
  const deleteFromWinners = async (id: string) => {
    try {
      await AppLoader.deleteWinner(id);
    } catch {
      addToLogs(`Failed to delete a car ${id} from winners`);
    }
  };
  const deleteCar = async (id: string) => {
    try {
      await AppLoader.deleteCar(id);
      setHasBeenUpdated(!hasBeenUpdated);
      deleteFromWinners(id);
    } catch {
      addToLogs(`Failed to delete a car ${id}`);
    }
  };
  const createCar = async (values: UpdateCarParams) => {
    try {
      const data: Car = await AppLoader.createCar(values);
      setCars([...cars, data]);
      setHasBeenUpdated(!hasBeenUpdated);
    } catch {
      addToLogs('Failed to create a car');
    }
  };
  const onGenerateClicked = () => generateRandomCars().forEach((car) => createCar(car));
  const onRaceClicked = async () => {
    setIsRaceBtnDisabled(true);
    togglePaginationBtns();
    dispatch({ type: ActionTypes.SET_IS_RACE_STARTED, payload: true });
  };
  const onResetClicked = () => {
    setHasBeenReset(true);
  };
  const onCreateClicked = () => {
    dispatch({ type: ActionTypes.SET_MODAL_VISIBILITY, payload: true });
    dispatch({ type: ActionTypes.SET_MODAL, payload: ModalType.FORM_CREATE });
  };
  const closeModal = () => {
    dispatch({ type: ActionTypes.SET_MODAL_VISIBILITY, payload: false });
  };
  const [carToEdit, setCarToEdit] = useState() as [Car, Dispatch<SetStateAction<Car>>];
  const onEditClicked = (car: Car) => {
    setCarToEdit(car);
    dispatch({ type: ActionTypes.SET_MODAL_VISIBILITY, payload: true });
    dispatch({ type: ActionTypes.SET_MODAL, payload: ModalType.FORM_EDIT });
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
          </Flex>
          <Flex direction="column" align="end" justify="start">
            <StyledBtn
              type="button"
              onClick={onGenerateClicked}
            >
              <span>Generate Random Cars</span>
            </StyledBtn>
            <StyledBtn
              type="button"
              onClick={onRaceClicked}
              disabled={isBtnRaceDisabled}
            >
              <span>Start Race</span>
            </StyledBtn>
            <StyledBtn
              type="button"
              onClick={onResetClicked}
            >
              <span>Reset</span>
            </StyledBtn>
            <StyledBtn
              type="button"
              onClick={onCreateClicked}
            >
              <span>Create A Car</span>
            </StyledBtn>
          </Flex>
        </Flex>
        <Pagination
          total={totalPagesNum}
          currentPage={state.currentGaragePage}
          onPageChanged={onPageChanged}
          isDisabled={isPaginationDisabled}
        />
      </Container>
      <CarList
        cars={cars}
        updateCar={updateCar}
        deleteCar={deleteCar}
        hasBeenReset={hasBeenReset}
        setHasBeenReset={setHasBeenReset}
        onEditClicked={onEditClicked}
      />
      {state.modalVisibility && (
        <Portal closeModal={closeModal}>
          {state.modal === ModalType.FORM_CREATE && (
            <FormCreate
              createCar={createCar}
            />
          )}
          {state.modal === ModalType.SHOW_WINNER && (
            <div>
              <h3>
                Winner is
                {' '}
                {(state.winner as WinnerCar).name}
              </h3>
              <p>
                Time
                {' '}
                {(state.winner as WinnerCar).time}
                {' '}
                seconds
              </p>
            </div>
          )}
          {state.modal === ModalType.FORM_EDIT && (
            <FormEdit
              onCarUpdated={updateCar}
              carToEdit={carToEdit}
            />
          )}
        </Portal>
      )}
    </StyledMain>
  );
}

export default GarageMain;
