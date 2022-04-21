import { ValidationError } from 'yup';

type Errors = {
    [key: string]: string;
}

const getValidationErrors = (errors: ValidationError): Errors => {
    const validationErrors: Errors = {};

    errors.inner.forEach(err => {
        if (err.path)
            validationErrors[err.path] = err.message;
    });

    return validationErrors;
}

export default getValidationErrors;