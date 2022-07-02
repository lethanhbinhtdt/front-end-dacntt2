import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Popup from 'reactjs-popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { faBell, faEnvelope, faHouse, faGear } from '@fortawesome/free-solid-svg-icons'
import { BASE_URL } from '../../middlewares/constant';
import NotificationList from '../notification/NotificationList';
import { getCookieToken } from '../../middlewares/common'

import '../../css/SideBar.css'
import io from "socket.io-client";
const socket = io.connect(BASE_URL);

function SideBar(props) {
    const {numberNotification} = props
    const navigate = useNavigate();
    const [socketdata, setSocketData] = useState()
    const [numberNotiNotChecked, setNumberNotiNotChecked] = useState(0)

    const [notificationInfos, setNotificationInfo] = useState()
    const [lenNotification, setlenNotification] = useState(0)
    function navigateChat() {
        navigate('/chat', { replace: true });
    }
    console.log("numberNotificationnumberNotification", numberNotification)
    useEffect(() => {
        
        // console.log("da vao nef ")
        // socket.on("receive_message", (data) => {
        //           console.log("hhahahahaahahah", data)
        //           setNumberNotiNotChecked(1)
        //         });
        setNumberNotiNotChecked(numberNotiNotChecked+1)

      }, [numberNotification]);

    const token = getCookieToken()
    useEffect(()=>{ // chỗ này để mới vào nó fetch để lấy ra dữ liệu cho số lượng noti
        {
            fetch(`${BASE_URL}api/notification/?skip=${lenNotification}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                }).then(notification => {
                    setNotificationInfo(notification)
                    setlenNotification(notification.length)
                    var numberNotCheck = 0 
                    for(var i = 0; i<=notification?.length; i++){
                        if(!notification[i]?.isChecked){
                            numberNotCheck = numberNotCheck +1
                        }
                    }
                    setNumberNotiNotChecked(numberNotCheck)
    
                })
                .catch(err => {
                    console.error(err)
                })
        }
    },[])

    const showNoti= () => {
        // bấm vào hình chuông luôn fetch lại để lấy cái mới nhất 
        fetch(`${BASE_URL}api/notification/?skip=0`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(notification => {
                setNotificationInfo(notification)
                setlenNotification(lenNotification + notification.length)// length này dùng để fetch lấy thêm dữ liệu 
                var numberNotCheck = 0 
                for(var i = 0; i<=notification?.length; i++){
                    if(!notification[i]?.isChecked){
                        numberNotCheck = numberNotCheck +1
                    }
                }
                // setNumberNotiNotChecked(numberNotCheck)

            })
            .catch(err => {
                console.error(err)
            })
    }


    // var numberNotCheck = 0 

    // useEffect(()=>{
       
    // },[numberNotiNotChecked])
    console.log("numberNotiNotChecked",numberNotiNotChecked)
    return (
        <div className='sidebar cursor-pointer'>
            {/* trang chủ */}
            <div className='menu-item'>
                <span><FontAwesomeIcon icon={faHouse} /></span><h5>Trang chủ</h5>
            </div>

            {/* thông báo */}
            <Popup
                trigger={
                    <div className='menu-item active' id='notifications'  >
                        <span onClick = {showNoti}><FontAwesomeIcon icon={faBell} /> <small className='notification-count'>{numberNotiNotChecked}</small> </span><h5>Thông báo</h5>
                    </div>
                }
                position='right center'
            >
                <div className='menu-popup notifications-popup'>
                <NotificationList  noifiInfos = {notificationInfos} numberNotiGetInDb = {setNumberNotiNotChecked}/>
                </div>
            </Popup>

            {/* tin nhắn */}
            <div className='menu-item' id='message-notifications' onClick={navigateChat}>
                <span><FontAwesomeIcon icon={faEnvelope} /> <small className='notification-count'>3</small> </span><h5>Tin nhắn</h5>
            </div>
            
            {/* cài đặt */}
            <Popup
                trigger={
                    <div className='menu-item'>
                        <span><FontAwesomeIcon icon={faGear} /></span><h5>Cài đặt</h5>
                    </div>
                }
                position='right center'
            >
                <div className='menu-popup d-flex flex-column'>
                    <button type='button' class='btn btn-success mb-2'><Link className='btn-link-text' to={`/account/id/setting`}>Chỉnh sửa thông tin cá nhân</Link></button>
                    <button type='button' class='btn btn-danger'><Link className='btn-link-text' to='/logout'>Đăng xuất</Link></button>
                </div>
            </Popup>
            {/*  */}
        </div>
    );
}

export default SideBar;