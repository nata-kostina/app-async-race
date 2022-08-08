import styled from 'styled-components';

export const Backdrop = styled.div`
position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

export const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;
  width: 400px;
  height: 300px;
  background-color: #FFFFFF;


  border-radius: 10px;
`;
export const StyledModalInner = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
export const StyledBtn = styled.button`
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
export const StyledBtnClose = styled(StyledBtn)`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  position: fixed;
    top: -15px;
    right: -20px;
`;
