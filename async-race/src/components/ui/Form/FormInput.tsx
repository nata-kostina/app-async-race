import React, { useState } from 'react';
import { FormInputProps } from '../../../types/types';

function FormInput({
  id, label, type, val, placeholder = '',
}: FormInputProps) {
  const [value, setValue] = useState(val);
  const onValueChanged = (v: string) => setValue(v);
  return (
    <div className="formInput">
      <label htmlFor={id}>
        {label}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onValueChanged(event.target.value)}
        />
      </label>
    </div>
  );
}
export default FormInput;
