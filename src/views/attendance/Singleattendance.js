import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

const Singleattendance = () => {

    const { id } = useParams();
    console.log(id);

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
            url: `${process.env.REACT_APP_URL}/attendance/findoneattendance/${id}`,
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
                            <td>{moment(data.intime).format("LLL")}</td>
                            <td>{moment(data.outtime).format("LLL")}</td>
                            <td>{data.remark}</td>

                        </tr>
                    )
                }
            </table>
        </div>
    )

}

export default Singleattendance