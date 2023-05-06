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
import compny from '../../assets/images/company.svg'
import leave from "../../assets/images/leave.svg"
import notification from "../../assets/images/notification.svg"
import Notificationprofile from "../../assets/images/notificationprofile.svg"
import Managerdirectory from "../../assets/images/mangerdirectory.svg"
import Assignuser from "../../assets/images/assignuser.svg"

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
// import { IoNotificationsSharp } from 'react-icons/io5';
import { HiOutlineMail, HiOutlineMailOpen, HiOutlineMenu } from "react-icons/hi";
import Profile from "../../assets/images/profile.svg"
import { useHistory } from 'react-router-dom';
import { AiOutlineFileAdd } from "react-icons/ai";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const Home = () => {

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

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


    const handleNotification = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/notification/unreadnotification`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response.data.data);
                if (response.status === 200) {
                    setNotifications(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };


    // const handleNotificationClick = (not_id) => {
    //     const updatedNotifications = notifications.map((notification) => {
    //         if (notification.not_id === not_id) {
    //             return {
    //                 ...notification,
    //                 seen: true,
    //             };
    //         }
    //         return notification;
    //     });
    //     setShowNotifications(!showNotifications);
    //     localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

    //     // Remove the clicked notification from local storage
    //     const storedNotifications = JSON.parse(localStorage.getItem('notifications'));
    //     const filteredNotifications = storedNotifications.filter((notification) => notification.not_id !== not_id);
    //     localStorage.setItem('notifications', JSON.stringify(filteredNotifications));

    //     setNotifications(updatedNotifications);
    // };

    // const deleteNotification = (not_id) => {
    //     const updatedNotifications = notifications.filter((notification) => notification.not_id !== not_id);
    //     setNotifications(updatedNotifications);

    //     // Update the notifications in local storage
    //     localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    // };

    useEffect(() => {
        handleNotification()
    }, [])


    const handleread = (not_id) => {
        // console.log(not_id);
        var token = `Bearer ${localStorage.getItem('token')}`

        var passData = {
            not_id: ''
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/notification/updatenotification/${not_id}`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response.data.data);
                if (response.status === 200) {
                    toast.success(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }

    const NotificationBox = ({ notifications }) => {
        const history = useHistory();

        const handleNotificationClick = (notifications) => {
            switch (notifications.type) {
                case 'leave':
                    history.push('/leave');
                    break;
                case 'project':
                    history.push('/project');
                    break;
                case 'event':
                    history.push('/event');
                    break;
                default:
                    break;
            }
        };

        return (
            <div className='notificationBox'>
                <ul >
                    <p style={{ fontSize: '16px', fontWeight: 600, padding: '10px 0 0 15px' }}>Notifications</p>
                    {notifications.map((notification) => (
                        <li
                            key={notification.not_id}
                            onClick={() => handleNotificationClick(notification)}
                            style={{ cursor: 'pointer', backgroundColor: '#EFFBFF' }}
                        >
                            {/* <li>{notification.type}</li> */}
                            <div >
                                <button type="button" class="btn btn-link d-flex" onClick={() => handleread(notification.not_id)}>
                                    <img src={Notificationprofile} style={{ width: '35px', margin: '0 8px' }} />
                                    <li style={{ fontSize: '14px', color: 'black' }}>{notification.message}</li>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <Link to='/notification'>
                    <button type="button" class="btn btn-primary NOTIFICATIONBTN">SEE ALL NOTIFICATIONS</button>
                </Link>
            </div>
        );
    };

    const [count, setCount] = useState(0);

    const handleCount = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/notification/countnotification`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response?.data.data[0].count);
                if (response.status === 200) {
                    setCount(response?.data.data[0].count)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        handleCount()
    })

    // const NotificationBox = ({ notifications }) => {

    //     const history = useHistory();

    //     const handleNotificationClick = (notifications) => {
    //         if (notifications.type === 'leave') {
    //             history.push('/leave');
    //         } else {
    //             history.push('/project');
    //         }
    //     };



    //     return (
    //         <div className='notificationBox'>
    //             <ul>
    //                 <p style={{ fontSize: '14px', fontWeight: 600 }}>Notifications</p>
    //                 {notifications.map((notification) => (
    //                     <li key={notification.not_id} onClick={() => handleNotificationClick(notification)}
    //                         style={{
    //                             cursor: 'pointer',
    //                         }}>
    //                         <li>{notification.type}</li>
    //                         <div className='d-flex'>
    //                             <img src={Profile} style={{ width: '20px', margin: "0 8px" }} />
    //                             <li style={{ fontSize: '13px' }}> {notification.message}</li>
    //                         </div>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     );
    // };


    // function NotificationBox() {
    //     // Retrieve the notifications from local storage when the component mounts
    //     const [notifications, setNotifications] = useState(
    //         JSON.parse(localStorage.getItem('notifications')) || []
    //     );

    //     return (
    //         <div className="notificationBox">
    //             <ul>
    //                 <p style={{ fontSize: '14px', fontWeight: 600 }}>Notifications</p>
    //                 {notifications.map((notification) => (
    //                     <li
    //                         key={notification.not_id}
    // style={{
    //     color: notification.seen ? 'red' : 'blue',
    //     display: 'flex',
    //     alignItems: 'center',
    //     marginBottom: '8px',
    //     cursor: 'pointer',
    // }}
    //                         onClick={() => handleNotificationClick(notification.not_id)}
    //                     >
    //                         <div style={{ display: 'flex' }}>
    //                             {notification.seen ? <HiOutlineMailOpen style={{ marginRight: '8px' }} /> : <HiOutlineMail style={{ marginRight: '8px' }} />}
    //                             {/* <span style={{ fontSize: '12px' }}>{notification.type}</span><br /> */}
    //                             <span style={{ fontSize: '13px' }}>{notification.message}</span>
    //                         </div>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     );
    // }


    // const handleNotificationClick = (not_id) => {
    //     const updatedNotifications = notifications.map(notification => {
    //         if (notification.not_id === not_id) {
    //             return {
    //                 ...notification,
    //                 seen: true,
    //             };
    //         }
    //         return notification;
    //     });
    //     setNotifications(updatedNotifications);
    //     setShowNotifications(!showNotifications);

    //     // deleteNotification(not_id);
    // };

    // const deleteNotification = (not_id) => {
    //     const updatedNotifications = notifications.filter(notification => notification.not_id !== not_id);
    //     setNotifications(updatedNotifications);
    // };


    // function NotificationBox({ notifications }) {
    //     return (
    // <div className='notificationBox'>
    //     <ul>
    //         <p style={{ fontSize: '14px', fontWeight: 600 }}>Notifications</p>
    //         {notifications.map((notification) => (
    //             <li key={notification.not_id} style={{
    //                 color: notification.seen ? 'red' : 'blue',
    //             }} onClick={() => handleNotificationClick(notification.not_id)}>
    //                 <li>{notification.type}</li>
    //                 <div className='d-flex'>
    //                     <img src={Profile} style={{ width: '20px', margin: "0 8px" }} />
    //                     <li style={{ fontSize: '13px' }}> {notification.message}</li>
    //                 </div>
    //             </li>
    //         ))}
    //     </ul>
    // </div>
    //     );
    // }
    const history = useHistory();



    return (
        <div>
            <div className='Homeheader row'>
                <div className="d-lg-flex d-sm-block justify-content-center">
                    <div className='col-lg-2 homeimg text-center'>
                        <HiOutlineMenu className="togleerhome" />
                        <img src={homeheader} alt="homeheader" className='homelogoimage' />
                    </div>
                    <div className='col-lg-2 text-center'>
                        <p className="homename" >Hi {data1}!</p>
                    </div>
                    <div className='col-lg-3 d-flex justify-content-center' style={{ marginTop: '25px' }}>
                        <input type='search' placeholder='Search Employess' className="homesearchinp" onKeyPress={handleSearch} />
                        <div className='homesearchbac'>
                            <ImSearch className='homesearch' />
                        </div>
                    </div>
                    <div className='col-lg-3 clock_out d-flex justify-content-center' >
                        <div className="clock-buttons-container">
                            <p style={{
                                color: 'white', marginTop: "11px", marginBottom: "6px", fontWeight: 500, fontSize: '14px'
                            }}>{currentDate}</p>

                            <button onClick={startStopTimer} className={startTime === null ? "web-clock-in-btn" : "clock-in-btn"}>
                                <span className={startTime === null ? "" : "Clock-in-text"}>
                                    {startTime === null ? "Web clock-in" : "Clock in"}
                                </span>
                                <br />{startTime === null ? "" : ` ${formatTime(elapsedTime)}`}
                            </button>

                        </div>
                        <IoNotificationsSharp onClick={() => setShowNotifications(!showNotifications)} style={{ color: 'white', cursor: 'pointer' }} className='notificationhome' />
                        {showNotifications && (
                            <NotificationBox notifications={notifications} />
                        )}
                        <button className={`notification-count ${count > 0 ? 'show' : ''}`}>
                            {count > 0 && <p>{count}</p>}
                        </button>


                        <CDropdown variant="nav-item" className='settinghome'>
                            <CDropdownToggle placement="bottom-end" className="py-0" caret={false} style={{ color: 'white', fontSize: '30px' }}>
                                <FaAngleDown style={{ color: 'white', fontSize: '30px', position: 'relative', top: '6px' }} />
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">

                                <CDropdownItem href="/filemanager ">
                                    <AiOutlineFileAdd className="me-2" />
                                    File Manager
                                </CDropdownItem>
                                <CDropdownItem href="/login " onClick={handleLogout}>
                                    <FiUserMinus className="me-2" />
                                    Logout
                                </CDropdownItem>
                                <CDropdownItem href="/resetpswd ">
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
                    <div className='container1' style={{ marginTop: "3%" }}>
                        <div className='row homeiconpart'>
                            <div className='col col-md-3 px-4'>
                                <Link to='/companyprofile'>
                                    <div className='iconhome'>
                                        <img src={compny} alt="profileicon" style={{ width: '70px' }} />
                                    </div>
                                    <p>Company Profile</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/loggeduser'>
                                    <div className='iconhome'>
                                        <img src={profile} alt="profileicon" style={{ width: '70px' }} />
                                    </div>
                                    <p>My Profile</p>
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

                        </div>
                    </div>
                    {/* <div className='container1'>
                        <div className='row homeiconpart'>
                            <div className='col col-md-3 px-4'>
                                <Link to='/country'>
                                    <div className='iconhome'>
                                        <img src={country} alt="countryicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Country</p>
                                </Link>
                            </div>
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

                        </div>
                    </div> */}
                    <div className='container1'>
                        <div className='row homeiconpart '>
                            <div className='col col-md-3 px-4'>
                                <Link to='/role'>
                                    <div className='iconhome'>
                                        <img src={role} alt="roleicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Role</p>
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
                                    <p >Directory</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className='container1'>
                        <div className='row homeiconpart '>
                            <div className='col col-md-3 px-4'>
                                <Link to='/event'>
                                    <div className='iconhome'>
                                        <img src={event} alt="usersicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Events</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4' >
                                <Link to='/bankdetail'>
                                    <div className='iconhome'>
                                        <img src={bank} alt="salaryicon" style={{ width: '75px' }} />
                                    </div>
                                    <p >Bank Detail</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4' >
                                <Link to='/Leave'>
                                    <div className='iconhome'>
                                        <img src={leave} alt="leaveicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Leave</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4' >
                                <Link to='/notification'>
                                    <div className='iconhome'>
                                        <img src={notification} alt="notificationicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Notification</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className='container1'>
                        <div className='row homeiconpart '>
                            <div className='col col-md-6 px-4'>
                                <Link to='/attendanceuser'>
                                    <div className='iconhome'>
                                        <img src={Assignuser} alt="assignusericon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Assign Intern</p>
                                </Link>
                            </div>
                            <div className='col col-md-6 px-4'>
                                <Link to='/project'>
                                    <div className='iconhome'>
                                        <img src={project} alt="projecticon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Project</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>) : (<div>
                    <div className='container1' style={{ marginTop: "6%" }}>
                        <div className='row homeiconpart'>
                            <div className='col col-md-3 px-4'>
                                <Link to='/companyprofile'>
                                    <div className='iconhome'>
                                        <img src={compny} alt="profileicon" style={{ width: '70px' }} />
                                    </div>
                                    <p>Company Profile</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4'>
                                <Link to='/loggeduser'>
                                    <div className='iconhome'>
                                        <img src={profile} alt="profileicon" style={{ width: '70px' }} />
                                    </div>
                                    <p>My Profile</p>
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
                        </div>
                    </div>
                    <div className='container1'>
                        <div className='row homeiconpart '>

                            <div className='col col-md-3 px-4' >
                                <Link to='/Leave'>
                                    <div className='iconhome'>
                                        <img src={leave} alt="leaveicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Leave</p>
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
                                <Link to='/event'>
                                    <div className='iconhome'>
                                        <img src={event} alt="usersicon" style={{ width: '70px' }} />
                                    </div>
                                    <p >Events</p>
                                </Link>
                            </div>
                            <div className='col col-md-3 px-4' >
                                <Link to='/bankdetail'>
                                    <div className='iconhome'>
                                        <img src={bank} alt="salaryicon" style={{ width: '75px' }} />
                                    </div>
                                    <p >Bank Detail</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>)}

            <ToastContainer autoClose={2000}
            />
        </div >
    )
}

export default Home