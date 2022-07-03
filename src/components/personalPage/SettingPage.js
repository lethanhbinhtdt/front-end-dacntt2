
import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'
import { Form } from "react-bootstrap";
import { Alert } from 'react-bootstrap';


import axios from '../../middlewares/axios';

function SettingPage() {
    const [familyName, setFamalyName] = useState("")
    const [givenName, setGivenName] = useState("")
    const [username, setUsername] = useState("")
    const [className, setClassName] = useState("")
    const [phone, setPhone] = useState("")
    const [info, setInfo] = useState()
    const [gender, setGender] = useState("")
    const [picture, setPicture] = useState("")
    const [faculty, setFaculty] = useState("")
    const [biography, setBiography] = useState("")
    const [backgrounPicture, setBackgroundPicture] = useState("")
    const [birthday, setBirthday] = useState("")
    const [imageChoosen, setImageChoosen] = useState("")
    const [backgroundImageChoosen, setBackgroundImageChoosen] = useState("")
    const [message, setMessage] = useState("")
    const [checkShowMess, setCheckShowMess] = useState(false)
    // function handleChange(e) {
    //     // console.log(e.target.value)
    //     setGender(e.target.value)
    // }
    let { id } = useParams();
    const token = getCookieToken()
     
    useEffect(() => {
        fetch(`${BASE_URL}api/profile/${id}`,
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
                setGender(data?.gender ? data?.gender:"Nam")
                setFaculty(data?.faculty ? data?.faculty:"Công nghệ thông tin")
                setClassName(data?.className ? data?.className:"")
                setFamalyName(data?.familyName ? data?.familyName:"")
                setGivenName(data?.givenName ? data?.givenName:"")
                setUsername(data?.username ? data?.username:"")
                setImageChoosen(data?.picture ? data?.picture : "")
                setBackgroundImageChoosen(data?.backgroundPicture ? data?.backgroundPicture : "")
                setBiography(data?.biography ? data?.biography:"")
                setBirthday(data?.birthday ? data?.birthday:"")
                setPhone(data?.phone ? data?.phone : "")
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    function onchanePhone(e){
        setPhone(e.target.value)
    }
    const onchangeClassName =(e)=>{
        setClassName(e.target.value)
    }
    const onchangeUserName =(e)=>{
        setUsername(e.target.value)
    }
    const onchangeGivenName =(e)=>{
        setGivenName(e.target.value)
    }
    const onchangeFamalyName =(e)=>{
        setFamalyName(e.target.value)
    }
    const onchaneGender = (e) =>{
        setGender(e.target.value)
    }
    const onchaneFaculty = (e) =>{
        setFaculty(e.target.value)
    }
    const onchangePicture =(e)=>{
        setPicture(e.target.files[0])
        setImageChoosen(URL.createObjectURL(e.target.files[0]))
    }
    const onchangeBackgroundPicture =(e)=>{
        setBackgroundPicture(e.target.files[0])
        setBackgroundImageChoosen(URL.createObjectURL(e.target.files[0]))
    }
    const onchaneBirthday =(e)=>{
        setBirthday(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(phone, gender, picture)
        const formData = new FormData()
        formData.append("image", picture)
        formData.append("familyName", familyName)
        formData.append("givenName", givenName)
        formData.append("username", username)
        formData.append("biography", biography)
        formData.append("className", className)
        formData.append("phone", phone)
        formData.append("gender", gender)
        formData.append("faculty", faculty)
        formData.append("backgroundPicture", backgrounPicture)

        formData.append("birthday", birthday)
        axios.put(`${BASE_URL}api/account/${id}`, formData,
        {

            headers: {
                'Content-type': 'multipart/form-date',
                // 'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // body:formData
            // body: JSON.stringify(yourNewData)
        }
        
        )
        .then(res=>{
            if(res.status === 200){
                setMessage("Cập nhật thông tin thành công")
                setCheckShowMess(true)
            }
            else{
                setMessage("Có lỗi xảy ra")
                setCheckShowMess(true)
            }
        })
        .catch(err => {
            setMessage("Có lỗi xảy ra")
            setCheckShowMess(true)
            console.error(err)
        })

    
    }
    useEffect(() => {
        if (checkShowMess) {
            setTimeout(() => {
                setCheckShowMess(false);
            }, 3000);
        }
    }, [checkShowMess]);
    return (
        <main className="container p-0">

            <div className="container-fluid p-0">
                {/* <!--icon bar--> */}

                <h1 className="h3 mb-3">Settings</h1>

                <div className="row">
                    <div className="col-md-9 col-xl-10">
                        <div className="tab-pane" id="account">
                            {/* <!--Phần setting tài khoàn public info--> */}
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Thông tin cá nhân</h5>
                                </div>
                                <div className="card-body">
                                    {/* <Form action="/changeProfile1" method="post" encType="multipart/form-data"> */}
                                    <Form  onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-8">
                  
                                
                                                <Form.Group>
                                                    <Form.Label>Họ</Form.Label>
                                                    <Form.Control type="text" value={familyName}  onChange={onchangeFamalyName} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Tên</Form.Label>
                                                    <Form.Control type="text" value={givenName} onChange={onchangeGivenName} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" value={username}  onChange={onchangeUserName}  />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Lớp</Form.Label>
                                                    <Form.Control type="text" value={className} onChange={onchangeClassName}  />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <Form.Control type="text" value={phone} onChange={onchanePhone} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Ngày sinh</Form.Label>
                                                    <Form.Control type="text" value={birthday} onChange={onchaneBirthday} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Giới tính</Form.Label>
                                                    <select  value={gender} onChange={onchaneGender}>
                                                        <option  name="Nam"> Nam</option>
                                                        <option name="Nữ">Nữ</option>
                                                    </select>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Khoa: </Form.Label>
                                                    <select value={faculty} onChange={onchaneFaculty}>
                                                        <option  name="Công nghệ thông tin">Công nghệ thông tin</option>
                                                        <option  name="Lao động công đoàn">Lao động công đoàn</option>
                                                        <option  name="Luật">Luật</option>
                                                        <option  name=" Mỹ thuật công nghiệp">Mỹ thuật công nghiệp</option>
                                                        <option  name="Điện-điện tử">Điện-điện tử</option>
                                                        <option  name="Công nghệ thông tin">Công nghệ thông tin</option>
                                                        <option  name="Quản trị kinh doanh">Quản trị kinh doanh</option>
                                                        <option  name="Tài chính ngân hàng"> Tài chính ngân hàng</option>
                                                        <option  name="Lao động công đoàn"> Lao động công đoàn</option>
                                                        <option  name="Môi trường và bảo hộ lao động">  Môi trường và bảo hộ lao động</option>
                                                        <option  name="Lao động công đoàn"> Lao động công đoàn</option>
                                                        <option  name="Ngoại ngữ">Ngoại ngữ</option>
                                                        <option  name="Toán - thống kê">Toán - thống kê</option>
                                                        <option  name="Dược">Dược</option>
                                                        <option  name="Kế toán">Kế toán</option>
                                                        <option  name="Khoa học xã hội nhân văn">Khoa học xã hội nhân văn</option>
                                                    </select>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Tiểu sử</Form.Label>
                                                    <Form.Control as="textarea"  value={biography} rows={3} onChange={(e)=>{setBiography(e.target.value)}}/>
                                                </Form.Group>
                                            
                                            </div>
                                            <div className="col-md-4">
                                                <h4>Thay đổi ảnh đại diện </h4>
                                                <div className="text-center">
                                                    <img alt="Chris Wood" src={imageChoosen} width="128" height="128"></img>
                                                    <div className="mt-2">
                                                        {/* <!-- lồng 2 button thành 1 --> */}
                                                        {/* <!--<input type="button" className=" btn btn-primary" id="my-button" value="Upload image">className="d-none"  --> */}
                                                        <input type="file" name="image" id="my-file" accept=".jpg, .jpeg, .png" onChange={onchangePicture} ></input>
                                                    </div>
                                                    <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                                                </div>

                                                <h4>Thay đổi ảnh bìa</h4>
                                                <div className="text-center">
                                                    <img alt="Chris Wood" src={backgroundImageChoosen} width="160" height="80"></img>
                                                    <div className="mt-2">
                                                        {/* <!-- lồng 2 button thành 1 --> */}
                                                        {/* <!--<input type="button" className=" btn btn-primary" id="my-button" value="Upload image">className="d-none"  --> */}
                                                        <input type="file" name="image" id="my-file" accept=".jpg, .jpeg, .png" onChange={onchangeBackgroundPicture}></input>
                                                    </div>
                                                    <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="Submit" className="btn btn-primary">Save changes</button>
                                    </Form>

                                </div>
                            </div>

                        </div>



                    </div>
                    <div className="col-md-3 col-xl-2">
                    <div><Alert show={checkShowMess} variant='primary'>{message}</Alert></div>
                </div>
                </div>

            </div>
        </main>
    )
}
export default SettingPage