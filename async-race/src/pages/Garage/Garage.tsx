import React, { useState, useEffect } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import { Car, UpdateCarParams } from '../../types/types';
import CarTable from './CarTable';
import AppLoader from '../../services/AppLoader';
import FormCreate from './FormCreate';
import { generateRandomCars } from '../../utils/utils';

const useCars = (currentPage: number, hasBeenUpdated: boolean) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [totalCarsNum, setTotalCarsNum] = useState('0');
  useEffect(() => {
    let isActual = true;
    const fetchData = async () => {
      const data: Car[] = await AppLoader.getCars(currentPage);
      if (isActual) {
        const num = await AppLoader.getTotalCount();
        setTotalCarsNum(num);
        setCars(data);
      } else console.log('This fetch is not actual');
    };
    fetchData();
    return () => {
      isActual = false;
    };
  }, [currentPage, hasBeenUpdated]);
  return [cars, setCars, totalCarsNum];
};

function Garage() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);

  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  // eslint-disable-next-line max-len
  const [cars, setCars, totalCarsNum] = useCars(currentPage, hasBeenUpdated) as [Car[], React.Dispatch<React.SetStateAction<Car[]>>, string];
  const updateCar = async (values: UpdateCarParams, car: Car) => {
    try {
      await AppLoader.updateCar(values, car.id.toString());
      setHasBeenUpdated(!hasBeenUpdated);
    } catch (e) {
      console.log('Ooops! Updating was failed');
    }
  };

  const deleteCar = async (id: string) => {
    try {
      await AppLoader.deleteCar(id);
      debugger;
      setHasBeenUpdated(!hasBeenUpdated);
    } catch (e) {
      console.log('Ooops! Deleting was failed');
    }
  };

  const createCar = async (values: UpdateCarParams) => {
    try {
      const data: Car = await AppLoader.createCar(values);
      setCars([...cars, data]);
    } catch (e) {
      console.log('Ooops! Creating was failed');
    }
  };

  const generateCars = () => generateRandomCars().forEach((car) => createCar(car));

  return (
    <div className="Garage">
      Garage
      <span>{totalCarsNum}</span>
      <FormCreate createCar={createCar} />
      <button type="button" onClick={generateCars}>Generate Random Cars</button>
      <CarTable cars={cars} updateCar={updateCar} deleteCar={deleteCar} />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
