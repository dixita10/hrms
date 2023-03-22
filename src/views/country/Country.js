import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { HiPlusSm } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Country = () => {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)

    const getcountry = () => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/country/findallcountry?page=${pageCount}&limit=5`,
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
    }, [pageCount])

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected + 1)
        // let currentPage = data.selected + 1
    }

    const handleDelete = (country_id) => {

        var passData = {
            country_name: data.country_name,
        }
        var token = localStorage.getItem('token')
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/country/deletecountry/${country_id}`,
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
                    getcountry()
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
                <Link to={'/addcountry'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>country_name</th>
                        <th>action</th>
                    </tr>
                    {
                        data.map((data) =>
                            <tr>
                                <td>{data.country_name}</td>
                                <td style={{ fontSize: '24px' }}>
                                    <Link to={`/singlecountry/${data.country_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                                    <Link to={`/editcountry/${data.country_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.country_id)} style={{ color: 'red' }} />
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

    return (
        <div>

        </div>
    )
}

export default Country