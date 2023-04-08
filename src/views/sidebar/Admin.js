import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";


function Admin() {

    const history = useHistory()

    const [data, setdata] = useState([])
    // const [todosPerPage, settodosPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(1)

    // const numOfTotalPages = Math.ceil(data.length / pageCount);
    // const pages = [...Array[numOfTotalPages + 1].keys()].slice(1);

    // const indexOflastdata = pageCount * todosPerPage;
    // const indexOffirstdata = indexOflastdata - todosPerPage;

    // const visibledata = data.slice(indexOffirstdata, indexOflastdata)


    // console.log(pageCount);
    // const [count, setcount] = useState()

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
                // console.log("response", response.data.data);
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

        // var passData = {
        //     admin_name: data.admin_name,
        //     email: data.email,
        //     contact: data.contact,
        //     user_name: data.user_name,
        //     password: data.password,
        // }
        //   console.log(admin_id);
        var token = localStorage.getItem('token')
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/admin/deleteadmin/${admin_id}`,
            // data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
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
    const handleupdate = (admin_id) => {

        history.push(`/editadmin/${admin_id}`)

        // console.log(data.filter(data => data.admin_id === id));
        // const update = data.filter(data => data.id === id)
        // console.log(update)

    }


    return (
        <div>
            {/* <div className='admin_profile text-center'>
                <div className='admin_div'>
                    <div className='row'>
                        <div className='col-md-9'>
                            <h6>PERSONAL INFO</h6>
                        </div>
                        <div className='col-md-3'>
                            <p style={{ fontSize: '24px' }}>
                                <Link to={`/singleadmin/${data.admin_id}`}>
                                    <FaEye style={{ marginRight: '25px', color: 'gray' }} />
                                </Link>
                                <MdEdit onClick={() => handleupdate(data.admin_id)} style={{ marginRight: '20px', color: '#0d6efd' }} />
                                <MdDeleteForever onClick={() => handleDelete(data.admin_id)} style={{ color: 'red' }} />

                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3 admin'>
                            <p style={{ fontWeight: 500 }}>Admin_name</p>
                            {
                                data.map((data) =>
                                    <p>{data.admin_name}</p>)
                            }
                        </div>
                        <div className='col-md-3'>
                            <p>Email</p>
                            {
                                data.map((data) =>
                                    <p>{data.email}</p>)
                            }
                        </div>
                        <div className='col-md-3'>
                            <p>Contact</p>
                            {
                                data.map((data) =>
                                    <p>{data.contact}</p>)
                            }
                        </div>
                        <div className='col-md-3'>
                            <p>User_name</p>
                            {
                                data.map((data) =>
                                    <p>{data.user_name}</p>)
                            }
                        </div>
                        <div className='col-md-3'>
                            <p>City_id</p>
                            {
                                data.map((data) =>
                                    <p>{data.city_id}</p>)
                            }
                        </div>
                        <div className='col-md-3'>
                            <p>Address</p>
                            {
                                data.map((data) =>
                                    <p>{data.address}</p>)
                            }
                        </div>
                    </div>
                </div>
            </div> */}


            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>Admin_name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>User_name</th>
                        <th>city_id</th>
                        <th>address</th>
                        <th>Action</th><br />

                    </tr>
                    {
                        data.map((data) =>
                            <tr style={{ fontSize: '15px' }}>
                                <td>{data.admin_name}</td>
                                <td>{data.email}</td>
                                <td>{data.contact}</td>
                                <td>{data.user_name}</td>
                                <td>{data.city_id}</td>
                                <td>{data.address}</td>
                                <td style={{ fontSize: '24px' }}>
                                    <Link to={`/singleadmin/${data.admin_id}`}>
                                        <FaEye style={{ marginRight: '25px', color: 'gray' }} />
                                    </Link>
                                    <MdEdit onClick={() => handleupdate(data.admin_id)} style={{ marginRight: '20px', color: '#0d6efd' }} />
                                    <MdDeleteForever onClick={() => handleDelete(data.admin_id)} style={{ color: 'red' }} />

                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
            {/* <span>prev</span>
            <p>
                {pages.map((page) => (
                    <span key={page}> {`${page} |`}</span>
                ))}
            </p>
            <span>next</span> */}
             <br/>
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