
import React, { useEffect, useState } from "react"
import '../../css/Friend.css';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import { getCookieToken } from '../../middlewares/common'
import { BASE_URL } from '../../middlewares/constant';
import { Dropdown, IconButton } from 'rsuite';
import Popup from 'reactjs-popup';
function Friend(props) {
    let { id } = useParams();

    const [friendInfo, setFriendInfo] = useState("")
    const token = getCookieToken()
    var listFriend = []
    var listRow = []
    useEffect(() => {
        fetch(`${BASE_URL}api/requestFriend/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                // body: JSON.stringify(yourNewData)
            }

        )
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((data) => {

                setFriendInfo(data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    if (friendInfo.length == 0) {
        listRow.push(<h3>Bạn chưa có người bạn nào, hãy kết bạn thêm nhé</h3>)
    }
    else {
        for (var i = 0; i < friendInfo.length; i++) {
            listFriend.push(
                 <div id={friendInfo[i]._id} className="col-5 mt-3 card-info">
                
                   <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-4 md-4">
                                <img src={friendInfo[i].picture} className="card-img" alt="..."></img>
                            </div>
                            <div className="col-6 md-6  d-flex align-items-center">
                                <div className="card-body">
                                    <h5 className="card-title">{friendInfo[i].fullname}</h5>
                                </div>
                            </div>
                            <div className='col-2 md-2'>
                              

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

            )
        }
        // friendInfo.forEach((friendInfo) => {

        // })
        console.log("hhhhhhhhhh", (listFriend))
        for (var index = 0; index < listFriend.length; index++) {
            if (index % 2 == 0) {
                console.log("da vao 1")
                var firstColumn = listFriend[index]

                if (index == listFriend.length-1){
                    console.log("da vao ")
                    listRow.push(<div className="row">
    
                    <div className="d-flex justify-content-center">
    
                        {firstColumn}
    
                    </div>
    
                </div>)
                }
            }

            else {
                var secondColumn = listFriend[index]
                listRow.push(<div className="row">

                    <div className="d-flex justify-content-center">

                        {firstColumn}
                        {secondColumn}

                    </div>

                </div>)

            }
        }
    }

    return (

        <div className="card">

            <div className="container">
                <div className = "row">
                    <div className="col-6 md-6" > <h4 className="tag-name">Bạn bè</h4></div>
                    <div className="col-6 md-6" > <Link to={ `/friendrequests`}>Lời mời kết bạn</Link></div>
                </div>
                {listRow}
                {/* 
                <div className="row">
                    <div className="d-flex justify-content-center">

                      

                    </div>
                </div> */}

            </div>

        </div>
    )
}

export default Friend;