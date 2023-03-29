import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
                console.log("response", response.data.user);
                if (response.status === 200) {
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
            <table className='responstable'>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>username</th>
                    <th>city_id</th>
                    <th>address</th>
                    <th>birth_date</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>role_id</th>
                    <th>contact</th>
                    <th>image</th>
                </tr>
                <tr>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.username}</td>
                    <td>{data.city_id}</td>
                    <td>{data.address}</td>
                    <td>{data.birth_date}</td>
                    <td>{data.age}</td>
                    <td>{data.gender}</td>
                    <td>{data.role_id}</td>
                    <td>{data.contact}</td>
                    <td>{data.image}</td>
                </tr>
            </table>
        </div>

    )
}

export default Loggeduser