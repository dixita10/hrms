import React, { useEffect } from 'react'
import { FaUserAlt, FaCarSide, FaRegCalendarAlt, FaUsers, FaUserCircle, FaRupeeSign, FaBuilding, FaUser } from 'react-icons/fa'
import { MdDashboard, MdBorderColor, MdPayment, MdEventAvailable } from 'react-icons/md'
import { CNavGroup, CNavItem, } from '@coreui/react'
import { RiAdminLine } from "react-icons/ri";
import { GiWorld } from "react-icons/gi";
import { AiOutlineProject } from "react-icons/ai";
import { DiTechcrunch } from "react-icons/di";
import { BsBank } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiCleaver, GiModernCity } from "react-icons/gi";
import { TiWorldOutline } from "react-icons/ti";
import { MdOutlineLocationOn, MdOutlineAssignmentInd } from "react-icons/md";

var role_id = localStorage.getItem("role_id")
// console.log(role_id);




const nav1 = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <MdDashboard className='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Company Profile',
    to: '/companyprofile',
    icon: <HiOutlineBuildingOffice2 className='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'My Profile',
    to: '/loggeduser',
    icon: <RiAdminLine className='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'Attendance',
    to: '/attendance',
    icon: <FaRegCalendarAlt className='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'Salary',
    to: '/salary',
    icon: <FaRupeeSign className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Leave',
    to: '/leave',
    icon: <GiCleaver className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Project',
    to: '/project',
    icon: <AiOutlineProject className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Event',
    to: '/event',
    icon: <MdEventAvailable className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bankdetail',
    to: '/bankdetail',
    icon: <BsBank className="nav-icon" />,
  }

]

const nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <MdDashboard className='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Comapany Profile',
    to: '/companyprofile',
    icon: <HiOutlineBuildingOffice2 className='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'My Profile',
    to: '/loggeduser',
    icon: <RiAdminLine className='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'Attendance',
    to: '/attendance',
    icon: <FaRegCalendarAlt className='nav-icon' />
  },
  {
    component: CNavItem,
    name: 'Department',
    to: '/department',
    icon: <FaBuilding className='nav-icon' />
  },
  // {
  //   component: CNavGroup,
  //   name: 'Location',
  //   icon: <MdOutlineLocationOn className="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Country',
  //       to: '/country',
  //       icon: <GiWorld className="nav-icon" />
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'State',
  //       to: '/state',
  //       icon: <TiWorldOutline className="nav-icon" />
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'City',
  //       to: '/city',
  //       icon: <GiModernCity className="nav-icon" />
  //     },
  //   ]
  // },
  {
    component: CNavItem,
    name: 'Project',
    to: '/project',
    icon: <AiOutlineProject className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Role',
    to: '/role',
    icon: <FaUserCircle className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Salary',
    to: '/salary',
    icon: <FaRupeeSign className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Technology',
    to: '/technology',
    icon: <DiTechcrunch className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Directory',
    to: '/user',
    icon: <FaUsers className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Event',
    to: '/event',
    icon: <MdEventAvailable className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bankdetail',
    to: '/bankdetail',
    icon: <BsBank className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Leave',
    to: '/leave',
    icon: <GiCleaver className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Assign Intern',
    to: '/attendanceuser',
    icon: <MdOutlineAssignmentInd className="nav-icon" />,
  },

]

const _nav = role_id === "3" ? nav : nav1



// console.log(_nav);




export default _nav






// {
    //   {
    //   component: CNavGroup,
    //   name: 'Payment',
    //   to: '/payment',
    //   icon: <MdPayment className="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'User Payment',
    //       to: '/payment/user-payment',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Service Provider Payment',
    //       to: '/payment/serviceprovider-payment',
    //     },
    //   ],
    // },
//   //   {
//   //     component: CNavItem,
//   //     name: 'Cars',
//   //     to: '/cars',
//   //     icon: <FaCarSide className="nav-icon" />
//   //   },
//   //   {
//   //     component: CNavGroup,
//   //     name: 'Users',
//   //     to: '/users',
//   //     icon: <FiUsers className="nav-icon" />,
//   //     items: [
//   //       {
//   //         component: CNavItem,
//   //         name: 'All EndUsers',
//   //         to: '/users/all-enduser',
//   //       },
//   //       {
//   //         component: CNavItem,
//   //         name: 'All service provider',
//   //         to: '/users/all-serviceprovider',
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     component: CNavItem,
//   //     name: 'Complain',
//   //     to: '/complain',
//   //     icon: <BsChatSquareTextFill className="nav-icon" />
//   //   },
//   //   {
//   //     component: CNavItem,
//   //     name: "Report",
//   //     to: "/report",
//   //     icon: <BsChatSquareTextFill className="nav-icon" />,
//   //   }
// }