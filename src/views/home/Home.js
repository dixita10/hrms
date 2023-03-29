import React from 'react'
import homeheader from '../../assets/images/HRMS-Logo.webp'
import profile from '../../assets/images/profile.svg'
import attendance from '../../assets/images/attendance.svg'
import department from '../../assets/images/department.svg'
import country from '../../assets/images/country.svg'
import city from '../../assets/images/city.svg'
import state from '../../assets/images/state.svg'
import role from '../../assets/images/role.svg'
import salary from '../../assets/images/salary.svg'
import users from '../../assets/images/users.svg'
import project from '../../assets/images/project.svg'
import technology from '../../assets/images/technology.svg'

const Home = () => {
    return (
        <div>
            <div className='col Home'>
                <div className='header'>
                    <img src={homeheader} alt="homeheader" style={{ width: '140px', marginLeft: '10%' }} />
                </div>
            </div>

            <div className='container' style={{ marginTop: "8%" }}>
                <div className='row homeiconpart'>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={profile} alt="profileicon" style={{ width: '70px' }} />
                        </div>
                        <span>Profile</span>
                    </div>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={attendance} alt="attendanceicon" style={{ width: '70px' }} />
                        </div>
                        <span>Attendance</span>
                    </div>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={department} alt="departmenticon" style={{ width: '70px' }} />
                        </div>
                        <span>Department</span>
                    </div>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={country} alt="countryicon" style={{ width: '70px' }} />
                        </div>
                        <span>Country</span>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row homeiconpart'>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={state} alt="stateicon" style={{ width: '80px' }} />
                        </div>
                        <span>State</span>
                    </div>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={city} alt="cityicon" style={{ width: '80px' }} />
                        </div>
                        <span>City</span>
                    </div>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={project} alt="projecticon" style={{ width: '80px' }} />
                        </div>
                        <span>Project</span>
                    </div>
                    <div className='col col-md-3 px-5'>
                        <div className='iconhome'>
                            <img src={role} alt="roleicon" style={{ width: '80px' }} />
                        </div>
                        <span>Role</span>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row homeiconpart '>
                    <div className='col col-md-2' style={{ paddingLeft: '20px', paddingRight: '40px' }}>
                        <div className='iconhome'>
                            <img src={salary} alt="salaryicon" style={{ width: '80px' }} />
                        </div>
                        <span>Salary</span>
                    </div>
                    <div className='col col-md-2' style={{ paddingLeft: '70px', paddingRight: '150px' }}>
                        <div className='iconhome'>
                            <img src={technology} alt="technologyicon" style={{ width: '80px' }} />
                        </div>
                        <span>Technology</span>
                    </div>
                    <div className='col col-md-2' style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <div className='iconhome'>
                            <img src={users} alt="usersicon" style={{ width: '80px' }} />
                        </div>
                        <span>Users</span>
                    </div>
                    <div className='col col-md-6 px-5'></div>
                </div>
            </div>
        </div>
    )
}

export default Home