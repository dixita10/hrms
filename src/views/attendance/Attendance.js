import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';

function Attendance() {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)


    const handleClick = () => {

        var token = localStorage.getItem('token')

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

    }
    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected + 1)
        // let currentPage = data.selected + 1
    }


    useEffect(() => {
        handleClick()
    }, [pageCount])


    // console.log(data);
    return (
        <div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={'/addattandance'}>
                    <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div>
            <table className='responstable'>
                <tr>
                    <th>user_id</th>
                    <th>intime</th>
                    <th>outtime</th>
                    <th>remark</th>
                    <th>action</th>
                </tr>
                {
                    data.map((data) =>
                        <tr>
                            <td>{data.user_id}</td>
                            <td>{moment(data.intime).format("LLL")}</td>
                            <td>{moment(data.outtime).format("LLL")}</td>
                            <td>{data.remark}</td>
                            <td>
                                <Link to={`/Singleattendance/${data.user_id}`}><button type="button" className="btn btn-outline-secondary mx-3">view</button></Link>
                                <Link to={`/editattandance/${data.user_id}`}><button type="button" className="btn btn-outline-primary">edit</button></Link>

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

        </div>
    )
}

export default Attendance