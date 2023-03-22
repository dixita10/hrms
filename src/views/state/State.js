import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";


const State = () => {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)

    const getState = () => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/state/findallstate?page=${pageCount}&limit=5`,
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
    }, [pageCount])


    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected + 1)
        // let currentPage = data.selected + 1
    }

    const handleDelete = (dep_id) => {

        var passData = {
            state_name: data.state_name,
            country_id: data.country_id,
        }
        var token = localStorage.getItem('token')
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/state/deletestate/${dep_id}`,
            data: passData,
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



    return (
        <div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={'/addstate'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>state_name</th>
                        <th>country_id</th>
                        <th>action</th>
                    </tr>
                    {
                        data.map((data) =>
                            <tr>
                                <td>{data.state_name}</td>
                                <td>{data.country_id}</td>
                                <td style={{ fontSize: '24px' }}>
                                    <Link to={`/singlestate/${data.state_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                                    <Link to={`/editstate/${data.state_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.state_id)} style={{ color: 'red' }} />
                                    {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
            <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
                breakLabel="..."
                pageCount={10}
                pageRangeDisplayed={4}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
            <ToastContainer autoClose={2000} />
        </div>
    )

}

export default State