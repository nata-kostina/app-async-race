import React from 'react';
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
