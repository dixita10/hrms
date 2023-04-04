import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const Dailycomponent = () => {

    const [data, setData] = useState([])

    useEffect(() => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/finddailyattendancebyuseridandintime`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data.attendance);
                if (response.status === 200) {
                    setData(response.data.attendance)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <table >
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

export default Dailycomponent