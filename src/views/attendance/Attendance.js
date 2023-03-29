import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";


function Attendance() {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)


    const handleClick = () => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/attendance/findallattendance?page=${pageCount}&limit=5`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response.data);
                // var id = response.data.data
                // history.push(`/attendance/${id}`);
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


    useEffect(() => {
        handleClick()
    }, [pageCount])


    const handleDelete = (admin_id) => {

        var passData = {
            user_id: data.user_id,
            intime: data.intime,
            outtime: data.outtime,
            remark: data.remark,
            user_name: data.user_name,
            user_email: data.user_email,
        }

        //   console.log(admin_id);
        var token = `Bearer ${localStorage.getItem('token')}`
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/attendance/deleteattendance/${admin_id}`,
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
        // .catch((error) => {
        //     console.log(error);
        //     toast.error(error.response.data.message)
        // })

    }
    const handleclock = (id) => {
        console.log(id);
    }
    // console.log(data[0]?.user_id);
    return (
        <div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button" onClick={() => handleclock(data[0]?.user_id)}>clock-in</button>
            </div>
            <table className='responstable'>
                <tr>
                    <th>user_id</th>
                    <th>intime</th>
                    <th>outtime</th>
                    <th>remark</th>
                    <th>user_name</th>
                    <th>user_email</th>
                    <th>action</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.user_id}</td>
                            <td>{moment(data.intime).format("LLL")}</td>
                            <td>{moment(data.outtime).format("LLL")}</td>
                            <td>{data.remark}</td>
                            <td>{data.user_name}</td>
                            <td>{data.user_email}</td>
                            <td style={{ fontSize: '24px' }}>
                                <Link to={`/singleattendance/${data.attendance_id}`}>
                                    <FaEye style={{ marginRight: '25px', color: 'gray' }} />
                                </Link>
                                <MdDeleteForever onClick={() => handleDelete(data.attendance_id)} style={{ color: 'red' }} />

                                {/* <Link to={`/editattandance/${data.user_id}`}><button type="button" className="btn btn-outline-primary">edit</button></Link> */}

                            </td>

                            {/* <td><Link to={'/Singleattendance'}><button type="button" className="btn btn-outline-secondary">view</button></Link></td> */}

                        </tr>
                    )
                }
            </table>
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

export default Attendance