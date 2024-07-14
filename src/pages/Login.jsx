import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';


const Login = () => {


    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const handleLogin = async (values) => {
        // console.log(values);
        const { name, password } = values
        const api = `/login`
        try {
            setIsLoading(true);
            const res = await axios({
                method: 'post',
                url: `http://localhost:8080/api/v1/users${api}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: values
            })
            setIsLoading(false);
            message.success('Login successfully!')
            // localStorage.setItem('user', JSON.stringify({ ...res, password: '' }))
            if (res && res.status === 200 && res.data) {
                const data = res.data.data;

                localStorage.setItem('user', JSON.stringify(data));
                // console.log(data);

            }
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
                <Form form={form}
                    layout='vertical'
                    onFinish={handleLogin}>
                    <h1>Login</h1>

                    <Form.Item label='Name'
                        name={'name'}
                    >
                        <Input placeholder='Fill your name'
                            size='large' />
                    </Form.Item>

                    <Form.Item label='Password'
                        name='password'
                        rules={[{
                            required: true,
                            message: 'Password is required'
                        }]}
                    >
                        <Input.Password placeholder='Fill your password'
                            size='large' />
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
