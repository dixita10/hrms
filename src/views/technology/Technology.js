import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";



const Technology = () => {

  const [data, setdata] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getTechnology = () => {
    var token = `Bearer ${localStorage.getItem('token')}`

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/technology/findalltechnology?page=${pageCount}&limit=5`,
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
  }, [pageCount])



  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPageCount(data.selected + 1)
    // let currentPage = data.selected + 1
  }

  const handleDelete = (tec_id) => {

    var passData = {
      tec_name: data.tec_name,
      dep_id: data.dep_id,
      department_name: data.department_name,

    }
    var token = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'DElETE',
      url: `${process.env.REACT_APP_URL}/technology/deletetechnology/${tec_id}`,
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
        <input type='search' placeholder='search' style={{ padding: '5px 10px', borderRadius: '5px' }} onChange={handleSearch} />
        <Link to={'/addtech'}>
          <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
        </Link>
      </div>
      <table className='responstable'>
        <tr>
          <th>tec_name</th>
          <th>dep_id</th>
          <th>department name</th>
          <th>action</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.tec_name}</td>
              <td>{data.dep_id}</td>
              <td>{data.department_name}</td>
              <td style={{ fontSize: '24px' }}>
                <Link to={`/singletech/${data.tec_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                <Link to={`/edittech/${data.tec_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                <MdDeleteForever onClick={() => handleDelete(data.tec_id)} style={{ color: 'red' }} />
                {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
              </td>
            </tr>
          )
        }
      </table>
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

export default Technology