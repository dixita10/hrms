import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HiPlusSm } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";


const Salary = () => {

  const [data, setdata] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getSalary = () => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/salary/findallsalary?page=${pageCount}&limit=5`,
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
    getSalary()
  }, [pageCount])



  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPageCount(data.selected + 1)
    // let currentPage = data.selected + 1
  }

  const handleDelete = (salary_id) => {

    var passData = {
      user_id: data.user_id,
      salary: data.salary,
      bank_detail: data.bank_detail,
      username: data.username,

    }
    var token = localStorage.getItem('token')
    axios({
      method: 'DElETE',
      url: `${process.env.REACT_APP_URL}/salary/deletesalary/${salary_id}`,
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
          getSalary()
          toast.success(response.data.message)
        }

      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message)
      })
  }


  console.log(data);
  return (
    <div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to={'/addsalary'}>
          <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
        </Link>
      </div>
      <table className='responstable'>
        <tr>
          <th>user_id</th>
          <th>salary</th>
          <th>bank_detail</th>
          <th>username</th>
          <th>action</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.user_id}</td>
              <td>{data.salary}</td>
              <td>{data.bank_detail}</td>
              <td>{data.username}</td>
              <td style={{ fontSize: '24px' }}>
                <Link to={`/singlesalary/${data.salary_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
                <Link to={`/editsalary/${data.salary_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
                <MdDeleteForever onClick={() => handleDelete(data.salary_id)} style={{ color: 'red' }} />
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

export default Salary