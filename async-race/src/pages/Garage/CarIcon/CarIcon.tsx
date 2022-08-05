/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { CSSTransition, Transition } from 'react-transition-group';
import styled from 'styled-components';
import CarSVG from '../../../components/CarSVG';
import { Container } from './styles';

interface CarIconProps {
  color: string;
}

function CarIcon({
  color,
}: CarIconProps) {
  return (
    <Container>
      <CarSVG colorProp={color} />
    </Container>

  );
}

export default CarIcon;
