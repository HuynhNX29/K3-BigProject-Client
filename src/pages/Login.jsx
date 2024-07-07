import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';


const Login = () => {


    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const submitHandler = async (values) => {
        // console.log(values);
        try {
            setIsLoading(true);
            const { data } = await axios.post('/users/login', values)
            setIsLoading(false);
            message.success('Login successfully!')
            localStorage.setItem('user', JSON.stringify({ ...data, password: '' }))
            navigate('/')
        } catch (error) {
            setIsLoading(false);

            message.error('Something went wrong!')
        }
    }

    return (
        <div>
            <div className="register-page">
                {isLoading && <Spinner />}
                <Form form={form} layout='vertical' onFinish={submitHandler}>
                    <h1>Login</h1>

                    <Form.Item label='Email' name='email'>
                        <Input type='email' size='large' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' size='large' />
                    </Form.Item>

                    <div className="d-flex justify-content-between ">
                        <Link to='/register'>Click here to register</Link>
                        <Button className='btn btn-primary' onClick={() => form.submit()}>Login</Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}

export default Login;
