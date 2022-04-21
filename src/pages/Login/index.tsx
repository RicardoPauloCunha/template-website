import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/auth';
import { handlerSignIn } from '../../localStorages/auth';
import { WarningTuple } from '../../util/getHttpErrors';
import getValidationErrors from '../../util/getValidationErrors';

import { Button } from 'reactstrap';
import { Form } from '../../styles/components';
import InputField from '../../components/Input';
import Warning from '../../components/Warning';

type LocationData = {
    from: Location;
    message: string;
}

type LoginFormData = {
    email: string;
    password: string;
}

const Login = () => {
    let navigate = useNavigate();
    let location = useLocation()?.state as LocationData;
    const loginFormRef = useRef<FormHandles>(null);

    let from = location?.from?.pathname || "/";
    let message = location?.message || "";

    const { defineLoggedUser } = useAuth();

    const [warning] = useState<WarningTuple>(location?.message ? ["warning", message] : ["", ""]);

    const submitLoginForm: SubmitHandler<LoginFormData> = async (data, { reset }) => {
        try {
            loginFormRef.current?.setErrors({});

            const shema = Yup.object().shape({
                email: Yup.string()
                    .trim()
                    .email("Invalid email.")
                    .required("Email is required."),
                password: Yup.string()
                    .trim()
                    .required("Password is required.")
            });

            await shema.validate(data, {
                abortEarly: false
            });

            let dataToken = handlerSignIn(data.email);
            defineLoggedUser(dataToken);

            navigate(from, { replace: true });

            reset();
        }
        catch (err) {
            if (err instanceof Yup.ValidationError)
                loginFormRef.current?.setErrors(getValidationErrors(err));
        }
    }

    return (
        <>
            <h1>Login</h1>

            <Form
                ref={loginFormRef}
                onSubmit={submitLoginForm}
                initialData={{
                    email: "hello.world@template.com",
                    password: "1029384756"
                }}
            >
                <InputField
                    name='email'
                    label='Email'
                    placeholder='Put your email'
                    type="email"
                />

                <InputField
                    name='password'
                    label='Password'
                    placeholder='Put your password'
                    type="password"
                />

                <Button
                    type='submit'
                >
                    Submit
                </Button>

                <Warning
                    value={warning}
                />
            </Form>
        </>
    );
}

export default Login;