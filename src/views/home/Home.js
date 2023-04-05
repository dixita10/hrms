import React, { useState, useEffect, useRef } from 'react'
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
import event from '../../assets/images/event.svg'
import bank from '../../assets/images/bank.svg'

import { Link } from "react-router-dom";
import axios from 'axios'
import { ImSearch } from "react-icons/im";
import { IoNotificationsSharp } from "react-icons/io5";
import { FiUserMinus, FiLock } from 'react-icons/fi'
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import { FaAngleDown } from "react-icons/fa";
import profile1 from './../../assets/images/avatars/profile.png'
// import {  } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const Home = () => {
    var role_id = localStorage.getItem("role_id")


    const handleLogout = () => {
        localStorage.removeItem("token")
    }

    const [data, setData] = useState([])
    const [data1, setData1] = useState(null)
    const [isClockedIn, setIsClockedIn] = useState()

    const [startTime, setStartTime] = useState(
        parseInt(localStorage.getItem("startTime")) || null
    );
    const [elapsedTime, setElapsedTime] = useState(
        parseInt(localStorage.getItem("elapsedTime")) || 0
    );
    const [isHovering, setIsHovering] = useState(false);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    useEffect(() => {
        let intervalId;
        if (startTime !== null) {
            intervalId = setInterval(() => {
                const elapsed = Date.now() - startTime;
                setElapsedTime(elapsed);
                localStorage.setItem("elapsedTime", elapsed.toString());
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [startTime]);



    const startStopTimer = (e) => {
        e.preventDefault()
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            remark: '',
        }
        if (startTime === null) {
            setStartTime(Date.now());
            localStorage.setItem("startTime", Date.now().toString());
            setIsCheckedIn(true);
            // setStartTime(true)

        } else {
            const elapsed = Date.now() - startTime;
            setElapsedTime(elapsed);
            setStartTime(null);
            localStorage.removeItem("startTime");
            localStorage.removeItem("elapsedTime");
            // setStartTime(false)
            setIsCheckedIn(false);

        }
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/attendance/addattendance`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    toast.success(response.data.message, {
                        position: 'top-left'
                    })
                }
            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })
    };
    // const handleMouseOver = () => {
    //     setIsHovering(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsHovering(false);
    // };

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
        const minutes = Math.floor((time / (1000 * 60)) % 60)
            .toString()
            .padStart(2, "0");
        const hours = Math.floor(time / (1000 * 60 * 60))
            .toString()
            .padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options).toUpperCase();

    const username = () => {

        var username = localStorage.getItem("username")
        // console.log(username);
        setData1(username)
    }

    const handleSearch = (event) => {

        // console.log(username);

        var token = `Bearer ${localStorage.getItem('token')}`
        var username = event.target.value

        if (event.key === 'Enter') {
            // console.log('enter press here! ')

            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_URL}/user/findalluser/?page=1&limit=3&q=${username}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    console.log("response", response);
                    setData(response.data.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    // const handleclock = (e) => {
    // e.preventDefault()
    // var token = `Bearer ${localStorage.getItem('token')}`

    // var passData = {
    //     remark: '',
    // }


    // axios({
    //     method: 'POST',
    //     url: `${process.env.REACT_APP_URL}/attendance/addattendance`,
    //     data: passData,
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: token,
    //         Accept: "application/json",
    //     },
    // })
    //     .then((response) => {
    //         // console.log(response);
    //         if (response.status === 200) {
    //             toast.success(response.data.message)
    //         }
    //     })
    // .catch((error) => {
    //     // console.log(error);
    //     toast.error(error.response.data.message)
    // })
    // }

    useEffect(() => {
        username()
    }, [])





    return (
        <div>
            <div className='Homeheader'>
                <div className=' d-flex'>
                    <div className='col-2 homeimg'>
                        <img src={homeheader} alt="homeheader" style={{ width: '140px', marginLeft: '5%' }} />
                    </div>
                    <div className='col-2'>
                        <p style={{ color: 'white', fontSize: '30px', marginTop: '30px' }}>Hi {data1}!</p>
                    </div>
                    <div className='col-4 d-flex' style={{ marginTop: '30px', marginLeft: '-30px' }}>
                        <input type='search' placeholder='Search Employess' style={{
                            color: 'white',
                            padding: "10px 15px 10px 15px",
                            borderTopLeftRadius: "8px",
                            borderBottomLeftRadius: '8px',
                            width: "60%",
                            backgroundColor: "black",
                            border: "1px solid white",
                            fontSize: '20px',
                            height: '46px'
                        }} onKeyPress={handleSearch} />
                        <div className='homesearchbac'>
                            <ImSearch className='homesearch' />
                        </div>
                    </div>
                    <div className='col-3 clock_out d-flex' style={{ marginLeft: '-30px' }}>
                        <div className="clock-buttons-container">
                            <p style={{
                                color: 'white', marginTop: "11px", marginBottom: "6px", fontWeight: 500, fontSize: '14px'
                            }}>{currentDate}</p>
                            {/* <button
                                className={isClockedIn ? "clock-in-btn" : "web-clock-in-btn"}
                                onClick={startStopTimer}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className={isClockedIn ? "Clock-in-text" : ""}>
                                    {isClockedIn ? "CLOCKED IN" : "WEB CLOCK-IN"}
                                </span>
                                <br />
                                {isClockedIn ? ` ${formatTime(elapsedTime)}` : ""}
                                {isHovering && isClockedIn && (
                                    <button className="web-clock-out-btn" onClick={startStopTimer}>
                                        WEB CLOCK-OUT
                                    </button>
                                )}
                            </button> */}
                            {/* <div>
                                <button
                                    className={startTime === null ? "web-clock-in-btn" : "clock-in-btn"}
                                    onClick={startStopTimer}
                                    onMouseOver={handleMouseOver}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <span className={startTime === null ? "" : "Clock-in-text"}>
                                        {startTime === null ? "WEB CLOCK-IN" : isCheckedIn ? "CLOCKED IN" : "CLOCKED OUT"}
                                    </span>
                                    <br /> {startTime === null ? "" : ` ${formatTime(elapsedTime)}`}
                                </button>
                                {isHovering && isCheckedIn && (
                                    <button className="web-clock-out-btn" onClick={startStopTimer}>
                                        WEB CLOCK-OUT
                                    </button>
                                )}
                            </div> */}
                            <button onClick={startStopTimer} className={startTime === null ? "web-clock-in-btn" : "clock-in-btn"}>
                                <span className={startTime === null ? "" : "Clock-in-text"}>
                                    {startTime === null ? "Web clock-in" : "Clock in"}
                                </span>
                                <br />{startTime === null ? "" : ` ${formatTime(elapsedTime)}`}
                            </button>

                        </div>

                        <IoNotificationsSharp style={{ color: 'white' }} className='notificationhome' />
                        <CDropdown variant="nav-item" className='settinghome'>
                            <CDropdownToggle placement="bottom-end" className="py-0" caret={false} style={{ color: 'white', fontSize: '30px' }}>
                                <FaAngleDown style={{ color: 'white', fontSize: '30px', position: 'relative', top: '6px' }} />
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">

                                {/* <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader> */}
                                <CDropdownItem href="/login " onClick={handleLogout}>
                                    <FiUserMinus className="me-2" />
                                    File Manager
                                </CDropdownItem>
                                <CDropdownItem href="/login " onClick={handleLogout}>
                                    <FiUserMinus className="me-2" />
                                    Logout
                                </CDropdownItem>
                                <CDropdownItem href="/resetpswd " onClick={handleLogout}>
                                    <FiLock className="me-2" />
                                    Reset Password
                                </CDropdownItem>
                                profile
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                </div>
            </div>
            {role_id === "3" ? (
                <div>
                    <div className='container' style={{ marginTop: "6%" }}>
                        <div className='row homeiconpart'>
                            <div className='col col-md-3 px-4'>
                                <Link to='/loggeduser'>
                                    <div className='iconhome'>
                                        <img src={profile} alt="profileicon" style={{ width: '70px' }} />
                                    </div>
                                    <p>Profile</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/attendance'>
                                    <div className='iconhome'>
                                        <img src={attendance} alt="attendanceicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Attendance</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/department'>
                                    <div className='iconhome'>
                                        <img src={department} alt="departmenticon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Department</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/country'>
                                    <div className='iconhome'>
                                        <img src={country} alt="countryicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Country</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row homeiconpart'>
                            <div className='col col-md-3 px-4'>
                                <Link to='/state'>
                                    <div className='iconhome'>
                                        <img src={state} alt="stateicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >State</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/city'>
                                    <div className='iconhome'>
                                        <img src={city} alt="cityicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >City</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/project'>
                                    <div className='iconhome'>
                                        <img src={project} alt="projecticon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Project</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/role'>
                                    <div className='iconhome'>
                                        <img src={role} alt="roleicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Role</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row homeiconpart '>
                            <div className='col col-md-3 px-4' >
                                <Link to='/salary'>
                                    <div className='iconhome'>
                                        <img src={salary} alt="salaryicon" style={{ width: '75px' }} />
                                    </div>
                                    <p >Salary</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4' >
                                <Link to='/technology'>
                                    <div className='iconhome'>
                                        <img src={technology} alt="technologyicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Technology</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4' >
                                <Link to='/user'>
                                    <div className='iconhome'>
                                        <img src={users} alt="usersicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Users</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/event'>
                                    <div className='iconhome'>
                                        <img src={event} alt="usersicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Events</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row homeiconpart '>
                            <div className='col col-md-12 px-4' >
                                <Link to='/bankdetail'>
                                    <div className='iconhome'>
                                        <img src={bank} alt="salaryicon" style={{ width: '75px' }} />
                                    </div>
                                    <p >Bank Detail</p>
                                </Link>
                            </div>
                            {/* <div className='col col-md-3 px-4' >
                                <Link to='/technology'>
                                    <div className='iconhome'>
                                        <img src={technology} alt="technologyicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Technology</p>
                                </Link>
                            </div> */}
                            {/* <div className='col col-md-3 px-4' >
                                <Link to='/user'>
                                    <div className='iconhome'>
                                        <img src={users} alt="usersicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Users</p>
                                </Link>
                            </div> */}
                            {/* <div className='col col-md-3 px-4'>
                                <Link to='/event'>
                                    <div className='iconhome'>
                                        <img src={event} alt="usersicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Events</p>
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>) :
                <div className='container' style={{ marginTop: "6%" }}>
                    <div className='row homeiconpart'>
                        <div className='col col-md-3 px-4'>
                            <Link to='/loggeduser'>
                                <div className='iconhome'>
                                    <img src={profile} alt="profileicon" style={{ width: '70px' }} />
                                </div>
                                <p>Profile</p>
                            </Link>
                        </div>
                        <div className='col col-md-3 px-4'>
                            <Link to='/attendance'>
                                <div className='iconhome'>
                                    <img src={attendance} alt="attendanceicon" style={{ width: '70px' }} />
                                </div>
                                <p >Attendance</p>
                            </Link>
                        </div>
                        <div className='col col-md-3 px-4' >
                            <Link to='/salary'>
                                <div className='iconhome'>
                                    <img src={salary} alt="salaryicon" style={{ width: '75px' }} />
                                </div>
                                <p >Salary</p>
                            </Link>
                        </div>
                        {/* <div className='col col-md-3 px-4'>
                            <Link to='/country'>
                                <div className='iconhome'>
                                    <img src={country} alt="countryicon" style={{ width: '70px' }} />
                                </div>
                                <p >Country</p>
                            </Link>
                        </div> */}
                    </div>
                </div>
            }
            <ToastContainer autoClose={2000}
            />
        </div >
    )
}

export default Home