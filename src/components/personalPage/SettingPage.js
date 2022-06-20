
import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import { BASE_URL } from '../../middlewares/constant';
import {getCookieToken} from '../../middlewares/common'
import { Form } from "react-bootstrap";

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

    console.log("genderrf", gender)
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
                setInfo(data)
                setGender(data?.gender ? data?.gender:"Nam")
                setFaculty(data?.faculty ? data?.faculty:"Công nghệ thông tin")
                setClassName(data?.className ? data?.className:"")
                setFamalyName(data?.familyName ? data?.familyName:"")
                setGivenName(data?.givenName ? data?.givenName:"")
                setUsername(data?.username ? data?.username:"")

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
        formData.append("faculty", faculty)
        console.log(token)
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
            if(res.ok){
                console.log(" cap nhat thong tin thanh cong ")
            }
        })
        .catch(err => {
            console.error(err)
        })

    }
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
                                                    <Form.Control type="text" value={info?.familyName}  onChange={onchangeFamalyName} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Tên</Form.Label>
                                                    <Form.Control type="text" value={info?.givenName} onChange={onchangeGivenName} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" value={info?.username}  onChange={onchangeUserName}  />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Lớp</Form.Label>
                                                    <Form.Control type="text" value={info?.className} onChange={onchangeClassName}  />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <Form.Control type="text" value={info?.phone} onChange={onchanePhone} />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Giới tính</Form.Label>
                                                    <select value={gender} onChange={onchaneGender}>
                                                        <option selected name="Nam"> Nam</option>
                                                        <option name="Nữ">Nữ</option>
                                                    </select>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Khoa: </Form.Label>
                                                    <select value={faculty} onChange={onchaneFaculty}>
                                                        <option selected name="Công nghệ thông tin"> Công nghệ thông tin</option>
                                                        <option name="Nữ">Nữ</option>
                                                    </select>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Tiểu sử</Form.Label>
                                                    <Form.Control as="textarea"  value={info?.biography} rows={3} onChange={(e)=>{setBiography(e.target.value)}}/>
                                                </Form.Group>
                                            
                                            </div>
                                            <div className="col-md-4">
                                                <h4>Thay đổi ảnh đại diện </h4>
                                                <div className="text-center">
                                                    <img alt="Chris Wood" src={picture} width="128" height="128"></img>
                                                    <div className="mt-2">
                                                        {/* <!-- lồng 2 button thành 1 --> */}
                                                        {/* <!--<input type="button" className=" btn btn-primary" id="my-button" value="Upload image">className="d-none"  --> */}
                                                        <input type="file" name="image" id="my-file" accept=".jpg, .jpeg, .png" onChange={onchangePicture} ></input>
                                                    </div>
                                                    <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                                                </div>

                                                <h4>Thay đổi ảnh bìa</h4>
                                                <div className="text-center">
                                                    <img alt="Chris Wood" src={picture} width="128" height="128"></img>
                                                    <div className="mt-2">
                                                        {/* <!-- lồng 2 button thành 1 --> */}
                                                        {/* <!--<input type="button" className=" btn btn-primary" id="my-button" value="Upload image">className="d-none"  --> */}
                                                        <input type="file" name="image" id="my-file" accept=".jpg, .jpeg, .png" ></input>
                                                    </div>
                                                    <small>For best results, use an image at least 128px by 128px in .jpg format</small>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="Submit" className="btn btn-primary">Save changes</button>
                                    </Form>

                                </div>
                            </div>
                            {/* <!--Phần setting tài khoàn private info--> */}
                            {/* <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Private info</h5>
                                </div>
                                <div className="card-body">
                                    <form action="/changeProfile2" method="post">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label for="inputFirstName">First name</label>
                                                <input type="text" className="form-control" id="inputFirstName" value="<%=doc.given_name%>" name="firstname"></input>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="inputLastName">Last name</label>
                                                <input type="text" className="form-control" id="inputLastName" value="<%=doc.family_name%>" name="lastname"></input>
                                            </div>
                                        </div>

                                        <input type="hidden" className="form-control" id="inputEmail" value="<%=doc.email%>" name="email"></input>

                                        <div className="form-group">
                                            <label for="inputAddress">Class</label>
                                            <input type="text" className="form-control" id="inputClass" placeholder="18050401" value="<%=doc.className%>" name="className"></input>
                                        </div>
                                        <div className="form-group ">
                                            <label for="inputState">faculty</label>
                                            <select id="inputState" className="form-control" name="faculty" >
                                                <option selected="">Choose...</option>
                                                <option>Khoa Luật</option>
                                                <option>Khoa Mỹ thuật công nghiệp</option>
                                                <option>Khoa Điện-Điện tử</option>
                                                <option>Khoa Công nghệ thông tin</option>
                                                <option>Khoa Quản trị kinh doanh</option>
                                                <option>Khoa Môi trường và bảo hộ lao động</option>
                                                <option>Khoa Lao động công đoàn</option>
                                                <option>Khoa giáo dục quốc tế</option>
                                                <option>Khoa Tài chính ngân hàng</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </form>

                                </div>
                            </div>*/}

                        </div>
                        {/* <%}else{%>

                        <div className="tab-pane" id="password" >
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Password</h5>

                                    <form action="/changePassword" method = "post">
                                        <input type="hidden" name ="emailHidden" value = "<%=doc.email%>">
                                        <div className="form-group">
                                            <label for="inputPasswordCurrent">Current password</label>
                                            <input type="password" name = "password" className="form-control" id="inputPasswordCurrent">
                                            <small><a href="#">Forgot your password?</a></small>
                                        </div>
                                        <div className="form-group">
                                            <label for="inputPasswordNew">New password</label>
                                            <input type="password"  name = "newPassword" className="form-control" id="inputPasswordNew">
                                        </div>
                                        <div className="form-group">
                                            <label for="inputPasswordNew2">Verify password</label>
                                            <input type="password" name ="newPasswordConfirm" className="form-control" id="inputPasswordNew2">
                                        </div>
                                        <%if(locals.message) {%>
                                            <div className="alert alert-danger">
                                                <%= message %>    
                                            </div>
                                            <%}%>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    <%}%>
             */}

                    </div>
                </div>

            </div>
        </main>
    )
}
export default SettingPage