/* eslint-disable max-len */
import React, { ChangeEvent } from 'react';
import { FormInputProps } from '../../../types/types';
import Flex from '../../Flex';
import { StyledInput, StyledLabel } from './styles';

function FormInput({
  id, label, type, val, placeholder = '', onChanged,
}: FormInputProps) {
  return (
    <Flex direction="row" align="start" justify="start">
      <StyledLabel htmlFor={id}>
        <Flex direction="row" align="center" justify="space-between">
          {label}
          <StyledInput
            id={id}
            type={type}
            placeholder={placeholder}
            value={val}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChanged((event.target as HTMLInputElement).value as string)}
          />
        </Flex>
      </StyledLabel>
    </Flex>
  );
}
export default FormInput;
