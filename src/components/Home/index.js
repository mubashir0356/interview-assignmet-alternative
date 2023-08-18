// Write your JS code here
import {useContext} from 'react'
import {Redirect} from 'react-router-dom'

import AuthContext from '../../context/AuthContext'

import './index.css'

const Home = props => {
  const loginDetails = useContext(AuthContext)
  const {isLoggedIn, onLogout} = loginDetails

  const userDetailsInJSON = localStorage.getItem('userDetails')
  const userDetails = JSON.parse(userDetailsInJSON)

  // extracting first name from local storage if user details exist

  let name
  if (userDetails !== null) {
    const {firstName} = userDetails
    name = firstName
  }

  const onClickLogout = () => {
    localStorage.removeItem('userDetails')
    // const {history} = props
    // history.replace('/login')
    onLogout()
  }

  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-page">
      <div className="content-container">
        <p className="content">
          Hi <span className="username">{name}</span>
        </p>
        <p className="content">
          Yeah you have successfully logged in.
          <br />
          You are in the homepage now
        </p>
      </div>
      <div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
