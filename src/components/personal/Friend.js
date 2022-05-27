
import React from "react"
import '../../css/Friend.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import { Dropdown, IconButton } from 'rsuite';
import Popup from 'reactjs-popup';
function Friend() {
    // const renderIconButton = (props, ref) => {
    //     return (
    //         <IconButton {...props} ref={ref} icon={<FontAwesomeIcon icon={faEllipsisH} />} circle color="blue" appearance="primary" />
    //     );
    // };
    return (
        
        <div className="card">



        <div className="container">

            <div className="row">
            <h4 className="tag-name">Bạn bè</h4>
                <div className="d-flex justify-content-center">

                    <div className="col-5 mt-3 card-info">

                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-4 md-4">
                                    <img src="http://via.placeholder.com/200x200" className="card-img" alt="..."></img>
                                </div>
                                <div className="col-6 md-6  d-flex align-items-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Nguyễn Xuân Thịnh</h5>
                                        <p className="card-text">This is a wider card with .</p>

                                    </div>
                                </div>
                                <div className='col-2 md-2'>
                                    {/* 
                                        <Dropdown renderToggle={renderIconButton}>
                                            <Dropdown.Item >Hủy kết bạn</Dropdown.Item>

                                        </Dropdown> */}

                                    <div>
                                        <Popup
                                            trigger={<div className="three-dot-icon position-absolute top-50 end-0 translate-middle-y"><FontAwesomeIcon icon={faEllipsisH} /> </div>}
                                            position="right top"
                                            on="hover"
                                            closeOnDocumentClick
                                            mouseLeaveDelay={300}
                                            mouseEnterDelay={0}
                                            contentStyle={{ padding: '0px', border: 'none' }}
                                            arrow={false}
                                        >
                                            <div className="menu">
                                                <div className="menu-item">Hủy kết bạn</div>
                                                <div className="menu-item">Xem trang cá nhân</div>
                                            </div>
                                        </Popup>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-5 mt-3 card-info">

                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-4 md-4">
                                    <img src="http://via.placeholder.com/200x200" className="card-img" alt="..."></img>
                                </div>
                                <div className="col-6 md-6  d-flex align-items-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Nguyễn Xuân Thịnh</h5>
                                        <p className="card-text">This is a wider card with .</p>

                                    </div>
                                </div>
                                <div className='col-2 md-2 d-flex align-items-center'>
                                    <div >
                                        sdfgsfd
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="row">
                <div className="d-flex justify-content-center">

                    <div className="col-5 mt-3 card-info">

                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-4 md-4">
                                    <img src="http://via.placeholder.com/200x200" className="card-img" alt="..."></img>
                                </div>
                                <div className="col-6 md-6  d-flex align-items-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Nguyễn Xuân Thịnh</h5>
                                        <p className="card-text">This is a wider card with .</p>

                                    </div>
                                </div>
                                <div className='col-2 md-2 d-flex align-items-center'>
                                    <div >
                                        sdfgsfd
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-5 mt-3 card-info">

                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-4 md-4">
                                    <img src="http://via.placeholder.com/200x200" className="card-img" alt="..."></img>
                                </div>
                                <div className="col-6 md-6  d-flex align-items-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Nguyễn Xuân Thịnh</h5>
                                        <p className="card-text">This is a wider card with .</p>

                                    </div>
                                </div>
                                <div className='col-2 md-2 d-flex align-items-center'>
                                    <div >
                                        sdfgsfd
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        </div>
    )
}

export default Friend;