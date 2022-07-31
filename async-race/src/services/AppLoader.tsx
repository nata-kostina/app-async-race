/* eslint-disable max-len */
import { limitPerPage } from '../data/constants';
import {
  Car, EngineResponse, EngineStatus, UpdateCarParams, EngineDriveModeResponse,
} from '../types/types';
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

  startEngine: async (id: string, status: EngineStatus): Promise<EngineResponse> => load<EngineResponse>({
    url: 'engine',
    method: 'PATCH',
    queryParams: { id, status },
  })
    .then((data) => data),
  // .catch((error: Error): Car[] => { console.log(error); return []; }),

  stopEngine: async (id: string, status: EngineStatus): Promise<EngineResponse> => load<EngineResponse>({
    url: 'engine',
    method: 'PATCH',
    queryParams: { id, status },
  })
    .then((data) => data)
    .catch((error: string) => { throw new Error(error); }),

  driveCar: async (id: string, status: EngineStatus): Promise<EngineDriveModeResponse> => load<EngineDriveModeResponse>({
    url: 'engine',
    method: 'PATCH',
    queryParams: { id, status },
  })
    .then((data) => data)
    .catch((error: string) => { throw new Error(error); }),
};

export default AppLoader;
