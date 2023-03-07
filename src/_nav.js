import React from 'react'
import { FaUserAlt, FaCarSide } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { MdDashboard, MdBorderColor, MdPayment } from 'react-icons/md'
import { BsChatSquareTextFill } from 'react-icons/bs'
import { CNavGroup, CNavItem, } from '@coreui/react'

const _nav = [

  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <MdDashboard className='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <MdBorderColor className="nav-icon" />,
  }

  // {
  //   component: CNavItem,
  //   name: 'Booking',
  //   to: '/booking',
  //   icon: <MdBorderColor className="nav-icon" />,
  // },

  // {
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
  // {
  //   component: CNavItem,
  //   name: 'Cars',
  //   to: '/cars',
  //   icon: <FaCarSide className="nav-icon" />
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Users',
  //   to: '/users',
  //   icon: <FiUsers className="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'All EndUsers',
  //       to: '/users/all-enduser',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'All service provider',
  //       to: '/users/all-serviceprovider',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Complain',
  //   to: '/complain',
  //   icon: <BsChatSquareTextFill className="nav-icon" />
  // },
  // {
  //   component: CNavItem,
  //   name: "Report",
  //   to: "/report",
  //   icon: <BsChatSquareTextFill className="nav-icon" />,
  // },



]


export default _nav
