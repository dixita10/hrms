import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Overview from './Overview';
import Address from './Address';
import Policies from './Policies';
import companylogo from '../../assets/images/companylogo.png'
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

const Companyprofile = () => {

    // var role_id = localStorage.getItem("role_id")

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-2 '>
                        <img src={companylogo} style={{ width: '150px' }} />
                        <p style={{ fontSize: '1.25rem', fontWeight: "600" }}>Adsum Originator</p>
                        <p className='compnyicon'>
                            <a href='https://www.linkedin.com/company/adsum-originator' target="_blank">
                                <span style={{ fontSize: "26px", color: "#0082CA", borderRadius: "50%" }}><BsLinkedin /></span>
                            </a>
                            <a href='https://www.facebook.com/AdsumOriginatorLLP/' target="_blank">
                                <span style={{ fontSize: "30px", color: "#3B5998" }}><AiFillFacebook /></span>
                            </a>
                            <a href='https://twitter.com/navneetboghani' target="_blank">
                                <span style={{ fontSize: "30px", color: "#0082CA" }}><AiFillTwitterSquare /></span>
                            </a>
                        </p>

                    </div>
                    <div className='col-lg-10'>
                        <Tabs
                            defaultActiveKey="Overview"
                            id="noanim-tab-example"
                            className='col-lg-8'
                        >
                            <Tab eventKey="Overview" title="Overview"><br />
                                <Overview />
                            </Tab>
                            <Tab eventKey="Address" title="Address"><br /><br /><br />
                                <Address />
                            </Tab>
                            <Tab eventKey="Policies" title="Policies"><br /><br /><br />
                                <Policies />
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
        // <div className='container'>
        //     <div className='row'>
        //         <div className='col-lg-3' style={{ marginRight: '50px', marginTop: '20px' }} >
        // <img src={companylogo} style={{ width: '150px' }} />
        // <p style={{ fontSize: '1.25rem', fontWeight: "600" }}>Adsum Originator</p>
        //         </div>
        //         <div>
        // <Tabs
        //     defaultActiveKey="Overview"
        //     id="noanim-tab-example"
        //     className='col-lg-8'
        // >
        //     <Tab eventKey="Overview" title="Overview"><br />
        //         <Overview />
        //     </Tab>
        //     <Tab eventKey="Address" title="Address"><br />
        //         <Address />
        //     </Tab>
        //     <Tab eventKey="Policies" title="Policies"><br />
        //         <Policies />
        //     </Tab>

        // </Tabs>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Companyprofile