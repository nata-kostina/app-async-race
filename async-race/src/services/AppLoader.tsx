import { limitPerPage } from '../data/constants';
import { Car, UpdateCarParams } from '../types/types';
import { load, getHeaders } from './loader';

const AppLoader = {
  getCars: async (currentPage: number): Promise<Car[]> => load<Car[]>({
    url: 'garage',
    method: 'GET',
    queryParams: { _page: currentPage.toString(), _limit: limitPerPage.toString() },
  })
    .then((data) => data)
    .catch((error: Error): Car[] => { console.log(error); return []; }),

  updateCar: async (dataParams: UpdateCarParams, id: string): Promise<Car> => load<Car>({
    url: `garage/${id}`,
    method: 'PUT',
    dataParams,
  })
    .then((data) => data),

  deleteCar: async (id: string): Promise<{}> => load<{}>({
    url: `garage/${id}`,
    method: 'DELETE',
  })
    .then((data) => data),

  createCar: async (dataParams: UpdateCarParams): Promise<Car> => load<Car>({
    url: 'garage',
    method: 'POST',
    dataParams,
  })
    .then((data) => data),

  getTotalCount: async (): Promise<string> => getHeaders({
    url: 'garage',
    method: 'GET',
    queryParams: { _limit: '1' },
  })
    .then((headers: Headers) => headers.get('X-Total-Count') as string),
};

export default AppLoader;
