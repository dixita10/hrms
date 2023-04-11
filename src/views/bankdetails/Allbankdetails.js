import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import Pagination from '../attendance/Pagination'
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";


const Allbankdetails = () => {

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


    var token = `Bearer ${localStorage.getItem('token')}`

    const handleClick = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/bankdetail/findallbankdetail`,
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
            .catch((error) => {
                console.log(error);
            })
    }


    const handleDelete = (bank_id) => {

        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/bankdetail/deletebankdetail/${bank_id}`,
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


    return (
        <div>
            <div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to={'/addbankdetail'}>
                        <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                    </Link>
                </div><br />
                <div className='table-responsive'>
                    <table className='responstable'>
                        <tr>
                            <th>name</th>
                            <th>bank_name</th>
                            <th>acc_no</th>
                            <th>branch_name</th>
                            <th>city_id</th>
                            <th>ifsc_code</th>
                            <th>acc_type</th>
                            <th>Action</th>
                        </tr>
                        {
                            visibleItems.map((data) =>
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.bank_name}</td>
                                    <td>{data.acc_no}</td>
                                    <td>{data.branch_name}</td>
                                    <td>{data.city_name}</td>
                                    <td>{data.ifsc_code}</td>
                                    <td>{data.acc_type}</td>
                                    <td style={{ fontSize: '24px' }}>
                                        {/* <Link to={`/singledepartment/${data.bank_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link> */}
                                        <Link to={`/editbankdetail/${data.bank_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                        <MdDeleteForever onClick={() => handleDelete(data.bank_id)} style={{ color: 'red' }} />
                                        {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.bank_id)}>Delete</button> */}
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

export default Allbankdetails