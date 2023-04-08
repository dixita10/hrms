import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { HiPlusSm } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Pagination from '../attendance/Pagination';


const Event = () => {

  const [data, setdata] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // number of items to display per page

  const totalPages = Math.ceil(data.length / itemsPerPage);
  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = data.slice(startIndex, endIndex);

  const GetEvent = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/event/findallevent`,
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
    GetEvent()
  }, [])

  const handleDelete = (event_id) => {
    
    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'DElETE',
      url: `${process.env.REACT_APP_URL}/event/deleteevent/${event_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          GetEvent()
          toast.success(response.data.message)
        }

      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message)
      })
  }

  return (
    <div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to={'/addevent'}>
          <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
        </Link>
      </div><br />
      <div className='table-responsive'>
        <table className='responstable'>
          <tr>
            <th>event_tittle</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>description</th>
            <th>action</th>
          </tr>
          {
            visibleItems.map((data) =>
              <tr>
                <td>{data.event_tittle}</td>
                <td>{data.start_date}</td>
                <td>{data.end_date}</td>
                <td>{data.description}</td>
                <td style={{ fontSize: '24px' }}>
                  <Link to={`/editevent/${data.event_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                  <MdDeleteForever onClick={() => handleDelete(data.event_id)} style={{ color: 'red' }} />
                  {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
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

export default Event