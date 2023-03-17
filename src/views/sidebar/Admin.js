import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function Admin() {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)
    // console.log(pageCount);
    // const [count, setcount] = useState()
    const pageSize = 1;

    useEffect(() => {
        var token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/admin/findalladmin?page=${pageCount}&limit=5`,
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

    }, [pageCount])
    console.log(data);
    // const fetchComments = async (currentPage) => {

    //     var token = localStorage.getItem('token')

    //     const res = await fetch(
    //         `${process.env.REACT_APP_URL}/admin/findalladmin/?page=${currentPage}&limit=5`,
    //         {
    //             method: 'get',
    //             headers: new Headers({
    //                 Authorization: token,
    //             })
    //         }
    //     );

    //     // const total = res.headers.get('x-total-count');
    //     // console.log(total);
    //     const data = await res.json();
    //     return data;
    // }

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected + 1)
        // let currentPage = data.selected + 1
    }

    // console.log(data);

    return (
        <div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>Admin_name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>User_name</th>
                        <th>Password</th>
                        <th>Action</th><br />

                    </tr>
                    {
                        data.map((data) =>
                            <tr style={{ fontSize: '15px' }}>
                                <td>{data.admin_name}</td>
                                <td>{data.email}</td>
                                <td>{data.contact}</td>
                                <td>{data.user_name}</td>
                                <td>{data.password}</td>
                                <td><Link to={'/editadmin'}><button className='btn btn-outline-primary'>Edit</button></Link></td>
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

        </div>
    )
}

export default Admin