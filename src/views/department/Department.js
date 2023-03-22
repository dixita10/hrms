import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";


function Department() {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)

    const handleClick = () => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/department/findalldepartment?page=${pageCount}&limit=5`,
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

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected + 1)
        // let currentPage = data.selected + 1
    }
    const handleDelete = (dep_id) => {

        var passData = {
            dep_name: data.dep_name,
            description: data.description,
        }
        var token = localStorage.getItem('token')
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/department/deletedepartment/${dep_id}`,
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
    }, [pageCount])


    return (
        <div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={'/adddepartment'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>dep_name</th>
                        <th>description</th>
                        <th>Action</th>
                    </tr>
                    {
                        data.map((data) =>
                            <tr>
                                <td>{data.dep_name}</td>
                                <td>{data.description}</td>
                                <td style={{ fontSize: '24px' }}>
                                    <Link to={`/singledepartment/${data.dep_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                                    <Link to={`/editdepartment/${data.dep_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.dep_id)} style={{ color: 'red' }} />
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
                pageCount={15}
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

export default Department