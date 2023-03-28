import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";



const City = () => {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)

    // const [filterval, setFilterval] = useState('')
    // const [searchapidata, setSearchapidata] = useState([])

    const getCity = () => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/city/findallcity?page=${pageCount}&limit=5`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response);
                setdata(response.data.data)
                // setSearchapidata(response.data.data)
            })
    }

    useEffect(() => {
        getCity()
    }, [pageCount])

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected + 1)
        // let currentPage = data.selected + 1
    }

    const handleDelete = (city_id) => {

        var passData = {
            city_name: data.city_name,
            state_id: data.state_id,
        }
        var token = localStorage.getItem('token')
        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/city/deletecity/${city_id}`,
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
                    getCity()
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })
    }

    // const handleFilter = (e) => {
    //     if (e.target.value == '') {
    //         setdata(searchapidata)
    //     }
    //     else {
    //         const filterResult = searchapidata.filter(item => item.state_name.toLowerCase().includes(e.target.value.toLowerCase()))
    //             setdata(filterResult)
    //     }
    //     setFilterval(e.target.value)
    // }


    const handleSearch = (e) => {

        var token = localStorage.getItem('token')
        var city_name = e.target.value

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/city/findallcity/?page=1&limit=3&q=${city_name}`,
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
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <input type='search' placeholder='search' style={{ padding: '5px 10px', borderRadius: '5px' }} onChange={handleSearch} />
                {/* <input type='search' placeholder='search' value={filterval} onInput={(e) => handleFilter(e)} style={{ padding: '5px 10px', borderRadius: '5px' }} /> */}
                <Link to={'/addcity'}>
                    <button className="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>city_name</th>
                        <th>state_id</th>
                        <th>state_name</th>
                        <th>Action</th>
                    </tr>
                    {
                        data.map((data) =>
                            <tr>
                                <td>{data.city_name}</td>
                                <td>{data.state_id}</td>
                                <td>{data.state_name}</td>
                                <td style={{ fontSize: '24px' }}>
                                    <Link to={`/singlecity/${data.city_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                                    <Link to={`/editcity/${data.city_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                                    <MdDeleteForever onClick={() => handleDelete(data.city_id)} style={{ color: 'red' }} />
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

export default City