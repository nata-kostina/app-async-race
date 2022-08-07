import styled from 'styled-components';
import Background from '../../assets/images/background-main.png';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${Background}), #e2e2e2;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

export default Container;
