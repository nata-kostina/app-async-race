import React, { useState, useEffect } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
// import AppLoader from '../../services/AppLoader';
import { Car, UpdateCarParams } from '../../types/types';
import CarTable from './CarTable';
import AppLoader from '../../services/AppLoader';
import FormCreate from './FormCreate';

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

  const updateCar = async (values: UpdateCarParams, id: string) => {
    try {
      const data: Car = await AppLoader.updateCar(values, id);
      setCars(cars.map((car) => (car.id.toString() === id ? { ...car, ...data } : car)));
    } catch (e) {
      console.log('Ooops! Updating was failed');
    }
  };

  return (
    <div className="Garage">
      Garage
      <FormCreate />
      <CarTable cars={cars} updateCar={updateCar} />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
