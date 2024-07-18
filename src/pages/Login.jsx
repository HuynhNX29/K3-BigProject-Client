import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


const Login = () => {

    const img = 'https://overcomingfinancialmisfortunes.wordpress.com/wp-content/uploads/2015/02/personal-financial-management.jpg'
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

    //prevent for login user

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }

    }, [navigate]);

    return (
        <div>
            <div className="login-page">
                {isLoading && <Spinner />}
                <div className='row container'>
                    <h1>Expense Management App</h1>
                    <div className="col-md-6">
                        <img src={img} alt="login-img" width={"100%"} height="100%" />
                    </div>

                    <div className="col-md-4 login-form">
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

            </div>
        </div>
    );
}

export default Login;
