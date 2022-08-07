import React, {
  useContext,
} from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import { StateContext } from '../../../state/State';
import {
  WinnerForStats,
} from '../../../types/types';
import WinnersList from '../WinnersTable/WinnersTable';
import StyledMain, { Container } from './styles';
import Flex from '../../../components/Flex';
import useFetchWinners from '../hooks/useFetchWinners';
import { ActionTypes } from '../../../state/types';

function WinnersMain() {
  const { state, dispatch } = useContext(StateContext);
  const onPageChanged = (value: number) => dispatch({ type: ActionTypes.SET_WINNERS_PAGE, payload: value });
  const [totalPagesNum, winners] = useFetchWinners(state.currentWinnersPage) as [number, WinnerForStats[]];

  return (
    <StyledMain>
      <Container>
        Winners
        <Flex direction="column">
          <span>
            Page
            {' '}
            {state.currentWinnersPage}
          </span>
          <span>
            Total Winners Number
            {' '}
            {winners.length}
          </span>
        </Flex>
        <Pagination total={totalPagesNum} currentPage={state.currentWinnersPage} onPageChanged={onPageChanged} isDisabled={false} />
        <WinnersList winners={winners} />
      </Container>
    </StyledMain>
  );
}

export default WinnersMain;
