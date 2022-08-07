import React, {
  SetStateAction, Dispatch, useContext,
} from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import { StateContext } from '../../../state/State';
import {
  OrderType, SortType,
  WinnerForStats,
} from '../../../types/types';
import WinnersList from '../WinnersTable/WinnersTable';
import AppLoader from '../../../services/AppLoader';
import StyledMain from './styles';
import Flex from '../../../components/Flex';
import useFetchWinners from '../hooks/useFetchWinners';
import prepareWinnersForDisplay from '../WinnersActions';
import { ActionTypes } from '../../../state/types';

function WinnersMain() {
  const { state, dispatch } = useContext(StateContext);

  const onPageChanged = (value: number) => dispatch({ type: ActionTypes.SET_WINNERS_PAGE, payload: value });
  const [totalPagesNum, winners, setWinners] = useFetchWinners(state.currentWinnersPage) as [number, WinnerForStats[], Dispatch<SetStateAction<WinnerForStats[]>>];

  const sortWinners = async (sort: SortType, order: OrderType) => {
    const sortedWinners = await AppLoader.getWinners(state.currentWinnersPage, sort, order);
    const winnersForStats = await prepareWinnersForDisplay(sortedWinners);
    setWinners(winnersForStats);
  };
  return (
    <StyledMain>
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
      <div>
        <Pagination total={totalPagesNum} currentPage={state.currentWinnersPage} onPageChanged={onPageChanged} isDisabled={false} />
        <WinnersList winners={winners} sortWinners={sortWinners} />
      </div>

    </StyledMain>
  );
}

export default WinnersMain;
