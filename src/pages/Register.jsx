import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';

const Register = () => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const submitHandler = async (values) => {
        console.log(values);

        try {
            setIsLoading(true)
            await axios.post('/users/register', values)
            message.success('Registration successfully!')
            setIsLoading(false)

            navigate('/login')
        } catch (error) {
            setIsLoading(false)
            message.error('Something went wrong!')
        }
    }


    return (
        <div>
            <div className="register-page">

                {isLoading && <Spinner />}

                <Form form={form} layout='vertical' onFinish={submitHandler}>
                    <h1>Register</h1>

                    <Form.Item label='Name' name='name'>
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input type='email' size='large' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' size='large' />
                    </Form.Item>

                    <div className="d-flex justify-content-between ">
                        <Link to='/login'>Click here to login</Link>
                        <Button className='btn btn-primary' onClick={() => form.submit()}>Register</Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}

export default Register;
