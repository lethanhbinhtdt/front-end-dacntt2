import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import axios from '../../middlewares/axios';
import { LOGIN_URL } from '../../middlewares/constant';

function LoginPage(props) {
    const { setAuth } = useContext(AuthContext)

    const username = useFormInput('');
    const password = useFormInput('');
    const [errMsg, setErrMsg] = useState(null);
    const [success, setSuccess] = useState(false);

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
            const accessToken = response?.data?.token;
            setAuth({ username, password, accessToken });
            setSuccess(true);
            console.log(username, success, errMsg);
        } catch (err) {
            console.log(err);
            if (err.response.status === 400 || err.response.status === 401)
                setErrMsg(err.response.data.description);
            else 
                setErrMsg("Something went wrong. Please try again later.");
        }
    }

    return (
        <>
            {success ? alert("Đăng nhập thành công") : (
                <div className='login'>
                    <div className='head'>
                        <h1 className='company'>Đại học Tôn Đức Thắng</h1>
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
            )}
        </>
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
