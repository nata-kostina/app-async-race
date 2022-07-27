import React from 'react';

interface FormProps {
  id: string;
  children: React.ReactNode
}

function Form({ id, children }: FormProps) {
  return (
    <form id={id} className="form">
      {children}
    </form>
  );
}
export default Form;
