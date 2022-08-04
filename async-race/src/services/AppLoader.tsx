/* eslint-disable max-len */
import { carsLimitPerPage, winnersLimitPerPage } from '../data/constants';
import {
  Car, EngineResponse, EngineStatus, UpdateCarParams, EngineDriveModeResponse, SortType, OrderType,
  Winner,
  UpdateWinnerParams,
} from '../types/types';
import { load, getHeaders } from './loader';

const AppLoader = {
  getCars: async (currentPage: number): Promise<Car[]> => load<Car[]>({
    url: 'garage',
    method: 'GET',
    queryParams: { _page: currentPage.toString(), _limit: carsLimitPerPage.toString() },
  })
    .then((data) => data)
    .catch((error: Error): Car[] => { console.log(error); return []; }),

  getCar: async (id: number): Promise<Car> => load<Car>({
    url: `garage/${id}`,
    method: 'GET',
  })
    .then((data) => data)
    .catch((error: Error) => { throw new Error(error.message); }),

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

  getTotalCarsNum: async (): Promise<string> => getHeaders({
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

  getWinners: async (currentPage: number, sort: SortType, order: OrderType): Promise<Winner[]> => load<Winner[]>({
    url: 'winners',
    method: 'GET',
    queryParams: {
      _page: currentPage.toString(),
      _limit: winnersLimitPerPage.toString(),
      _sort: sort,
      _order: order,
    },
  })
    .then((data) => data)
    .catch((error: Error): Winner[] => { console.log(error); return []; }),

  getWinnersTotalCount: async (): Promise<string> => getHeaders({
    url: 'winners',
    method: 'GET',
    queryParams: { _limit: '1' },
  })
    .then((headers: Headers) => headers.get('X-Total-Count') as string),

  getWinner: async (id: number): Promise<Winner> => load<Winner>({
    url: `winners/${id}`,
    method: 'GET',
  })
    .then((data) => data)
    .catch((error: Error) => { throw new Error(error.message); }),

  updateWinner: async (dataParams: UpdateWinnerParams, id: string): Promise<Car> => load<Car>({
    url: `winners/${id}`,
    method: 'PUT',
    dataParams,
  })
    .then((data) => data),

  deleteWinner: async (id: string): Promise<{}> => load<{}>({
    url: `winners/${id}`,
    method: 'DELETE',
  })
    .then((data) => data),

  createWinner: async (dataParams: UpdateWinnerParams): Promise<Winner> => load<Winner>({
    url: 'winners',
    method: 'POST',
    dataParams,
  })
    .then((data) => data),
  getTotalWinnersNum: async (): Promise<string> => getHeaders({
    url: 'winners',
    method: 'GET',
    queryParams: { _limit: '1' },
  })
    .then((headers: Headers) => headers.get('X-Total-Count') as string),

};

export default AppLoader;
