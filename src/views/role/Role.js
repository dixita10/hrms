import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Pagination from '../attendance/Pagination';

const Role = () => {

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

  const getRole = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/role/findallrole`,
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
    getRole()
  }, [])



  const handleDelete = (role_id) => {


    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'DElETE',
      url: `${process.env.REACT_APP_URL}/role/deleterole/${role_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          getRole()
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
    var role_name = e.target.value

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/role/findallrole/?page=1&limit=3&q=${role_name}`,
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

  // console.log(data);
  return (
    <div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <input type='search' placeholder='Search Role Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
        <Link to={'/addrole'}>
          <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
        </Link>
      </div><br />
      <table className='responstable'>
        <tr>
          <th>role_name</th>
          <th>action</th>
        </tr>
        {
          visibleItems.map((data) =>
            <tr>
              <td>{data.role_name}</td>
              <td style={{ fontSize: '24px' }}>
                {/* <Link to={`/singlerole/${data.role_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link> */}
                <Link to={`/editrole/${data.role_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                <MdDeleteForever onClick={() => handleDelete(data.role_id)} style={{ color: 'red' }} />
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

export default Role