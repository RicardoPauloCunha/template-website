import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { convertCurrency, currencyToNumber } from '../../util/convertCurrency';
import { hasValueString } from '../../util/stringFormat';

import { FormGroup, Input, Label, InputProps, FormFeedback } from 'reactstrap';

interface InputCurrencyProps extends InputProps {
    name: string;
    label: string;
}

const InputCurrency = ({ name, label, ...rest }: InputCurrencyProps) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

    useEffect(() => {
        registerField<number>({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref) => {
                return currencyToNumber(ref.value);
            },
            setValue: (ref, value: number) => {
                ref.value = convertCurrency(value.toString());
            },
            clearValue: (ref) => {
                ref.value = "R$ 0,00";
            },
        });
    }, [fieldName, registerField]);

    return (
        <FormGroup>
            <Label htmlFor={fieldName}>
                {label}
            </Label>

            <Input
                id={fieldName}
                innerRef={inputRef}
                defaultValue={convertCurrency(`${defaultValue}`)}
                invalid={hasValueString(error)}
                onFocus={clearError}
                {...rest}
            />

            {error && <FormFeedback>
                {error}
            </FormFeedback>}
        </FormGroup>
    );
}

export default InputCurrency;