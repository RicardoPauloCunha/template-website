import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { hasValueString } from '../../util/stringFormat';

import { FormGroup, Input, Label, InputProps, FormFeedback } from 'reactstrap';

interface InputCheckboxProps extends InputProps {
    name: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}

const InputCheckbox = ({ name, label, options, ...rest }: InputCheckboxProps) => {
    const inputRefs = useRef([]);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRefs.current,
            getValue: (refs) => {
                return refs
                    .filter((ref: any) => ref != null && ref.checked)
                    .map((ref: any) => ref.value);
            },
            setValue: (refs, values: string[]) => {
                refs
                    .filter((ref: any) => values.includes(ref.id))
                    .forEach((ref: any) => {
                        ref.checked = true;
                    });
            },
            clearValue: (refs) => {
                refs.forEach((ref: any) => {
                    ref.checked = false;
                });
            },
        });
    }, [fieldName, registerField]);

    return (
        <FormGroup tag="fieldset">
            <Label>
                {label}
            </Label>

            {options.map((opt, index) => (
                <FormGroup
                    key={opt.label}
                    check
                >
                    <Input
                        id={opt.value}
                        name={fieldName}
                        innerRef={ref => (inputRefs.current[index] = ref as never)}
                        defaultChecked={defaultValue?.some((def: string) => def === opt.value)}
                        value={opt.value}
                        type="checkbox"
                        invalid={hasValueString(error)}
                        onFocus={clearError}
                        {...rest}
                    />

                    {' '}

                    <Label
                        check
                        htmlFor={opt.value}
                    >
                        {opt.label}
                    </Label>
                </FormGroup>
            ))}

            {error && <FormFeedback>
                {error}
            </FormFeedback>}
        </FormGroup>
    );
}

export default InputCheckbox;