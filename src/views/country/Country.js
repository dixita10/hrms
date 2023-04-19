import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { HiPlusSm } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Pagination from '../attendance/Pagination';

const Country = () => {

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

    const getcountry = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/country/findallcountry`,
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
    }

    useEffect(() => {
        getcountry()
    }, [])

    const handleDelete = (country_id) => {

        
        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/country/deletecountry/${country_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    getcountry()
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })
    }


    const handleSearch = (e) => {

        var token = `Bearer ${localStorage.getItem('token')}`
        var country_name = e.target.value

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/country/findallcountry/?page=1&limit=3&q=${country_name}`,
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
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <input type='search' placeholder='Search Country Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />

                <Link to={'/addcountry'}>
                    <button className="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div><br />
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>country_name</th>
                        <th>action</th>
                    </tr>
                    {
                        visibleItems.map((data) =>
                            <tr>
                                <td>{data.country_name}</td>
                                <td style={{ fontSize: '24px' }}>
                                    {/* <Link to={`/singlecountry/${data.country_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link> */}
                                    <Link to={`/editcountry/${data.country_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.country_id)} style={{ color: 'red' }} />
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

export default Country