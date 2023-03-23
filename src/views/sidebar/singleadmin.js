import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { MdEdit, MdDeleteForever } from "react-icons/md";


const singleadmin = () => {
    const { id } = useParams();

    const [data, setData] = useState([])

    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/admin/findoneadmin/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response.data);
                setData(response.data)
            })
    }, [])

    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>admin_name</th>
                    <th>email</th>
                    <th>contact</th>
                    <th>user_name</th>
                    <th>city_id</th>
                    <th>address</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.admin_name}</td>
                            <td>{data.email}</td>
                            <td>{data.contact}</td>
                            <td>{data.user_name}</td>
                            <td>{data.city_id}</td>
                            <td>{data.address}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default singleadmin