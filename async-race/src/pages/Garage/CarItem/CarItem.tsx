import React, {
  MutableRefObject, useRef, Dispatch, SetStateAction, useEffect, useContext, useState,
} from 'react';
import {
  Car,
} from '../../../types/types';
import CarIcon from '../CarIcon/CarIcon';
import {
  FlagFinish, StyledBtn, StyledLi, StyledName, StyledStreet,
} from './styles';
import Flex from '../../../components/Flex';
import { colorStart, colorStop } from '../../../data/constants';
import { StateContext } from '../../../state/State';
import useStartDrive from '../hooks/useStartDrive';
import useStartRace from '../hooks/useStartRace';
import useStopDrive from '../hooks/useStopDrive';
import { useToggleButtons } from '../../../hooks/GeneralHooks';

interface CarItemProps {
  car: Car;
  onEditClicked: (car: Car) => void;
  onDeleteClicked: (id: number) => void;
  hasBeenReset: boolean,
  setHasBeenReset: Dispatch<SetStateAction<boolean>>,
}

function CarItem({
  car, onEditClicked, onDeleteClicked, hasBeenReset, setHasBeenReset,
}: CarItemProps) {
  const { state } = useContext(StateContext);
  const carRef = useRef() as MutableRefObject<HTMLDivElement>;
  const animRef = useRef(new Animation()) as MutableRefObject<Animation>;
  const [isBtnStartDisabled, isBtnStopDisabled, toggleButtons] = useToggleButtons() as [boolean, boolean, () => void];
  const [isDriving, setIsDriving] = useState(false);
  const [hasBeenDriven, setHasBeenDriven] = useState(false);
  useStartDrive(car, animRef, isDriving, setIsDriving, toggleButtons, carRef);
  useStopDrive(car, hasBeenDriven);
  useStartRace(car, animRef, state.isRacing, carRef);

  useEffect(() => {
    if (hasBeenReset) {
      animRef.current.cancel();
      setHasBeenReset(false);
    }
  }, [hasBeenReset]);

  const onStartClicked = async () => {
    setHasBeenDriven(false);
    setIsDriving(true);
    toggleButtons();
  };

  const onStopClicked = async () => {
    setHasBeenDriven(true);
    setIsDriving(false);
    toggleButtons();
  };

  return (
    <StyledLi className="car__item" id={car.id.toString()}>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        padding="0 15px"
      >
        <StyledName>
          {car.name}
        </StyledName>
        <Flex direction="row" align="center" justify="end">
          <StyledBtn
            type="button"
            onClick={() => onEditClicked(car)}
            color="transparent"
            disabled={false}
          >
            Edit
          </StyledBtn>
          <StyledBtn
            type="button"
            onClick={() => onDeleteClicked(car.id)}
            color="transparent"
          >
            Delete
          </StyledBtn>
        </Flex>
      </Flex>
      <StyledStreet>
        <div ref={carRef} className="moving-container">
          <CarIcon color={car.color} />
        </div>
        <FlagFinish />
      </StyledStreet>
      <Flex
        direction="row"
        justify="start"
        margin="15px 0 0 0"
        padding="0 15px"
      >
        <StyledBtn
          type="button"
          onClick={() => onStartClicked()}
          disabled={isBtnStartDisabled}
          color={colorStart}
        >
          Start
        </StyledBtn>
        <StyledBtn
          type="button"
          onClick={() => onStopClicked()}
          disabled={isBtnStopDisabled}
          color={colorStop}
        >
          Stop
        </StyledBtn>
      </Flex>
    </StyledLi>
  );
}

export default CarItem;
