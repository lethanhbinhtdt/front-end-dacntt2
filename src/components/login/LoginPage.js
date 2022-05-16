import React, { useState } from 'react';
import axios from '../../middlewares/axios';
import { useNavigate, useLocation } from 'react-router-dom'

import { LOGIN_URL } from '../../middlewares/constant';
import { setUserSession } from '../../middlewares/common'

function LoginPage(props) {

    const username = useFormInput('');
    const password = useFormInput('');
    const [errMsg, setErrMsg] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        // send request
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: username.value, password: password.value }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setUserSession(response?.data?.token, response?.data?.userInfo)
            navigate(redirectPath, { replace: true });

        } catch (err) {
            console.log(err);
            if (err.response.status === 400 || err.response.status === 401)
                setErrMsg(err.response.data.description);
            else
                setErrMsg("Something went wrong. Please try again later.");
        }
    }

    return (
        // <div className='login'>
        //     <div className='head'>
        //         <h1>Đại học Tôn Đức Thắng</h1>
        //     </div>
        //     <form className="form" onSubmit={handleSubmit}>
        //         <div className='form-group'>
        //             <input type="text" name="username" {...username} autoComplete="off" required placeholder="Tài khoản" />
        //         </div>
        //         <div className='form-group'>
        //             <input type="password" name="password" {...password} required placeholder="••••••••••••••" />
        //         </div>
        //         <button type="submit" className='btn btn-login'>Đăng nhập</button>

        //         <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        //     </form>
        // </div>
        <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-5">
                <div className="border p-3 rounded bg-light mt-5">
                    <div className="login-form">
                        <form className="form" onSubmit={handleSubmit}>
                            <h2 className="text-center mb-3">Đăng nhập</h2>
                            <div className="form-group">
                                <input type="text" className="form-control my-2" name="username" {...username} autoComplete="off" placeholder="Tài khoản"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control my-2" name="password" {...password} placeholder="Mật khẩu"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
                            </div>
                            <div className="form-group">
                                <div>Hoặc đăng nhập bằng</div>
                                {/*------------------------- GG-signin HERE */}
                                {/* <div className="g-signin2 mt-4" data-onsuccess="onSignIn"></div> */}
                            </div>
                            <div className="form-group text-center"> 
                                <div className={errMsg ? "p-3 mb-2 bg-danger text-white rounded" : "offscreen"} aria-live="assertive">{errMsg}</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );



}

// example: username.value = 'hello react'; console.log(username.value); 
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default LoginPage;
