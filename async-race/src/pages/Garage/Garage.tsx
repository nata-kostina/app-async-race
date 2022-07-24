import React, { useState } from 'react';
import Pagination from '../../components/ui/Pagination/Pagination';
import Form from './Form';

function Garage() {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChanged = (value: number) => setCurrentPage(value);
  return (
    <div className="Garage">
      Garage
      <Form />
      <Pagination total={15} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>
  );
}

export default Garage;
