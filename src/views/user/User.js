import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';

const User = () => {

  const [data, setdata] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getUser = () => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/user/findalluser?page=${pageCount}&limit=5`,
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
    getUser()
  }, [pageCount])


  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPageCount(data.selected + 1)
    // let currentPage = data.selected + 1
  }

  // console.log(data);
  return (
    <div>
      <table className='responstable'>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>username</th>
          <th>city_id</th>
          <th>address</th>
          <th>birth_date</th>
          <th>age</th>
          <th>gender</th>
          <th>role_id</th>
          <th>contact</th>
          <th>image</th>
          <th>city_name</th>
          <th>role_name</th>
          <th>action</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.username}</td>
              <td>{data.city_id}</td>
              <td>{data.address}</td>
              <td>{moment(data.birth_date).format("LLL")}</td>
              <td>{data.age}</td>
              <td>{data.gender}</td>
              <td>{data.role_id}</td>
              <td>{data.contact}</td>
              <td>{data.image}</td>
              <td>{data.city_name}</td>
              <td>{data.role_name}</td>

              <td><Link to={`/singleuser/${data.user_id}`}><button type="button" className="btn btn-outline-secondary">view</button></Link></td>

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

export default User