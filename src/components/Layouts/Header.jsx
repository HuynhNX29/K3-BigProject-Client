import { Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {

    const [loginUser, setLoginUser] = useState('');
    const navigate = useNavigate()

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setLoginUser(user);
        }
    }, []);


    const logoutHandler = () => {
        localStorage.removeItem('user');
        message.success('Logout successfully!')
        navigate('/login')
    }

    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >
                        <Link className="navbar-brand" to="/" >
                            Expense Management
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {" "}
                                <h6 className='nav-link'>
                                    <UserOutlined /> Hi, {" "} {loginUser && loginUser.name}!
                                </h6>
                                {" "}
                            </li>
                            <li className='nav-item'>
                                {/* <Button className='btn btn-primary'
                                    onClick={logoutHandler}
                                >
                                    Log out
                                </Button> */}

                                <h6 className='nav-link logout-item' onClick={logoutHandler}>
                                    <LogoutOutlined /> Logout

                                </h6>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
