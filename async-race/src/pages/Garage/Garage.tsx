import React, { useState, useEffect } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import Form from './Form';
import AppLoader from '../../services/AppLoader';

function Garage() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);

  // const [list, setList] = useState([]);

  useEffect(() => {
    AppLoader.getCars(currentPage);
  }, [currentPage]);

  return (
    <div className="Garage">
      Garage
      <Form />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
