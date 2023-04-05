import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Pagination from '../attendance/Pagination';


const City = () => {

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

    // const [filterval, setFilterval] = useState('')
    // const [searchapidata, setSearchapidata] = useState([])

    const getCity = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/city/findallcity`,
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
    }, [])



    const handleDelete = (city_id) => {

        var passData = {
            city_name: data.city_name,
            state_id: data.state_id,
        }
        var token = `Bearer ${localStorage.getItem('token')}`
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

        var token = `Bearer ${localStorage.getItem('token')}`
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
                <input type='search' placeholder='Search City Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
                {/* <input type='search' placeholder='search' value={filterval} onInput={(e) => handleFilter(e)} style={{ padding: '5px 10px', borderRadius: '5px' }} /> */}
                <Link to={'/addcity'}>
                    <button className="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
                </Link>
            </div><br />
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>city_name</th>
                        {/* <th>state_id</th> */}
                        <th>state_name</th>
                        <th>Action</th>
                    </tr>
                    {
                        visibleItems.map((data) =>
                            <tr>
                                <td>{data.city_name}</td>
                                {/* <td>{data.state_id}</td> */}
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
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default City