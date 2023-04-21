import React, { useState, useEffect } from 'react'
import axios from 'axios'
import profile from "../../assets/images/avatars/profile.png"
import phoneicon from "../../assets/images/phoneicon.svg"
import emailicon from "../../assets/images/emailicon.svg"

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
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '50px', marginTop: '20px' }}>
                <img src={profile} style={{ width: '150px', marginLeft: '48px' }} />
                <h6 style={{ marginTop: '15px', textAlign: 'center' }}>{data.dep_name}</h6>
                <div style={{ marginTop: '15px', textAlign: 'center' }}><img src={phoneicon} style={{ width: '15px', marginRight: '5px' }} />{data.contact}</div>
                <div style={{ marginTop: '5px', textAlign: 'center' }}><img src={emailicon} style={{ width: '19px', marginRight: '5px' }} />{data.email}</div>
            </div>
            <div style={{ width: '70%' }}>
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
            {/* <table className='responstable'>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>username</th>
                    <th>address</th>
                    <th>birth_date</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>contact</th>
                    <th>image</th>
                    <th>city name</th>
                    <th>role name</th>
                    <th>department name</th>
                </tr>
                <tr>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.username}</td>
                    <td>{data.address}</td>
                    <td>{data.birth_date}</td>
                    <td>{data.age}</td>
                    <td>{data.gender}</td>
                    <td>{data.contact}</td>
                    <td>{data.image}</td>
                    <td>{data.city_name}</td>
                    <td>{data.role_name}</td>
                    <td>{data.dep_name}</td>
                </tr>
            </table> */}
        </div>

    )
}

export default Loggeduser