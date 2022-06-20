import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap';
import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'
import '../../css/NavBar.css';

function NavBar(props) {
    const navigate = useNavigate();
    const imageClick = () => {
        navigate('/personal/post', { replace: true });
    }
    const [info, setInfo] = useState()
    const token = getCookieToken()
    useEffect(()=>{
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

            console.log(data)
            setInfo(data)
        })
        .catch(err=>{
            console.error(err)
        })
    }, [])

    const data = {
        "id": info?.id
    }
    const id = info?.id
    const urlString = `/personal/${id}/post/`
    return (
        <>
            <div className='bg-top-color'></div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='d-flex justify-content-between w-100 mx-5'>
                    <NavLink to='/' className='navbar-brand'>TDTU</NavLink>

                    <form className='d-flex rounded-pill px-3 search-bar'>
                        <FontAwesomeIcon icon={faSearch} className='mx-3 my-auto'/>
                        <input type='text' className='search-input py-2' placeholder='Tìm kiếm...'></input>
                    </form>

                    <div>
                        {/* <img src='http://via.placeholder.com/32x32' className='rounded-circle nav-avatar' alt='avatar' onClick={() => imageClick()}></img> */}
                        <img src={info?.picture} className='rounded-circle nav-avatar' alt='avatar'></img>
                        <Link to={ `/personal/${id}/post/`} state={data} className='text-decoration-none text-dark fw-bold'> {info?.fullname}</Link>
                    </div> 
                </div>


            </nav>
        </>
    );
}

export default NavBar;
