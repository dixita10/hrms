import React, { useState, useEffect } from 'react'
import axios from 'axios';
import profile from "../../assets/images/avatars/profile.png"
import Notificationprofile from "../../assets/images/notificationprofile.svg"
import moment from 'moment';
import phoneicon from "../../assets/images/phoneicon.svg"
import emailicon from "../../assets/images/emailicon.svg"
import { HiMail, HiMailOpen } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import Information from "../../assets/images/infonotification.svg"

const Notification = () => {

    var history = useHistory();

    const [notifications, setNotifications] = useState([]);

    const handleNotification = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/notification/findallnotification`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log("response", response.data.data);
                    setNotifications(response.data.notification)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        handleNotification()
    }, [])

    const [data, setdata] = useState([])

    const LoggedUser = () => {

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/userlogin/loggedUser`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log("response", response.data.user.username);
                if (response.status === 200) {
                    var username = response.data.user.username
                    localStorage.setItem('username', username)
                    setdata(response.data.user)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        LoggedUser()
    }, [])

    const handleDelnotification = (not_id) => {
        // console.log(not_id);
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'DElETE',
            url: `${process.env.REACT_APP_URL}/notification/deletenotification/${not_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    handleNotification();
                    // LoggedUser();
                    toast.success(response.data.message)
                }

            })
            .catch((error) => {
                // console.log(error);
                toast.error(error.response.data.message)
            })

    }

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
                    handleNotification()
                    toast.success(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }

    // const [selectAll, setSelectAll] = useState(false);

    // const handleSelectAll = (event) => {
    //     const { checked } = event.target;
    //     setSelectAll(checked);

    //     const checkboxes = document.querySelectorAll('.notification-checkbox');
    //     checkboxes.forEach((checkbox) => {
    //         checkbox.checked = checked;
    //     });
    // };

    // const handleCheckboxChange = (event) => {
    //     const { checked } = event.target;

    //     // Check if all checkboxes are checked
    //     const checkboxes = document.querySelectorAll('.notification-checkbox');
    //     const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);

    //     // Update "Select All" checkbox state
    //     if (selectAll !== allChecked) {
    //         setSelectAll(allChecked);
    //     }
    // }

    const [selectAll, setSelectAll] = useState(false);
    const [anySelected, setAnySelected] = useState(false);
    const [selectedNotifications, setSelectedNotifications] = useState([]);


    const handleSelectAll = (event) => {
        const { checked } = event.target;
        setSelectAll(checked);

        const checkboxes = document.querySelectorAll('.notification-checkbox');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = checked;
        });
        setAnySelected(checked);

        if (checked) {
            setSelectedNotifications([...notifications]);
        } else {
            setSelectedNotifications([]);
        }

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/notification/countnotallification`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data?.notifications[0]?.count);
                if (response.status === 200) {
                    // setAllcount(response.data?.notifications[0]?.count)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    // const handleCheckboxChange = (event) => {
    //     const { checked } = event.target;

    //     // Check if any checkboxes are checked
    //     const checkboxes = document.querySelectorAll('.notification-checkbox');
    //     const anyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);

    //     // Update "Select All" and "anySelected" checkbox state
    //     setSelectAll(anyChecked);
    //     setAnySelected(anyChecked);
    // }

    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)

    const closeModal = () => {
        setShowModal(false);
    }

    const deletemodel = () => {
        setDeleteModal(false);
    }

    const handleMarkasseen = () => {

        if (!anySelected) {
            setShowModal(true);
            return;
        }

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/notification/readallnotification`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    handleNotification()
                    toast.success(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }

    const handleAlldeldete = () => {

        if (!anySelected) {
            setDeleteModal(true)
            return;
        }
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/notification/deleteallnotification`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    handleNotification()
                    toast.success(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }


    return (
        <div>
            <div className='d-flex'>
                <div style={{ marginRight: '20px', marginTop: '20px' }}>
                    <img src={profile} style={{ width: '150px' }} />
                    <h6 style={{ marginTop: '15px', textAlign: 'center' }}>{data.dep_name}</h6>
                    <div style={{ marginTop: '15px', textAlign: 'center' }}><img src={phoneicon} style={{ width: '15px', marginRight: '5px' }} />{data.contact}</div>
                    <div style={{ marginTop: '5px', textAlign: 'center' }}><img src={emailicon} style={{ width: '19px', marginRight: '5px' }} />{data.email}</div>
                </div>
                <ul style={{ width: '65%' }}>
                    <div className='notificationheading d-md-flex row'>
                        <buttotn type='button' className='btn btn-link d-flex col-md-3' style={{ padding: '0' }}>
                            <input type='checkbox' style={{ width: '17px', cursor: 'pointer' }} checked={selectAll} onChange={handleSelectAll} />
                            <h6 style={{ color: '#8D8D8D', margin: '9px 0px 0px 8px' }}>Select All
                            </h6>
                            <div class="vr" style={{ margin: '7px 0 0 10px', height: '23px' }}></div>
                        </buttotn>
                        <h6 style={{ color: '#2196F3', margin: '8px 0px 0px -20px' }} className='col-lg-4'>
                            {selectedNotifications.length === 0 ? 'No Notification Selected' : `${selectedNotifications.length} Notifications Selected`}
                        </h6>
                        <button type='button' onClick={handleMarkasseen} className='btn btn-link col-lg-3'>
                            <h6 style={{ color: '#8D8D8D ', margin: '4px 0px 0px 0px', fontSize: '15px' }} className='seenicon'>
                                <HiMailOpen style={{ fontSize: '18px', margin: '0 5px 5px 0' }} />
                                Mark as Read
                            </h6>
                        </button>
                        <Modal isOpen={showModal} onRequestClose={closeModal} className="my-modal">
                            <div className="modal-content">
                                <img src={Information} alt='infoimage' style={{ width: "100px" }} className='modelbox' />
                                <h2 style={{ textAlign: 'center' }}>Oops</h2>
                                <p style={{ textAlign: 'center', fontSize: "18px", fontWeight: "600" }}>Atleast select one notification to mark as Read</p>
                                <button onClick={closeModal} type="button" class="btn btn-primary modelbtnn">Ok</button>
                            </div>
                        </Modal>
                        <button type='button' onClick={handleAlldeldete} className='btn btn-link col-lg-2'>
                            <h6 style={{ color: '#8D8D8D ', margin: '4px 0px 0px 0px', fontSize: '15px' }} className='deleteicon'> <MdDelete style={{ fontSize: '18px', margin: '0 2px 5px 0' }} />Delete</h6>
                        </button>
                        <Modal isOpen={deleteModal} onRequestClose={deletemodel} className="my-modal">
                            <div className="modal-content">
                                <img src={Information} alt='infoimage' style={{ width: "100px" }} className='modelbox' />
                                <h2 style={{ textAlign: 'center' }}>Oops</h2>
                                <p style={{ textAlign: 'center', fontSize: "18px", fontWeight: "600" }}>Atleast select one notification to Delete</p>
                                <button onClick={closeModal} type="button" class="btn btn-primary modelbtnn">Ok</button>
                            </div>
                        </Modal>
                    </div>
                    {/* <h6 style={{ color: '#8D8D8D ', margin: '4px 0px 0px 18%', fontSize: '15px' }} className='seenicon'>  <HiMail style={{ fontSize: '18px', marginRight: '2px' }} />Mark as Unread</h6> */}
                    {notifications.map((notifications) => (
                        <li
                            className={`row notificationget notificationcss${notifications.is_read === 0 ? 'read' : ''}`}
                            key={notifications.not_id}
                            style={{ cursor: 'pointer', backgroundColor: notifications.is_read === 0 ? '#EFFBFF' : 'white', marginTop: '10px', padding: '3px 10px', borderBottom: '1px solid #C7D7E6' }}
                        >
                            {/* <li className='notificationget'>{notifications.type}</li> */}
                            <div className='d-flex'>
                                <input type='checkbox' className="notification-checkbox" style={{ width: '17px', cursor: 'pointer' }} onChange={(event) => {
                                    const { checked } = event.target;
                                    if (checked) {
                                        setSelectedNotifications([...selectedNotifications, notifications]);
                                    } else {
                                        setSelectedNotifications(selectedNotifications.filter(notification => notification.not_id !== notifications.not_id));
                                    }
                                }} />
                                <img src={Notificationprofile} style={{ width: '30px', margin: '0 15px' }} />
                                <button type="button" class="btn btn-link"
                                    onClick={() => {
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
                                    }}
                                >
                                    <li style={{ fontSize: '14px' }} className='notificationget'>{notifications.message}</li>
                                    <li>{moment(notifications.created_at).format("DD/MM/YY hh:mm a")}</li>
                                </button>
                                <div className="notification-list" style={{ display: "flex", justifyContent: "flex-end", margin: "19px 0 0 45%" }}>
                                    {notifications.is_read === 0 ?
                                        <HiMail className='seen_icon' onClick={() => handleread(notifications.not_id)} />
                                        :
                                        <HiMailOpen className='seen_icon' />
                                    }
                                    <MdDelete onClick={() => handleDelnotification(notifications.not_id)} className='delicon' />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default Notification