import React, { useState } from 'react';
import Flex from '../../../components/Flex';
import Form from '../../../components/ui/Form/Form';
import FormInput from '../../../components/ui/Form/FormInput';
import { StyledBtn } from '../../../components/ui/Modal/styles';
import { UpdateCarParams } from '../../../types/types';
import StyledForm from './styles';

interface FormCreateProps {
  createCar: (values: UpdateCarParams) => Promise<void>;
}
function FormCreate({ createCar }: FormCreateProps) {
  const [form, setForm] = useState({
    name: '',
    color: '#000000',
  });
  const onNameChanged = (n: string) => setForm({ ...form, name: n });
  const onColorChanged = (c: string) => setForm({ ...form, color: c });

  return (
    <StyledForm>
      <Form id="form_create">
        <Flex direction="column" align="end" justify="space-between">
          <FormInput id="name" label="Name" type="text" val={form.name} placeholder="Enter a name..." onChanged={onNameChanged} />
          <FormInput id="color" label="Color" type="color" val={form.color} onChanged={onColorChanged} />
          <StyledBtn type="button" onClick={() => { createCar(form); }}>Create</StyledBtn>
        </Flex>
      </Form>
    </StyledForm>
  );
}
export default FormCreate;
