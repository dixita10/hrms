import React from 'react'
import { Link } from 'react-router-dom'

const UserAttendance = () => {




  return (
    <div className='container'>
      <div className='userbox d-flex'>
        <Link>
          <div className='userheading'>
            Daily Log
          </div>
        </Link>
        <Link>
          <div className='userheading'>
            Monthly Log
          </div>
        </Link>
      </div>
    </div>
  )
}

export default UserAttendance