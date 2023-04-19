import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Attendancedailyuser = () => {

  const [data, setData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSearch = (date) => {
    var token = `Bearer ${localStorage.getItem('token')}`
    // var date = e.target.value

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/reporting/allinterndailyattendance?date=${date}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          setData(response.data.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handlePrevious = () => {
    const newDate = new Date(selectedDate.getTime())
    newDate.setDate(selectedDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(selectedDate.getTime())
    newDate.setDate(selectedDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  useEffect(() => {
    handleSearch(selectedDate.toISOString().slice(0, 10))
  }, [selectedDate])


  return (
    <div>
      <div className='datedaily'>
        <button className="btn btn-link btndaily" onClick={handlePrevious}>Previous ... </button>
        <DatePicker selected={selectedDate} onChange={handleDateChange} style={{ padding: '5px' }} className='datepick' />

        <button className="btn btn-link btndaily" onClick={handleNext}>... Next</button>
      </div><br />
      <table className='responstable'>
        <tr>
          <th>user id</th>
          <th>intime</th>
          <th>outtime</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.user_id}</td>
              <td>{data.intime}</td>
              <td>{data.outtime}</td>
            </tr>
          )
        }
      </table>
    </div>
  )
}

export default Attendancedailyuser