import React, { useState } from 'react';
import Form from '../../../components/Form/Form';
import FormInput from '../../../components/Form/FormInput';
import { Car, UpdateCarParams } from '../../../types/types';

interface FormEditProps {
  onCarUpdated: (values: UpdateCarParams, car: Car) => void;
  carToEdit: Car;
}

function FormEdit({ onCarUpdated, carToEdit }: FormEditProps) {
  const [form, setForm] = useState({
    name: carToEdit.name,
    color: carToEdit.color,
  });

  const onNameChanged = (n: string): void => setForm({ ...form, name: n });
  const onColorChanged = (c: string): void => setForm({ ...form, color: c });

  return (
    <Form id="form_edit">
      <FormInput id="name" label="Name" type="text" val={form.name} placeholder="Enter a new name..." onChanged={onNameChanged} />
      <FormInput id="color" label="Color" type="color" val={form.color} onChanged={onColorChanged} />
      <button type="button" onClick={() => onCarUpdated(form, carToEdit)}>Edit</button>
    </Form>
  );
}
export default FormEdit;
