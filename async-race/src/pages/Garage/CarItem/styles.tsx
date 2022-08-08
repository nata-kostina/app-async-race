import styled from 'styled-components';
import Street from '../../../assets/images/street.png';
import Flag from '../../../assets/images/finish-flag.png';
import { ButtonProps } from '../../../types/types';

export const StyledLi = styled.li`
list-style-type: none;
padding: 10px 0;
border-bottom: 1px dotted #FFFFFF;
`;

export const StyledBtn = styled.button<ButtonProps>`
    border-radius: 40px;
    color: #fff;
    border-color: #f1f1f1;
    border-width: 1px;
    border-radius: 5px;
    font-weight: 500;
    overflow: hidden;
    position: relative;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    transition: all 0.2s ease;
  
  font-family: "DINRegular";
  font-size: 16px;
  color: #ffffff;
  background-color: ${({ color }) => color || '#78A9C5'};
  padding: 4px 10px;
  margin-right: 8px;

  &:hover:enabled {
    cursor: pointer;
    transform: translateY(2px);
  }
  &:disabled {
    cursor: auto;
    background-color: #9b9b9b;
    color: #575757;
  }
`;

export const StyledStreet = styled.div`
background-image: url(${Street});
background-repeat: repeat;
background-size: contain;
width: 100%;
height: 60px;
position: relative;
`;
export const FlagFinish = styled.div`
background-image: url(${Flag});
background-repeat: no-repeat;
background-size: contain;
position: absolute;
height: 100%;
    width: 100%;
    top: 0;
    left: 80%;
`;

export const StyledName = styled.h2`
  font-family: 'DINRegular';
  font-size: 20px;
  color: #FFFFFF;
`;

export const MovingContainer = styled.div`
transition: translate 4s linear;
&.moving {
  animation-name: slidein;
  animation-duration: 4s;
}
@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
`;
