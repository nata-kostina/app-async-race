import React, { useState, useEffect } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import Form from './Form';
import AppLoader from '../../services/AppLoader';
import { Car } from '../../types/types';

function Garage() {
  const [currentPage, setCurrentPage] = useState(1);
  debugger;
  const onPageChanged = (value: number) => setCurrentPage(value);

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    debugger;
    const fetchData = async () => {
      const data = await AppLoader.getCars(currentPage);
      setCars(data);
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className="Garage">
      Garage
      <Form />
      {cars.map((car) => (
        <div>
          {car.id}
          {' '}
          {car.name}
          {' '}
          {car.color}
        </div>
      ))}
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
