import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Singleattendance = () => {
    // const { user_id } = useParams();

        // const [data, setData] = useState({
        //     user_id: user_id,
        //     intime: '',
        //     outtime: '',
        //     remark: ''
        // })

    const [data, setData] = useState([])
    // const [item , setitem] = useState()

    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: 'http://localhost:1010/attendance/findoneattendance/3',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data);
                setData(response.data)
            })
    }, [])


    return (
        <div>
            <table className='responstable'>
                    <tr>
                        <th>user_id</th>
                        <th>intime</th>
                        <th>outtime</th>
                        <th>remark</th>
                    </tr>
                {
                    data.map((data) =>
                            <tr>
                                <td>{data.user_id}</td>
                                <td>{data.intime}</td>
                                <td>{data.outtime}</td>
                                <td>{data.remark}</td>

                            </tr>
                    )
                }
            </table>
        </div>
    )

}

export default Singleattendance