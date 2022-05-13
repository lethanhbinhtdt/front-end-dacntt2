import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import axios from '../../middlewares/axios';
import { LOGIN_URL } from '../../middlewares/constant';

function LoginPage(props) {
    const { setAuth } = useContext(AuthContext)

    const username = useFormInput('');
    const password = useFormInput('');
    const errMsg = useFormInput('');
    const success = useFormInput(false);

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
            console.log(username, success, errMsg)
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                errMsg.value = 'No Server Response';
            } else if (err.response?.status === 400) {
                errMsg.value = 'Miss Username or Password';
            } else if (err.response?.status === 401) {
                errMsg.value = 'Unauthorize';
            } else {
                errMsg.value = 'Login Failed';
            }
        }
    }

    return (
        <>
            {success.value ? alert("Đăng nhập thành công") : (
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

                        <p className={errMsg.value ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg.value}</p>
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
