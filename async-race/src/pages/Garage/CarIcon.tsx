/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { CSSTransition, Transition } from 'react-transition-group';
import CarSVG from '../../components/CarSVG';

interface CarIconProps {
  color: string;
}

function CarIcon({
  color,
}: CarIconProps) {
  return (
    <div>
      <div className="img-container">
        <CarSVG colorProp={color} />
      </div>
    </div>
  );
}

export default CarIcon;
