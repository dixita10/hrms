import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Singlesalary = () => {

    const { id } = useParams();
    // console.log(id);

    const [data, setData] = useState([])

    useEffect(() => {
        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/salary/findonesalary/${id}`,
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
            .catch((error) => {
                console.log(error);
            })
    }, [])

    console.log(data);
    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>user_id</th>
                    <th>salary</th>
                    <th>bank_detail</th>
                    <th>username</th>

                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.user_id}</td>
                            <td>{data.salary}</td>
                            <td>{data.bank_detail}</td>
                            <td>{data.username}</td>

                        </tr>
                    )
                }
            </table>

        </div>
    )
}

export default Singlesalary