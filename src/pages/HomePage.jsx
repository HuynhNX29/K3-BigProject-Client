import { Button, Form, Input, Modal, Select, message, Table, DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';



// import Login from './Login';

const { RangePicker } = DatePicker


const HomePage = () => {

    const [showModal, setShowModal] = useState(false)
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [allTransactions, setAllTransactions] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState('all');
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);



    //table data
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
            key: 'date',
        },

        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <EditOutlined
                        onClick={() => {
                            setEditable(record)
                            setShowModal(true)
                        }} />
                    <DeleteOutlined className='mx-2' />
                </div>
            )
        }


    ]

    //get all translations

    const getAllTransactions = async () => {

        const api = `/get-transaction`

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            setLoading(true)

            // const res = await axios({
            //     method: 'POST',
            //     url: `http://localhost:8080/api/v1/transactions${api}`,
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     data: { userid: user._id, frequency, selectedDate, type }
            // })

            const res = await axios.post("http://localhost:8080/api/v1/transactions/get-transaction", {
                userid: user._id,
                frequency,
                selectedDate,
                type
            });

            setAllTransactions(res.data.data)
            setLoading(false)
            // console.log(res.data.data);
            // message.success('All transactions loaded!')
        } catch (error) {
            setLoading(false);

            message.error('Get all transaction failed!')
        }
    }


    //useEffect hook
    useEffect(() => {
        getAllTransactions();

    }, [frequency, selectedDate, type, setAllTransactions]);

    //add transaction
    const handleSubmit = async (values) => {
        // console.log(values);
        const apiAdd = `/add-transaction`
        const apiEdit = `/edit-transaction`


        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true)
            if (editable) {
                const resEdit = await axios({
                    method: 'POST',
                    url: `http://localhost:8080/api/v1/transactions${apiEdit}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        payload: {
                            ...values,
                            userId: user._id
                        },
                        transactionId: editable._id
                    }
                })

                setLoading(false)
                message.success('Update transaction successfully!')
            } else {
                const resAdd = await axios({
                    method: 'POST',
                    url: `http://localhost:8080/api/v1/transactions${apiAdd}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: { ...values, userid: user._id }
                })

                message.success('Add transaction successfully!')
            }
            setLoading(false)

            await getAllTransactions();
            setShowModal(false)
            setEditable(null)

        } catch (error) {
            setLoading(false)
            message.error('Failed to handle transaction!')

        }
    }

    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filters">
                <div>
                    <h6>Select Frequency</h6>

                    <Select style={{ width: 160 }}
                        value={frequency}
                        onChange={(values) => setFrequency(values)}>
                        <Select.Option value='7'>Last 1 week</Select.Option>
                        <Select.Option value='30'>Last 1 month</Select.Option>
                        <Select.Option value='365'>Last 1 year</Select.Option>
                        <Select.Option value='custom'>Custom</Select.Option>
                    </Select>

                    {frequency === 'custom' && (
                        <RangePicker value={selectedDate}
                            onChange={(values) =>
                                setSelectedDate(values)} />
                    )}
                </div>

                <div>
                    <h6>Select Type</h6>

                    <Select style={{ width: 160 }}
                        value={type}
                        onChange={(values) => setType(values)}>
                        <Select.Option value='all'>All</Select.Option>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>

                </div>

                <div className='switch-icon'>
                    <UnorderedListOutlined
                        className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'
                            } `}
                        onClick={() => setViewData('table')} />
                    <AreaChartOutlined
                        className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'
                            } `}
                        onClick={() => setViewData('analytics')} />
                </div>

                <div>

                    <Button className='btn btn-primary'
                        onClick={() => setShowModal(true)}> Add New </Button>
                </div>

            </div>
            <div className="content">
                {viewData === 'table' ? (
                    <Table columns={columns} dataSource={allTransactions} />)
                    : (< Analytics allTransactions={allTransactions} />)
                }

            </div>

            <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout='vertical'
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={editable}
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
