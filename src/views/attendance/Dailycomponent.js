import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dailycomponent = () => {

    const [data, setData] = useState([])

    const [currentDate, setCurrentDate] = useState(moment().toDate());

    const handleDateChange = (date) => {
        setCurrentDate(date);
    };

    const handlePreviousClick = () => {
        const newDate = moment(currentDate).subtract(1, 'days').toDate();
        setCurrentDate(newDate);
    };

    const handleNextClick = () => {
        const newDate = moment(currentDate).add(1, 'days').toDate();
        setCurrentDate(newDate);
    };
    var username = localStorage.getItem("username")

    const Dailyatten = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/dailyattendance`,
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
    }


    useEffect(() => {
        Dailyatten();
    }, [])

    return (
        <div>
            <div>
                <button onClick={handlePreviousClick}>Previous</button>
                <DatePicker selected={currentDate} onChange={handleDateChange} />
                <button onClick={handleNextClick}>Next</button>
            </div>
            <table className='responstable'>
                <tr>
                    <th>name</th>
                    <th>intime</th>
                    <th>outtime</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{username}</td>
                            <td>{data.intime}</td>
                            <td>{data.outtime}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Dailycomponent