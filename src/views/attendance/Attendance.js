import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";

function Attendance() {


    const handleClick = () => {

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
                // console.log("response", response.data);
                // var id = response.data.data
                // history.push(`/attendance/${id}`);
                setdata(response.data.data)
            })

    }

    useEffect(() => {
        handleClick()
    }, [])

    const [data, setdata] = useState([])
    // console.log(data);
    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>user_id</th>
                    <th>intime</th>
                    <th>outtime</th>
                    <th>remark</th>
                    <th>action</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.user_id}</td>
                            <td>{data.intime}</td>
                            <td>{data.outtime}</td>
                            <td>{data.remark}</td>
                            {/* <td>
                                    <button onClick={handleClick(data.user_id)}>
                                        view
                                    </button>
                                </td> */}
                            {/* <td><Link to={`/Singleattendance/${data.user_id}`}><button>view</button></Link></td> */}
                            <td><Link to={'/Singleattendance'}><button type="button" className="btn btn-outline-secondary">view</button></Link></td>

                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Attendance