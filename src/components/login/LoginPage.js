import React, { Component } from 'react';
import '../../css/loginPage.css'
class LoginPage extends Component {
    render() {
        return (
            <div className='login'>
                <div class='head'>
                    <h1 class='company'>Đại học Tôn Đức Thắng</h1>
                </div>
                <form action="/login" className="form">
                    <div className='form-group'>
                        <input type="text" className='text' placeholder='Tài khoản' />
                    </div>
                    <div className='form-group'>
                        <input type="password" className='password' placeholder='••••••••••••••' />
                    </div>
                    <button type="submit" className='btn btn-login'>Đăng nhập</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;
