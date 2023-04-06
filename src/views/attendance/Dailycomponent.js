import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dailycomponent = () => {

    const [data, setData] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const handleSearch = (date) => {
        var token = `Bearer ${localStorage.getItem('token')}`
        // var date = e.target.value

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/dailyattendance?date=${date}`,
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

    const handlePrevious = () => {
        const previousDate = new Date(selectedDate);
        previousDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(previousDate);
        handleSearch(previousDate.toISOString().split('T')[0]);
    };

    const handleNext = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDate);
        handleSearch(nextDate.toISOString().split('T')[0]);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleSearch(date.toISOString().split('T')[0]);
    }

    return (
        <div>
            <div className='datedaily'>
                <button className="btn btn-link btndaily" onClick={handlePrevious}>Previous ... </button>
                <DatePicker selected={selectedDate} onChange={handleDateChange} style={{ padding: '5px' }} className='datepick' />
                <button className="btn btn-link btndaily" onClick={handleNext}>... Next</button>
            </div><br />
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