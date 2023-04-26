import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

const LoginuserPro = () => {

    const [data, setdata] = useState([])
    const getProject = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/project/loginuserproject`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response);
                setdata(response.data.data)
            })
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        {/* <th>user_id</th> */}
                        <th>pro_name</th>
                        <th>start_date</th>
                        <th>end_date</th>
                        <th>status</th>
                        <th>description</th>
                        {/* <th>tec_id</th> */}
                        <th>user name</th>
                        <th>tec_name</th>
                        <th>action</th>
                    </tr>
                    {
                        data.map((data) =>
                            <tr>
                                {/* <td>{data.user_id}</td> */}
                                <td>{data.pro_name}</td>
                                <td>{moment(data.start_date).format("DD-MM-YYYY")}</td>
                                <td>{moment(data.end_date).format("DD-MM-YYYY")}</td>
                                <td>{data.status}</td>
                                <td>{data.description}</td>
                                {/* <td>{data.tec_id}</td> */}
                                <td>{data.name}</td>
                                <td>{data.tec_name}</td>
                                <td style={{ fontSize: '24px' }}>
                                    {/* <Link to={`/singleproject/${data.pro_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link> */}
                                    <Link to={`/editproject/${data.pro_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    {/* <MdDeleteForever onClick={() => handleDelete(data.pro_id)} style={{ color: 'red' }} /> */}
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

export default LoginuserPro