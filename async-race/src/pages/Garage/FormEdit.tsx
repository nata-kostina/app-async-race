import React, { useState } from 'react';
import Form from '../../components/ui/Form/Form';
import FormInput from '../../components/ui/Form/FormInput';

function FormEdit() {
  const [formCreate] = useState({
    name: '',
    color: '',
  });
  return (
    <Form id="form_edit">
      <FormInput id="name" label="Name" type="text" val={formCreate.name} placeholder="Enter a new name..." />
      <FormInput id="color" label="Color" type="color" val={formCreate.color} />
      <button type="button">Edit</button>
    </Form>
  );
}
export default FormEdit;
