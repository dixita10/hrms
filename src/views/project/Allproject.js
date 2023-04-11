import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { HiPlusSm } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Pagination from '../attendance/Pagination';
import moment from 'moment';

const Allproject = () => {


    const [data, setdata] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = data.slice(startIndex, endIndex);

    const getProject = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/project/findallproject`,
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

    const handleDelete = (pro_id) => {

        // var passData = {
        //   user_id: data.user_id,
        //   pro_name: data.pro_name,
        //   start_date: data.start_date,
        //   end_date: data.end_date,
        //   status: data.status,
        //   description: data.description,
        //   tec_id: data.tec_id,
        // }

        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/project/deleteproject/${pro_id}`,
            // data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    getProject()
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
            <div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to={'/addproject'}>
                        <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                    </Link>
                </div><br />
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
                            visibleItems.map((data) =>
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
                                        <Link to={`/singleproject/${data.pro_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                                        <Link to={`/editproject/${data.pro_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                        <MdDeleteForever onClick={() => handleDelete(data.pro_id)} style={{ color: 'red' }} />
                                        {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
                                    </td>
                                </tr>
                            )
                        }
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <ToastContainer autoClose={2000} />
            </div>
        </div>
    )
}

export default Allproject