import React from 'react'
import '../styles/LayoutStyles.css'
import { userMenu, adminMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, message } from 'antd'
import { setUser, logout } from '../redux/features/userSlice'

const Layout = ({children}) => {

  const { user } = useSelector(state => state.user)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // logout function
  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
    message.success('Logout Successfully')
    navigate('/login')
  }

  //============= Doctor menu ==============
  const doctorMenu = [
    {
      name: 'Home',
      path:'/',
      icon: 'fa-solid fa-house'
    },
    {
      name: 'Appointments',
      path:'/doctor-appointments',
      icon: 'fa-solid fa-list'
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user'
    }
  ]
  //============= Doctor menu ==============

  // rendering menu list
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr></hr>
            </div>
            <div className="menu">
              {SidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path
                return (
                  <div className={`menu-item ${isActive && "active"}`} key={index}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                )
              })}
              <div className='menu-item' onClick={handleLogout}>
                <i className='fa-solid fa-right-from-bracket'></i>
                <a href='#'>Logout</a>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge count={user && user.notification.length}>
                  <i className='fa-solid fa-bell b-icon'  onClick={() => {navigate('/notification')}}></i>
                </Badge>
                <Link to={user?.isDoctor ? `/doctor/profile/${user?._id}` : '/'}><i className='fa-solid fa-user'></i> {user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout