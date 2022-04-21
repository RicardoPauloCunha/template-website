import { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import ReactInputMask from 'react-input-mask';

import { hasValueString } from '../../util/stringFormat';

import { FormGroup, Input, Label, InputProps, FormFeedback } from 'reactstrap';

interface InputMaskProps extends InputProps {
    name: string;
    label: string;
    mask: string;
    maskChar: string;
}

const InputMask = ({ name, label, mask, maskChar, ...rest }: InputMaskProps) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name);
    const [value, setValue] = useState(defaultValue === undefined ? "" : defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref) => {
                return ref.value;
            },
            setValue: (ref, value) => {
                setValue(value);
            },
            clearValue: () => {
                setValue("");
            },
        });
    }, [fieldName, registerField]);

    return (
        <FormGroup>
            <Label htmlFor={fieldName} >
                {label}
            </Label>

            <Input
                id={fieldName}
                innerRef={inputRef}
                tag={ReactInputMask}
                value={value}
                mask={mask}
                maskChar={maskChar}
                onChange={e => setValue(e.target.value)}
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

export default InputMask;