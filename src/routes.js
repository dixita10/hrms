import { countBy } from 'lodash'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './views/home1/Home'
import Login from './views/pages/login/Login'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const home1 = React.lazy(() => import('./views/home1/Home'))
const sidebar = React.lazy(() => import('./views/sidebar/Admin'))
const attendance = React.lazy(() => import('./views/attendance/Attendance'))
const department = React.lazy(() => import('./views/department/Department'))
const state = React.lazy(() => import('./views/state/State'))
const city = React.lazy(() => import('./views/city/City'))
const country = React.lazy(() => import('./views/country/Country'))
const Project = React.lazy(() => import('./views/project/Project'))
const role = React.lazy(() => import('./views/role/Role'))
const salary = React.lazy(() => import('./views/salary/Salary'))
const technology = React.lazy(() => import('./views/technology/Technology'))
const user = React.lazy(() => import('./views/user/User'))
const Singleattendance = React.lazy(()=> import('./views/attendance/Singleattendance'))


// const AllEndUsers = React.lazy(() => import('./views/users/AllEndUser'))
// const AllSP = React.lazy(() => import('./views/users/AllServiceProviders'))

// const Booking = React.lazy(() => import('./views/booking/index'))

// const Cars = React.lazy(() => import('./views/cars/Index'))
const login = React.lazy(() => import('./views/pages/login/Login'))
// const SingleCar = React.lazy(() => import('./views/cars/SingleCar'))
// const Payment = React.lazy(() => import('./views/payment/index'))
// const complain = React.lazy(() => import('./views/complain/index'))

// const UserPayment = React.lazy(() => import('./views/payment/UserPayment/index'))
// const ServiceProviderPayment = React.lazy(() => import('./views/payment/ServiceProviderPayment/index'))
// const UserRefundPayment = React.lazy(() => import('./views/payment/UserPayment/userRefundPayment'))
// const Report = React.lazy(() => import("./views/report/report"));




// const PrivateRoute = (props) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     return (
//       <Route exact={true} path={props.path} component={props.component}></Route>
//     )
//   } else {
//     return <Login  {...props} />
//   }
// }

const Routes = [
  { path: '/login', name: 'login', component: login },
  // { path: '/http://localhost:3000/login', exact: true, name: 'login', component: login },
  // <PrivateRoute path='/dashboard' component={Dashboard} name='Dashboard' />,
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/home', name: 'Home', component: home1 },
  { path: '/admin', name: 'Admin', component: sidebar },
  { path: '/attendance', name: 'Attendance', component: attendance },
  // { path: '/attendance/:id', name: 'Attendance', component: attendance },
  { path: '/department', name: 'Department', component: department },
  { path: '/state', name: "State", component: state },
  { path: '/city', name: 'City', component: city },
  { path: "/country", name: 'Country', component: country },
  { path: "/project", name: 'Project', component: Project },
  { path: "/role", name: 'Role', component: role },
  { path: "/salary", name: 'Salary', component: salary },
  { path: "/technology", name: 'Technology', component: technology },
  { path: "/user", name: 'User', component: user },
  {path:'/Singleattendance/:id' , name:"Singleattendance" , component: Singleattendance},






  // { path: '/users', name: 'users', component: AllEndUsers, exact: true },
  // { path: '/users/all-enduser', name: 'All EndUsers', component: AllEndUsers },
  // { path: '/users/all-serviceprovider', name: 'All service provider', component: AllSP },

  // { path: '/booking', name: 'booking', component: Booking, exact: true },

  // { path: '/cars', name: 'cars', component: Cars, exact: true },
  // { path: '/cars/:id', name: 'SingleCar', component: SingleCar, exact: true },

  // // { path: '/payment', name: 'Payment', component: Payment, exact: true },

  // { path: '/complain', name: 'complain', component: complain, exact: true },

  // { path: '/payment', name: 'payment', component: UserPayment, exact: true },

  // { path: '/payment/user-payment', name: 'User Payment', component: UserPayment, exact: true },
  // { path: '/payment/serviceprovider-payment', name: 'Service Provider Payment', component: ServiceProviderPayment, exact: true },

  // { path: '/payment/user-refund-payment', name: 'User Refund Payment', component: UserRefundPayment, exact: true },
  // { path: "/report", name: "Report", component: Report, exact: true },



]

export default Routes

