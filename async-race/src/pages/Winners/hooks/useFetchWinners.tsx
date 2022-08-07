import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { winnersLimitPerPage } from '../../../data/constants';
import AppLoader from '../../../services/AppLoader';
import { StateContext } from '../../../state/State';
import { WinnerForStats } from '../../../types/types';
import { getPagesNum } from '../../../utils/utils';
import prepareWinnersForDisplay from '../WinnersActions';

const useFetchWinners = (currentPage: number) => {
  const { state } = useContext(StateContext);
  const [totalPagesNum, setTotalPagesNum] = useState(1) as [number, Dispatch<SetStateAction<number>>];
  const [winners, setWinners] = useState([] as WinnerForStats[]) as [WinnerForStats[], Dispatch<SetStateAction<WinnerForStats[]>>];

  useEffect(() => {
    async function getWinners() {
      const winnersResp = await AppLoader.getWinners(state.currentWinnersPage, state.sort, state.order);
      if (!winnersResp || winnersResp.length === 0) return;
      const winnersForStats = await prepareWinnersForDisplay(winnersResp);
      const num = await AppLoader.getTotalWinnersNum();
      const pages = getPagesNum(Number(num), winnersLimitPerPage);
      setTotalPagesNum(pages);
      setWinners(winnersForStats);
    }
    getWinners();
  }, [currentPage, state.sort, state.order]);

  return [totalPagesNum, winners, setWinners];
};

export default useFetchWinners;
