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
        <div className='login'>
            <div className='head'>
                <h1>Đại học Tôn Đức Thắng</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input type="text" name="username" {...username} autoComplete="off" required placeholder="Tài khoản" />
                </div>
                <div className='form-group'>
                    <input type="password" name="password" {...password} required placeholder="••••••••••••••" />
                </div>
                <button type="submit" className='btn btn-login'>Đăng nhập</button>

                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </form>
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
