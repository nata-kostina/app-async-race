import styled from 'styled-components';

export const StyledInput = styled.input`
`;

export const StyledPagination = styled.label`
width: 300px;

`;

export type Props = {
  disabled: boolean;
  isActive?: boolean;
};
export const StyledButton = styled.button<Props>`
font-family: "DIN-Bold", sans-serif;
background: #FFFFFF;
border: ${({ isActive }) => (isActive ? '1px solid #fcb111' : '1px solid #2A80B0')};
border-radius: 4px;
font-size: 14px;
text-align: center;
color: ${({ isActive }) => (isActive ? '#fcb111' : '#2A80B0')};
height: 25px;
width: 25px;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
margin: 0 3px;
&:hover:enabled {
  cursor: pointer;
}
&:disabled {
  background: #919EAB;
  opacity: 0.5;
}
`;

export const RoundStyledButton = styled(StyledButton)`
border-radius: 50%;
`;
