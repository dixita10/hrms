import React, { useState } from 'react'
import axios from 'axios';

function Home() {
  const [data, setData] = useState({
    adminname: '',
    email: '',
    contact: '',
    username: "",
    pswd: '',
  })

  console.log("data",data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    alert("....")
    e.preventDefault()
  }

  axios({
    method: 'POST',
    url: "{{URL}}/auth/register",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })


  return (
    <div>
      <form className='home_form' >
        <label>
          Admin_name :
          <input type='text' value={data.adminname} name='adminname' onChange={handleChange} />
        </label><br />
        <label>
          Email :
          <input type='text' value={data.email} name='email' onChange={handleChange} />
        </label><br />
        <label>
          Contact :
          <input type='text' value={data.contact} name='contact' onChange={handleChange} />
        </label><br />
        <label>
          User_name :
          <input type='text' value={data.username} name='username' onChange={handleChange} />
        </label><br />
        <label>
          Password :
          <input type='text' value={data.pswd} name='pswd' onChange={handleChange} />
        </label><br />
        <button type='submit' onClick={handleSubmit}> Sign Up</button>
      </form>
    </div>
  )
}

export default Home