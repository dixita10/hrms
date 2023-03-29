import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { HiPlusSm } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Project = () => {
  const [data, setdata] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getProject = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/project/findallproject?page=${pageCount}&limit=5`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("response", response);
        // setdata(response.data.data)
      })
  }

  useEffect(() => {
    getProject()
  }, [pageCount])

  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPageCount(data.selected + 1)
    // let currentPage = data.selected + 1
  }

  const handleDelete = (pro_id) => {

    var passData = {
      user_id: data.user_id,
      pro_name: data.pro_name,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      description: data.description,
      tec_id: data.tec_id,
    }
    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'DElETE',
      url: `${process.env.REACT_APP_URL}/project/deleteproject/${pro_id}`,
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
          getProject()
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
        <Link to={'/addproject'}>
          <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='responstable'>
          <tr>
            <th>user_id</th>
            <th>pro_name</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>status</th>
            <th>description</th>
            <th>tec_id</th>
            <th>action</th>
          </tr>
          {
            data.map((data) =>
              <tr>
                <td>{data.user_id}</td>
                <td>{data.pro_name}</td>
                <td>{moment(data.start_date).format("LLL")}</td>
                <td>{moment(data.end_date).format("LLL")}</td>
                <td>{data.status}</td>
                <td>{data.description}</td>
                <td>{data.tec_id}</td>
                <td style={{ fontSize: '24px' }}>
                  <Link to={`/singlecity/${data.pro_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                  <Link to={`/editcity/${data.pro_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                  <MdDeleteForever onClick={() => handleDelete(data.pro_id)} style={{ color: 'red' }} />
                  {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
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

export default Project