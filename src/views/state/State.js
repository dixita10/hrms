import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";
import Pagination from '../attendance/Pagination';

const State = () => {


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

    const getState = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/state/findallstate`,
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
        getState()
    }, [])

    const handleDelete = (dep_id) => {

        // var passData = {
        //     state_name: data.state_name,
        //     country_id: data.country_id,
        // }
        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/state/deletestate/${dep_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    getState()
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })
    }

    // const { id } = useParams();
    console.log(data);


    const handleSearch = (e) => {

        var token = `Bearer ${localStorage.getItem('token')}`
        var state_name = e.target.value

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/state/findallstate?page=1&limit=5&q=${state_name}`,
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
                <input type='search' placeholder='Search State Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
                <Link to={'/addstate'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div><br />
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>state_name</th>
                        {/* <th>country_id</th> */}
                        <th>country_name</th>
                        <th>action</th>
                    </tr>
                    {
                        visibleItems.map((data) =>
                            <tr>
                                <td>{data.state_name}</td>
                                {/* <td>{data.country_id}</td> */}
                                <td>{data.country_name}</td>
                                <td style={{ fontSize: '24px' }}>
                                    {/* <Link to={`/singlestate/${data.state_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link> */}
                                    <Link to={`/editstate/${data.state_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.state_id)} style={{ color: 'red' }} />
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

export default State