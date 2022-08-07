import {
  useContext, useState, Dispatch, SetStateAction, useEffect,
} from 'react';
import { carsLimitPerPage } from '../../../data/constants';
import AppLoader from '../../../services/AppLoader';
import { StateContext } from '../../../state/State';
import { Car } from '../../../types/types';
import { getPagesNum } from '../../../utils/utils';

const useFetchCars = (currentPage: number, hasBeenUpdated: boolean) => {
  const { state } = useContext(StateContext);
  const [cars, setCars] = useState<Car[]>([]);
  const [totalCarsNum, setTotalCarsNum] = useState() as [number, Dispatch<SetStateAction<number>>];
  const [totalPagesNum, setTotalPagesNum] = useState() as [number, Dispatch<SetStateAction<number>>];
  useEffect(() => {
    let isActual = true;
    const fetchData = async () => {
      const data: Car[] = await AppLoader.getCars(state.currentGaragePage);
      if (isActual) {
        const num = await AppLoader.getTotalCarsNum();
        setTotalCarsNum(Number(num));
        setCars(data);
        const pages = getPagesNum(Number(num), carsLimitPerPage);
        setTotalPagesNum(pages);
      }
    };
    fetchData();
    return () => {
      isActual = false;
    };
  }, [currentPage, hasBeenUpdated]);
  return [cars, setCars, totalCarsNum, totalPagesNum];
};

export default useFetchCars;
