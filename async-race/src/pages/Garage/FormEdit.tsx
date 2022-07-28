import React, { useState } from 'react';
import Form from '../../components/ui/Form/Form';
import FormInput from '../../components/ui/Form/FormInput';
import { Car, UpdateCarParams } from '../../types/types';

interface FormEditProps {
  onCarUpdated: (values: UpdateCarParams) => void;
  carToEdit: Car;
}

function FormEdit({ onCarUpdated, carToEdit }: FormEditProps) {
  const [form, setForm] = useState({
    name: carToEdit.name,
    color: carToEdit.color,
  });

  const onNameChanged = (n: string) => setForm({ ...form, name: n });
  const onColorChanged = (c: string) => setForm({ ...form, color: c });

  return (
    <Form id="form_edit">
      <FormInput id="name" label="Name" type="text" val={form.name} placeholder="Enter a new name..." onChanged={onNameChanged} />
      <FormInput id="color" label="Color" type="color" val={form.color} onChanged={onColorChanged} />
      <button type="button" onClick={() => onCarUpdated(form)}>Edit</button>
    </Form>
  );
}
export default FormEdit;
