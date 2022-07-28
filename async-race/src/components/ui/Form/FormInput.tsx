import React from 'react';
import { FormInputProps } from '../../../types/types';

function FormInput({
  id, label, type, val, placeholder = '', onChanged,
}: FormInputProps) {
  return (
    <div className="formInput">
      <label htmlFor={id}>
        {label}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={val}
          onChange={(event) => onChanged(event.target.value)}
        />
      </label>
    </div>
  );
}
export default FormInput;
