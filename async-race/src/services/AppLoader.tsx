import { limitPerPage } from '../data/constants';
import { Car } from '../types/types';
// import { Car } from '../types/types';
import load from './loader';

const AppLoader = {
  getCars: async (currentPage: number): Promise<Car[]> => load<Car[]>({ url: 'garage', params: { _page: currentPage.toString(), _limit: limitPerPage.toString() } })
    .then((data) => data)
    .catch((error: Error): Car[] => { console.log(error); return []; }),
};

export default AppLoader;
