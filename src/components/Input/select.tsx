import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { hasValueString } from '../../util/stringFormat';

import { FormGroup, Input, Label, InputProps, FormFeedback } from 'reactstrap';

interface InputSelectProps extends InputProps {
    name: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}

const InputSelect = ({ name, label, options, ...rest }: InputSelectProps) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref) => {
                return ref.value;
            },
            setValue: (ref, value) => {
                ref.value = value;
            },
            clearValue: (ref) => {
                ref.value = "";
            }
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
                defaultValue={defaultValue}
                type="select"
                invalid={hasValueString(error)}
                onFocus={clearError}
                {...rest}
            >
                <option
                    value=""
                    disabled
                >
                    {rest.placeholder}
                </option>

                {options.map(opt => (
                    <option
                        key={opt.label}
                        value={opt.value}
                    >
                        {opt.label}
                    </option>
                ))}
            </Input>

            {error && <FormFeedback>
                {error}
            </FormFeedback>}
        </FormGroup>
    );
}

export default InputSelect;