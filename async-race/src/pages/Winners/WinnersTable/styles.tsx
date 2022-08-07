import styled from 'styled-components';

export const StyledTable = styled.table`
  margin: 0 auto;
  font-family: 'DIN-Regular', sans-serif;
  font-size: 16px;
  width: 100%;

  & tr {
    border-radius: 3px;
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 0px 12px 1px rgba(111, 111, 115, 0.35);
    -moz-box-shadow: 0px 0px 12px 1px rgba(111, 111, 115, 0.35);
    box-shadow: 0px 0px 12px 1px rgba(111, 111, 115, 0.35);
  }
  & td, & th {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    flex-shrink: 1;
    flex-grow: 1;
    max-width: 150px;
}
`;

export const StyledBtn = styled.button`
  margin: 0 2px;

  height: 25px;
  width: 20px;

  background-color: transparent;

  color: #000000;
  outline: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #000000;
    color: #FFFFFF;
  }
`;
