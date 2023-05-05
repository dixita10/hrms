import React, { useState, useEffect } from 'react'
import axios from 'axios'
import profile from "../../assets/images/avatars/profile.png"
import phoneicon from "../../assets/images/phoneicon.svg"
import emailicon from "../../assets/images/emailicon.svg"
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
const Loggeduser = () => {

    const [data, setdata] = useState([])

    const LoggedUser = () => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/userlogin/loggedUser`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data);
                if (response.status === 200) {
                    var username = response.data.user.username
                    localStorage.setItem('username', username)
                    setdata(response.data.user)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        LoggedUser()
    }, [])

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4'>
                        <div style={{ marginRight: '50px', marginTop: '20px' }}>
                            <img src={`http://localhost:1010/uploads/${data.image}`} alt="My image" style={{ width: '200px', height: "170px" }} />
                            <h6 style={{ marginTop: '15px', textAlign: 'center' }}>{data.dep_name}</h6>
                            <p className='text-center'><span className='profile_icon'><FaPhoneAlt /></span>{data.contact}</p>
                            <p className='text-center'><span className='profile_icon'><MdEmail /></span>{data.email}</p>
                        </div>
                    </div>
                    <div className='col-lg-9 col-md-8'>
                        <div >
                            <div className='myprofile'>
                                <h6 style={{ paddingTop: '15px', paddingLeft: '20px' }}>PERSONAL INFO</h6>
                                <hr />
                                <div className='row' style={{ marginTop: '20px', marginLeft: '10px' }}>
                                    <div className='col-md-4'>
                                        <h6>NAME</h6>
                                        {data.name}
                                    </div>
                                    <div className='col-md-4'>
                                        <h6>DATE OF BIRTH</h6>
                                        {data.birth_date}
                                    </div>
                                    <div className='col-md-4'>
                                        <h6>GENDER</h6>
                                        {data.gender}
                                    </div>
                                </div>
                                <div className='row' style={{ marginTop: '20px', marginLeft: '10px' }}>
                                    <div className='col-md-4'>
                                        <div>
                                            <h6>AGE</h6>
                                            {data.age}
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <h6>USER NAME</h6>
                                        {data.username}
                                    </div>
                                    <div className='col-md-4'>
                                        <h6>ROLE NAME</h6>
                                        {data.role_name}
                                    </div>
                                </div>
                                <div className='row' style={{ marginTop: '20px', marginLeft: '10px' }}>
                                    <div className='col-md-12'>
                                        <div>
                                            <h6>DEPARTMENT NAME</h6>
                                            {data.dep_name}
                                        </div>
                                    </div>
                                </div><br />
                            </div><br />
                            <div className='myprofile'>
                                <h6 style={{ paddingTop: '15px', paddingLeft: '20px' }}>CONTACT INFO</h6>
                                <hr />
                                <div className='row' style={{ marginTop: '20px', marginLeft: '10px' }}>
                                    <div className='col-md-4'>
                                        <h6>EMAIL</h6>
                                        {data.email}
                                    </div>
                                    <div className='col-md-4'>
                                        <h6>CONTACT</h6>
                                        {data.contact}
                                    </div>
                                </div><br />
                            </div><br />
                            <div className='myprofile'>
                                <h6 style={{ paddingTop: '15px', paddingLeft: '20px' }}>ADDRESS</h6>
                                <hr />
                                <div className='row' style={{ marginTop: '20px', marginLeft: '10px' }}>
                                    <div className='col-md-4'>
                                        <h6>ADDRESS</h6>
                                        {data.address}
                                    </div>
                                    <div className='col-md-4'>
                                        <h6>CITY NAME</h6>
                                        {data.city_name}
                                    </div>
                                </div><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
        // <div style={{ display: 'flex' }}>



        // </div>

    )
}

export default Loggeduser