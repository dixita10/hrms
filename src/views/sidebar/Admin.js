import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Admin() {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)
    
    // console.log(pageCount);
    // const [count, setcount] = useState()
    const pageSize = 1;

    const getrecord = () => {
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
                // console.log("response", response);
                if (response.status === 200) {
                    setdata(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }
    useEffect(() => {
        getrecord()
    }, [pageCount])

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

    const handleDelete = (admin_id) => {

        var passData = {
            admin_name: data.admin_name,
            email: data.email,
            contact: data.contact,
            user_name: data.user_name,
            password: data.password,
        }
        //   console.log(admin_id);
        var token = localStorage.getItem('token')
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/admin/deleteadmin/${admin_id}`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    getrecord()
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })

    }


    return (
        <div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>Admin_name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>User_name</th>
                        {/* <th>Password</th> */}
                        <th>Action</th><br />

                    </tr>
                    {
                        data.map((data) =>
                            <tr style={{ fontSize: '15px' }}>
                                <td>{data.admin_name}</td>
                                <td>{data.email}</td>
                                <td>{data.contact}</td>
                                <td>{data.user_name}</td>
                                {/* <td>{data.password}</td> */}
                                <td>
                                    <Link to={`/editadmin/${data.admin_id}`}><button className='btn btn-outline-primary mx-3 m-md-3'>Edit</button></Link>
                                    <button className='btn btn-outline-danger' onClick={() => handleDelete(data.admin_id)}>Delete</button>
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

export default Admin