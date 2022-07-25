import { limitPerPage } from '../data/constants';
// import { Car } from '../types/types';
import load from './loader';

const AppLoader = {
  getCars(currentPage: number) {
    const value = load({ url: 'garage', params: { page: currentPage.toString(), limit: limitPerPage.toString() } });
    console.log(value);
  },
};

export default AppLoader;
