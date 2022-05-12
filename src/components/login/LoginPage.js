import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import axios from '../../middlewares/axios';
import { LOGIN_URL } from '../../middlewares/constant';

function LoginPage(props) {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    // const username = useFormInput('');
    // const password = useFormInput('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // send request
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.token;
            setAuth({ username, password, accessToken })
            setSuccess(true);
        } catch (err) {
            console.log(err)
            if(!err?.response){
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Miss Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorize')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
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
                            <input
                                type="text"
                                id="username"
                                name="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                placeholder="Tài khoản"
                            />
                        </div>
                        <div className='form-group'>
                            {/* <input type="password" {...password} className='password' placeholder='••••••••••••••' /> */}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                ref={userRef}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                placeholder="••••••••••••••"
                            />
                        </div>
                        <button type="submit" className='btn btn-login'>Đăng nhập</button>

                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </form>
                </div>
            )}
        </>
    );

}

// const useFormInput = initialValue => {
//     const [value, setValue] = useState(initialValue);

//     const handleChange = e => {
//         setValue(e.target.value);
//     }
//     return {
//         value,
//         onChange: handleChange
//     }
// }

export default LoginPage;
