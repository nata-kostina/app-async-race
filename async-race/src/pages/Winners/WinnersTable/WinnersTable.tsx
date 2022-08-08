import React, { useContext } from 'react';
import { StateContext } from '../../../state/State';
import { ActionTypes } from '../../../state/types';
import { Flex } from '../../../styles/GlobalStyles';
import { OrderType, SortType, WinnerForStats } from '../../../types/types';
import WinnersItem from '../WinnerItem/WinnerItem';
import { StyledTable, StyledBtn } from './styles';

interface WinnersProps {
  winners: WinnerForStats[];
}
function WinnersList({ winners }: WinnersProps) {
  const { dispatch } = useContext(StateContext);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Car ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>
            Wins
            <Flex direction="row">
              <StyledBtn
                type="button"
                className="btn btn-sort_asc"
                onClick={() => {
                  dispatch({ type: ActionTypes.SET_SORT, payload: SortType.WINS });
                  dispatch({ type: ActionTypes.SET_ORDER, payload: OrderType.ASC });
                }}
              >
                ↓
              </StyledBtn>
              <StyledBtn
                type="button"
                className="btn btn-sort_desc"
                onClick={() => {
                  dispatch({ type: ActionTypes.SET_SORT, payload: SortType.WINS });
                  dispatch({ type: ActionTypes.SET_ORDER, payload: OrderType.DESC });
                }}
              >
                ↑
              </StyledBtn>
            </Flex>
          </th>
          <th>
            Best time
            <Flex direction="row">
              <StyledBtn
                type="button"
                className="btn btn-sort_asc"
                onClick={() => {
                  dispatch({ type: ActionTypes.SET_SORT, payload: SortType.TIME });
                  dispatch({ type: ActionTypes.SET_ORDER, payload: OrderType.ASC });
                }}
              >
                ↓
              </StyledBtn>
              <StyledBtn
                type="button"
                className="btn btn-sort_desc"
                onClick={() => {
                  dispatch({ type: ActionTypes.SET_SORT, payload: SortType.TIME });
                  dispatch({ type: ActionTypes.SET_ORDER, payload: OrderType.DESC });
                }}
              >
                ↑
              </StyledBtn>
            </Flex>
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner) => <WinnersItem winner={winner} key={winner.carId} />)}
      </tbody>
    </StyledTable>
  );
}

export default WinnersList;
