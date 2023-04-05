import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Pagination from './Pagination'

const Monthlycomponent = () => {

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // number of items to display per page

    const totalPages = Math.ceil(data.length / itemsPerPage);
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = data.slice(startIndex, endIndex);
    useEffect(() => {

        var user_id = localStorage.getItem("user_id")
        // console.log(user_id);
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/usermonthlyreport/${user_id}`,
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
    }, [])

    return (
        <div>
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
                            <td>{moment(data.first_checkin).format("HH:mm:ss")}</td>
                            <td>{moment(data.last_checkout).format("HH:mm:ss")}</td>
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
        </div>
    )
}

export default Monthlycomponent