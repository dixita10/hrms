import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../attendance/Pagination'
import { toast, ToastContainer } from 'react-toastify';
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';

const Allleave = () => {

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // number of items to display per page

    const totalPages = Math.ceil(data.length / itemsPerPage);
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = data.slice(startIndex, endIndex);

    const getLeave = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/leave/findallleave`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response", response.data.data);
                    setData(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getLeave()
    }, [])

    const [approve, setApprove] = useState({
        status: 'accept',
    })
    const [reject, setReject] = useState({
        status: 'reject',
    })
    // console.log(approve);


    const handleapprove = (leave_id) => {

        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            status: approve.status,
        }
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/leave/updateleave/${leave_id}`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    getLeave()
                    toast.success(response.data.message)
                    // history.push("/country")
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }

    const handlereject = (leave_id) => {
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            status: reject.status,
        }
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/leave/updateleave/${leave_id}`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    getLeave()
                    toast.success(response.data.message)
                    // history.push("/country")
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }

    const handleDelete = (leave_id) => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/leave/deleteleave/${leave_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    getLeave()
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })

    }

    return (
        <div>
            <table className='responstable'>
                <tr>
                    <th>tittle</th>
                    <th>start_date</th>
                    <th>end_date</th>
                    <th>days</th>
                    <th>status</th>
                    <th>name</th>
                    <th>Action</th>
                </tr>
                {
                    visibleItems.map((data) =>
                        <tr>
                            <td>{data.tittle}</td>
                            <td>{data.start_date}</td>
                            <td>{data.end_date}</td>
                            <td>{data.days}</td>
                            <td>{data.status}</td>
                            <td>{data.name}</td>
                            <td style={{ fontSize: '24px' }}>
                                {data.status === "pending" ? (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            style={{ margin: '5px' }}
                                            onClick={() => handlereject(data.leave_id)}
                                        >
                                            Reject
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            style={{ margin: '5px' }}
                                            onClick={() => handleapprove(data.leave_id)}
                                        >
                                            Approve
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-outline-danger mx-2"
                                        onClick={() => handleDelete(data.leave_id)}
                                    >
                                        Delete
                                    </button>
                                )}
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
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Allleave