import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { HiPlusSm } from "react-icons/hi";


const Allsalary = () => {

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

    const getSalary = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/salary/findallsalary`,
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
        getSalary()
    }, [])


    const handleDelete = (salary_id) => {

       
        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/salary/deletesalary/${salary_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    getSalary()
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
        var salary = e.target.value

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/salary/findallsalary/?page=1&limit=3&q=${salary}`,
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
                <input type='search' placeholder='Search User Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
                <Link to={'/addsalary'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div><br />
            <table className='responstable'>
                <tr>
                    {/* <th>user_id</th> */}
                    <th>salary</th>
                    <th>bank_detail</th>
                    <th>username</th>
                    <th>action</th>
                </tr>
                {
                    visibleItems.map((data) =>
                        <tr>
                            {/* <td>{data.user_id}</td> */}
                            <td>{data.salary}</td>
                            <td>{data.bank_detail}</td>
                            <td>{data.username}</td>
                            <td style={{ fontSize: '24px' }}>
                                <Link to={`/singlesalary/${data.salary_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                                <Link to={`/editsalary/${data.salary_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                <MdDeleteForever onClick={() => handleDelete(data.salary_id)} style={{ color: 'red' }} />
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Allsalary