import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import Pagination from '../attendance/Pagination'
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";


function Department() {

    const [data, setdata] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // number of items to display per page

    const totalPages = Math.ceil(data.length / itemsPerPage);
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = data.slice(startIndex, endIndex);

    const handleClick = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/department/findalldepartment`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response);
                setdata(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleDelete = (dep_id) => {

        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/department/deletedepartment/${dep_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    handleClick()
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })
    }

    useEffect(() => {
        handleClick()
    }, [])


    const handleSearch = (e) => {

        var token = `Bearer ${localStorage.getItem('token')}`
        var dep_name = e.target.value

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/department/findalldepartment/?page=1&limit=3&q=${dep_name}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response);
                setdata(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }


    return (
        <div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <input type='search' placeholder='Search Department Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
                <Link to={'/adddepartment'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div><br />
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>dep_name</th>
                        <th>description</th>
                        <th>Action</th>
                    </tr>
                    {
                        visibleItems.map((data) =>
                            <tr>
                                <td>{data.dep_name}</td>
                                <td>{data.description}</td>
                                <td style={{ fontSize: '24px' }}>
                                    {/* <Link to={`/singledepartment/${data.dep_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link> */}
                                    <Link to={`/editdepartment/${data.dep_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.dep_id)} style={{ color: 'red' }} />
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
    )
}

export default Department