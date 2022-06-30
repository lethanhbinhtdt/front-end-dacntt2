import React, {useState, useEffect, useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown , faPaperPlane, faSend} from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import { Button, Dropdown } from 'react-bootstrap';
import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'
import axios from '../../middlewares/axios';
import '../../css/NavBar.css';
import {SocketContext} from '../../middlewares/socket';

function NavBar(props) {
    const navigate = useNavigate();
    // const [removeCookie] = useCookies(['access_token'])
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
    const {currentUserIdState} = props
    const imageClick = () => {
        navigate('/personal/post', { replace: true });
    }
    const [info, setInfo] = useState()
    const [nameUserFind, setNameUserFind] = useState()
    const [socketdata, setSocketData] = useState()


    const socket = useContext(SocketContext);

    useEffect(()=>{
        const token = getCookieToken()
        // axios.get(`${BASE_URL}api/account`,
        // {
        //     headers: {
        //         'Content-type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        //     // body: JSON.stringify(yourNewData)
        // } )
        fetch(`${BASE_URL}api/account`, 
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                // body: JSON.stringify(yourNewData)
            }
        )
        .then((res)=>{
          if(res.ok){
              return res.json()
          }
        })
        .then(data=>{
            socket.emit("newUser", data?.id);
            currentUserIdState(data?.id)
            setInfo(data)
           
        })
        .catch(err=>{
            console.error(err)
        })
    }, [])

    const findFriend = ()=>{
        const id = info?.id
        navigate(`/search/?name=${nameUserFind}`, {state:{"currentUserId": id}}, { replace: true });
    }
    const logout = () =>{
        removeCookie("access_token")
        socket.disconnect()
    }
    return (
        <>
            <div className='bg-top-color'></div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='d-flex justify-content-between w-100 mx-5'>
                    <NavLink to='/' className='navbar-brand'>TDTU</NavLink>

                    <form className='d-flex rounded-pill px-3 search-bar'>
                  {/* <FontAwesomeIcon icon={faSearch} className='mx-3 my-auto'/> */}
                        <input type='text' className='search-input py-2' placeholder='Tìm kiếm...' onChange={(e)=>{setNameUserFind(e.target.value)}}></input>
                        <button type="button" className="btn"><FontAwesomeIcon icon={faSearch} onClick={findFriend} className='my-auto' /></button>
                    </form>

                    <div>
                        {/* <img src='http://via.placeholder.com/32x32' className='rounded-circle nav-avatar' alt='avatar' onClick={() => imageClick()}></img> */}
                        <img src={info?.picture} className='rounded-circle nav-avatar' alt='avatar'></img>
                        <Link to={ `/personal/${info?.id}/post/`} state={{"id": info?.id}}> {info?.fullname}</Link>
                        <Dropdown>
                            <Dropdown.Toggle className='rounded-pill py-0 bg-white border-0 text-dark'>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item> <Link  id='edit-info' to={`/account/${info?.id}/setting`}>Chỉnh sửa thông tin cá nhân</Link></Dropdown.Item>
                                <Dropdown.Item> <Link  onClick={logout} id='logout' to='/login'>Đăng xuất</Link> </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
           
                    </div> 
                </div>


            </nav>
        </>
    );
}

export default NavBar;
