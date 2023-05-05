import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Pagination from './Pagination'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Monthlycomponent = () => {

    const [data, setData] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // number of items to display per page

    const totalPages = Math.ceil(data.length / itemsPerPage);
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = data.slice(startIndex, endIndex);

    const handlemonthsearch = () => {
        var user_id = localStorage.getItem("user_id")
        // console.log(user_id);
        var token = `Bearer ${localStorage.getItem('token')}`

        var year = selectedDate.getFullYear();
        var month = selectedDate.getMonth() + 1;

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/usermonthlyreport/${user_id}?year=${year}&month=${month}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data.data.daily_totals);
                if (response.status === 200) {
                    setData(response.data.data.daily_totals)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        handlemonthsearch()
    }, [selectedDate])

    const handlePrevious = () => {
        const previousDate = new Date(selectedDate);
        previousDate.setMonth(selectedDate.getMonth() - 1);
        setSelectedDate(previousDate);
    };

    const handleNext = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setMonth(selectedDate.getMonth() + 1);
        setSelectedDate(nextDate);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }


    return (
        <div>
            <div className='datedaily'>
                <button className="btn btn-link btndaily" onClick={handlePrevious}>Previous ... </button>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    className='datepick'
                />
                <button className="btn btn-link btndaily" onClick={handleNext}>... Next</button>
            </div><br />
            <table className='responstable'>
                <tr>
                    <th>date</th>
                    <th>first_checkin</th>
                    <th>last_checkout</th>
                    <th>work duration</th>
                    <th>status</th>
                </tr>
                {
                    visibleItems.map((data) =>
                        <tr>
                            <td>{data.date}</td>
                            <td>{data.first_checkin}</td>
                            <td>{data.last_checkout}</td>
                            <td>{data.time_diff}</td>
                            <td>{data.status}</td>
                        </tr>
                    )
                }
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Monthlycomponent