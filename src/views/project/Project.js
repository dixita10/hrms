import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Project = () => {
  const [data, setdata] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getProject = () => {
    var token = localStorage.getItem('token')

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

  return (
    <div>
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