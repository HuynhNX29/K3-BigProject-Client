import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Register = () => {

    const [form] = Form.useForm();
    const submitHandler = (values) => {
        console.log(values);
    }


    return (
        <div>
            <div className="register-page">
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
