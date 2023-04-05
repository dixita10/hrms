import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { HiPlusSm } from "react-icons/hi";
import Pagination from '../attendance/Pagination';


const User = () => {

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

  const getUser = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/user/findalluser`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        setdata(response.data.data)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleDelete = (user_id) => {

    var passData = {
      name: data.role_name,
      email: data.email,
      username: data.username,
      password: data.password,
      city_id: data.city_id,
      address: data.address,
      birth_date: data.birth_date,
      age: data.age,
      gender: data.gender,
      user_id: data.role_id,
      contact: data.contact,
      image: data.image,
    }

    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'DElETE',
      url: `${process.env.REACT_APP_URL}/user/deleteuser/${user_id}`,
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
          getUser()
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
    var username = e.target.value


    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/user/findalluser/?page=1&limit=3&q=${username}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {

        if (response.status === 200) {
          setdata(response.data.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  return (
    <div className='table-responsive'>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <input type='search' placeholder='Search User Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
        <Link to={'/adduser'}>
          <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
        </Link>
      </div><br />
      <table className='responstable'>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>username</th>
          {/* <th>city_id</th> */}
          <th>address</th>
          <th>birth_date</th>
          <th>age</th>
          <th>gender</th>
          {/* <th>role_id</th> */}
          <th>contact</th>
          <th>image</th>
          <th>city_name</th>
          <th>role_name</th>
          <th>action</th>
        </tr>
        {
          visibleItems.map((data) =>
            <tr>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.username}</td>
              {/* <td>{data.city_id}</td> */}
              <td>{data.address}</td>
              <td>{moment(data.birth_date).format("MMMM Do YYYY")}</td>
              <td>{data.age}</td>
              <td>{data.gender}</td>
              {/* <td>{data.role_id}</td> */}
              <td>{data.contact}</td>
              <td>{data.image}</td>
              <td>{data.city_name}</td>
              <td>{data.role_name}</td>
              <td style={{ fontSize: '24px', textAlign: 'left' }}>
                <Link to={`/singleuser/${data.user_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                <Link to={`/edituser/${data.user_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                <MdDeleteForever onClick={() => handleDelete(data.user_id)} style={{ color: 'red' }} />
                {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
              </td>

              {/* <td><Link to={`/singleuser/${data.user_id}`}><button type="button" className="btn btn-outline-secondary">view</button></Link></td> */}

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

export default User