import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilLockLocked, cilUser, cilPhone
} from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editadmin = () => {

    const [data1, setdata1] = useState([])
    // console.log(data1[0].admin_name);
    const get = () => {

        var token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/admin/findoneadmin/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log("response", response);
                    setdata1(response.data[0])
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        get()
    }, [])



    var history = useHistory()

    const { id } = useParams()
    console.log(id);



    // const [data, setData] = useState({
    //     admin_name: '',
    //     email: "",
    //     contact: '',
    //     user_name: '',
    // })

    // const [data, setdata] = useState([])

    const handleChange = (e) => {
        setdata1({ ...data1, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var token = localStorage.getItem('token')

        var passData = {
            admin_name: data1.admin_name,
            email: data1.email,
            contact: data1.contact,
            user_name: data1.user_name,
            city_id: data1.city_id,
            address: data1.address
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_URL}/admin/updateadmin/${id}`,
            data: passData,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data.message)
                    history.push("/admin")
                    console.log(response);
                }
            })
            .catch((error) => {
                // console.log(error);
                // if (error.response.status === false) {
                //     toast.error(error.response.data.message.email);
                // }
                // if (error.response.status === false) {
                //     toast.error(error.response.data.message.contact);
                // }
                toast.error(error.response.data.message)
            })
    }
    // console.log(data);

    return (
        <div>
            {/* <form>
                <input type='text' defaultValue={data.admin_name} />
                <button>updata</button>
            </form> */}
            <div className="bg-light d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={12} lg={12} xl={12} style={{ width: '40rem' }}>
                            <CCard className="mx-4">
                                <CCardBody className="p-4">

                                    <CForm onSubmit={handleSubmit} >
                                        <h3 className='text-center'>Edit Admin</h3><br />
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="admin_name" autoComplete="admin_name" name="admin_name"
                                                value={data1?.admin_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="email" autoComplete="email" name="email"
                                                value={data1?.email}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="contact" autoComplete="contact" name="contact"
                                                value={data1?.contact}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="user_name" autoComplete="user_name" name="user_name"
                                                value={data1?.user_name}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="city_id" autoComplete="city_id" name="city_id"
                                                value={data1?.city_id}
                                                onChange={handleChange} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="address" autoComplete="address" name="address"
                                                value={data1?.address}
                                                onChange={handleChange} />
                                        </CInputGroup>


                                        <div className="d-grid">
                                            <CButton color="success" type='submit'>Edit Admin</CButton>
                                        </div>

                                    </CForm>
                                </CCardBody>

                            </CCard>
                        </CCol>
                    </CRow>

                    <ToastContainer autoClose={2000} />
                </CContainer>

            </div >
        </div>
    )
}

export default Editadmin