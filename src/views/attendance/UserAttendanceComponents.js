import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'

const UserAttendanceComponents = () => {

    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = data.slice(startIndex, endIndex);

    useEffect(() => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/findallattendance`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response.data.data);
                if (response.status === 200) {
                    setData(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleSearch = (e) => {
        // console.log(e.target.value);
        var token = `Bearer ${localStorage.getItem('token')}`
        var username = e.target.value

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/findallattendance?q=${username}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response.data.data);
                setData(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <div>
                <div class="d-flex justify-content-end">
                    <input type='search' placeholder='Search User Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '35%' }} onChange={handleSearch} />
                </div><br />
                <table className='responstable'>
                    <tr>
                        {/* <th>user_id</th> */}
                        <th>user name</th>
                        <th>intime</th>
                        <th>outtime</th>
                        <th>Action</th>
                    </tr>
                    {
                        visibleItems.map((data) =>
                            <tr>
                                {/* <td>{data.user_id}</td> */}
                                <td>{data.username}</td>
                                <td>{moment(data.intime).format("LLL")}</td>
                                <td>{moment(data.outtime).format("LLL")}</td>
                                <td>
                                    <Link to={`/monthlyattendance/${data.user_id}`}>
                                        <button type="button" class="btn btn-outline-secondary">View Report</button>
                                    </Link>

                                </td>
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
        </div>
    )
}

export default UserAttendanceComponents