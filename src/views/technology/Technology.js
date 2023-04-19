import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Pagination from '../attendance/Pagination';


const Technology = () => {

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

  const getTechnology = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/technology/findalltechnology`,
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
    getTechnology()
  }, [])

  const handleDelete = (tec_id) => {


    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'DElETE',
      url: `${process.env.REACT_APP_URL}/technology/deletetechnology/${tec_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          getTechnology()
          toast.success(response.data.message)
        }

      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message)
      })
  }

  const handleSearch = (e) => {

    var token = `Bearer ${localStorage.getItem('token')}`
    var tec_name = e.target.value

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/technology/findalltechnology/?page=1&limit=3&q=${tec_name}`,
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
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <input type='search' placeholder='Search Technology Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
        <Link to={'/addtech'}>
          <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
        </Link>
      </div><br />
      <table className='responstable'>
        <tr>
          <th>technology name</th>
          {/* <th>dep_id</th> */}
          <th>department name</th>
          <th>action</th>
        </tr>
        {
          visibleItems.map((data) =>
            <tr>
              <td>{data.tec_name}</td>
              {/* <td>{data.dep_id}</td> */}
              <td>{data.dep_name}</td>
              <td style={{ fontSize: '24px' }}>
                {/* <Link to={`/singletech/${data.tec_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link> */}
                <Link to={`/edittech/${data.tec_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                <MdDeleteForever onClick={() => handleDelete(data.tec_id)} style={{ color: 'red' }} />
                {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
              </td>
            </tr>
          )
        }
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Technology