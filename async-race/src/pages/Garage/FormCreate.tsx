import React, { useState } from 'react';
import Form from '../../components/ui/Form/Form';
import FormInput from '../../components/ui/Form/FormInput';

function FormCreate() {
  const [formCreate] = useState({
    name: '',
    color: '',
  });
  return (
    <Form id="form_create">
      <FormInput id="name" label="Name" type="text" val={formCreate.name} placeholder="Enter name..." />
      <FormInput id="color" label="Color" type="color" val={formCreate.color} placeholder="Enter color..." />
      <button type="button">Create</button>
    </Form>
  );
}
export default FormCreate;
