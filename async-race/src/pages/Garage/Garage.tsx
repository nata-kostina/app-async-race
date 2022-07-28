import React, { useState, useEffect } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
// import AppLoader from '../../services/AppLoader';
import { Car, UpdateCarParams } from '../../types/types';
import CarTable from './CarTable';
import AppLoader from '../../services/AppLoader';
import FormCreate from './FormCreate';
import { generateRandomCars } from '../../utils/utils';

function Garage() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);

  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    let isActual = true;
    const fetchData = async () => {
      const data: Car[] = await AppLoader.getCars(currentPage);
      if (isActual) {
        setCars(data);
      } else console.log('This fetch is not actual');
    };
    fetchData();
    return () => {
      isActual = false;
    };
  }, [currentPage]);

  const updateCar = async (values: UpdateCarParams, car: Car) => {
    try {
      const data: Car = await AppLoader.updateCar(values, car.id.toString());
      setCars(cars.map((c) => (c.id === car.id ? { ...car, ...data } : car)));
    } catch (e) {
      console.log('Ooops! Updating was failed');
    }
  };

  const deleteCar = async (id: string) => {
    try {
      await AppLoader.deleteCar(id);
      setCars(cars.filter((car) => (car.id.toString() !== id)));
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
      <FormCreate createCar={createCar} />
      <button type="button" onClick={generateCars}>Generate Random Cars</button>
      <CarTable cars={cars} updateCar={updateCar} deleteCar={deleteCar} />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
