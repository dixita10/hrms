import React, { useState, useEffect } from 'react'
import axios from 'axios'


function Attendance() {

    const handleClick = () => {
       console.log(data);
    }

    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: 'http://localhost:1010/attendance/findallattendance',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data.data);
                setdata(response.data.data)
            })

    }, [])

    const [data, setdata] = useState([])
    // console.log(data);
    return (
        <div className='table-responsive'>
            <table className='table table-bordered border' border="1">
                <thead>
                    <tr>
                        <th>user_id</th>
                        <th>intime</th>
                        <th>outtime</th>
                        <th>remark</th>
                    </tr>
                </thead>
                {
                    data.map((data) =>
                        <tbody>
                            <tr>
                                <td>{data.user_id}</td>
                                <td>{data.intime}</td>
                                <td>{data.outtime}</td>
                                <td>{data.remark}</td>
                                <td><button onClick={handleClick}>view</button></td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    )
}

export default Attendance