import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const Monthlycomponent = () => {

    const [month, setMonth] = useState([])


    useEffect(() => {

        var user_id = localStorage.getItem("user_id")
        // console.log(user_id);
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/getattendancebyuseridtotal/${user_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data.data.daily_totals);
                if (response.status === 200) {
                    setMonth(response.data.data.daily_totals)
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
                    <th>date</th>
                    <th>first_checkin</th>
                    <th>last_checkout</th>
                    <th>time_diff</th>
                    <th>status</th>
                </tr>
                {
                    month.map((month) =>
                        <tr>
                            <td>{month.date}</td>
                            <td>{moment(month.first_checkin).format("HH:mm:ss")}</td>
                            <td>{moment(month.last_checkout).format("HH:mm:ss")}</td>
                            <td>{month.time_diff}</td>
                            <td>{month.status}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Monthlycomponent