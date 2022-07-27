import React, { useState, useEffect } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import Form from './Form';
// import AppLoader from '../../services/AppLoader';
import { Car } from '../../types/types';
import CarTable from './CarTable';
import AppLoader from '../../services/AppLoader';

function Garage() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);

  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    let isActual = true;
    const fetchData = async () => {
      const data: Car[] = await AppLoader.getCars(currentPage);
      console.log('Data', data);
      if (isActual) {
        setCars(data);
      } else console.log('This fetch is not actual');
    };
    fetchData();
    return () => {
      isActual = false;
    };
  }, [currentPage]);

  return (
    <div className="Garage">
      Garage
      <Form />
      <CarTable cars={cars} />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
