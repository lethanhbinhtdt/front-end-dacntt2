import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <div className='text-center mt-3 text-primary'>
                        <img src='http://via.placeholder.com/128x128' alt='logo'></img>
                        <h1>SINH VIÊN ĐẠI HỌC TÔN ĐỨC THẮNG</h1>
                    </div>
                    <div className='text-center mt-5'>
                        <h1 className='text-warning'>Oops!</h1>
                        <h2 className='text-danger pb-3'>KHÔNG TÌM THẤY TRANG</h2>
                        <Link to='/' className='btn btn-primary rounded-pill'>Đến trang chủ</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
