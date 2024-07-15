import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import Layout from '../components/Layouts/Layout';
import Login from './Login';

const HomePage = () => {

    const [showModal, setShowModal] = useState(false)
    const [form] = Form.useForm();


    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
        <Layout>
            <div className="filters">
                <div> range filters</div>
                <div>
                    <Button className='btn btn-primary'
                        onClick={() => setShowModal(true)}> Add New </Button>
                </div>
            </div>
            <div className="content"></div>


            <Modal title='Add transaction'
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout='vertical'
                    form={form}
                    onFinish={handleSubmit}
                >

                    <Form.Item label='Amount'
                        name={'amount'}
                    >
                        <Input type='text' />
                    </Form.Item>

                    <Form.Item label='Type'
                        name={'type'}
                    >
                        <Select>
                            <Select.Option value='income'>Income</Select.Option>
                            <Select.Option value='expense'>Expense</Select.Option>

                        </Select>
                    </Form.Item>

                    <Form.Item label='Category'
                        name={'category'}
                    >
                        <Select>
                            <Select.Option value='salary'>Salary</Select.Option>
                            <Select.Option value='tip'>Tip</Select.Option>
                            <Select.Option value='project'>Project</Select.Option>
                            <Select.Option value='food'>Food</Select.Option>
                            <Select.Option value='movie'>Movie</Select.Option>
                            <Select.Option value='bills'>Bills</Select.Option>
                            <Select.Option value='medical'>Medical</Select.Option>
                            <Select.Option value='fee'>Fee</Select.Option>
                            <Select.Option value='tax'>Tax</Select.Option>
                        </Select>
                    </Form.Item>


                    <Form.Item label='Date' name={'date'}>
                        <Input type='date' />
                    </Form.Item>

                    <Form.Item label='Reference' name={'reference'}>
                        <Input type='text' />
                    </Form.Item>

                    <Form.Item label='Description' name={'description'}>
                        <Input type='text' />
                    </Form.Item>

                    <div className="d-flex justify-content-end">
                        <Button onClick={() => form.submit()}
                            className='btn btn-primary'>{" "}Save</Button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    );
}

export default HomePage;
