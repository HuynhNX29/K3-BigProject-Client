import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Register = () => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const handleRegister = async (values) => {
        // console.log(values);
        const { name, email, password } = values
        const api = `/register`
        try {
            setIsLoading(true)
            // await axios.post('/users/register', values)
            const res = await axios({
                method: 'post',
                url: `http://localhost:8080/api/v1/users${api}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: values
            })


            // console.log(res);

            message.success('Registration successfully!')
            setIsLoading(false)

            navigate('/login')
        } catch (error) {
            setIsLoading(false)
            message.error('Something went wrong!')
        }
    }


    //prevent for login user

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }

    }, [navigate]);

    return (
        <div>
            <div className="register-page">

                {isLoading && <Spinner />}

                <Form
                    className='register-form'
                    form={form}
                    layout='vertical'
                    onFinish={handleRegister}>
                    <h1>Register</h1>

                    <Form.Item label='Name'
                        name={'name'}

                    >
                        <Input placeholder='Fill your name'
                            size='large' />
                    </Form.Item>

                    <Form.Item label='Email'
                        name={'email'}
                        rules={[{
                            required: true,
                            message: 'Email is required',

                        }]}
                    >
                        <Input placeholder='Fill your email'
                            type='email'
                            size='large' />
                    </Form.Item>

                    <Form.Item label='Password'
                        name={'password'}
                        rules={[{
                            required: true,
                            message: 'Password is required'
                        }]}
                    >
                        <Input.Password placeholder='Fill your password'
                            size='large' />
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
