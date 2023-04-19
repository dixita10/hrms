import Attendancedailyuser from './Attendancedailyuser'
import Attendancemonthlyuser from './Attendancemonthlyuser'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Pagination from '../attendance/Pagination';


const Attendanceuser = () => {

    const { id } = useParams()

    var role_id = localStorage.getItem('role_id')

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

    const getAllmanager = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/reporting/findallreporting`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response);
                if (response.status === 200) {
                    setdata(response.data.data)
                }
            })
    }

    useEffect(() => {
        getAllmanager();
    }, [])

    const handleDelete = (repo_id) => {

        console.log(repo_id);

        // var passData = {
        //     user_id: data.user_id,
        //     assign_id: data.assign_id,
        // }

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/reporting/deleterepo/${repo_id}`,
            // data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    getAllmanager()
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })
    }


    // const handleSearch = (e) => {

    //     var token = `Bearer ${localStorage.getItem('token')}`
    //     var city_name = e.target.value

    //     axios({
    //         method: 'GET',
    //         url: `${process.env.REACT_APP_URL}/city/findallcity/?page=1&limit=3&q=${city_name}`,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: token,
    //             Accept: "application/json",
    //         },
    //     })
    //         .then((response) => {
    //             // console.log("response", response);
    //             setdata(response.data.data)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    // }

    return (
        <div>
            {role_id === "3" ? (<div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {/* <input type='search' placeholder='Search  Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} /> */}
                    <Link to={'/addmanager'}>
                        <button className="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                    </Link>
                </div><br />
                <div className='table-responsive'>
                    <table className='responstable'>
                        <tr>
                            <th>User Name</th>
                            <th>Assign Name</th>
                            <th>Action</th>
                        </tr>
                        {
                            visibleItems.map((data) =>
                                <tr>
                                    <td>{data.user_id}</td>
                                    <td>{data.assign_id}</td>
                                    <td style={{ fontSize: '24px' }}>
                                        <Link to={`/editmanager/${data.repo_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                        <MdDeleteForever onClick={() => handleDelete(data.repo_id)} style={{ color: 'red' }} />
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
            </div>) : ""}

            {role_id === "4" ? (
                <Tabs Tabs
                    defaultActiveKey="daily log"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="daily log" title="Daily Log">
                        <Attendancedailyuser />
                    </Tab>
                    <Tab eventKey="mothly Log" title="Monthly Log">
                        <Attendancemonthlyuser />
                    </Tab>

                </Tabs>) : ""}


            <ToastContainer autoClose={2000} />
        </div >
    )
}

export default Attendanceuser