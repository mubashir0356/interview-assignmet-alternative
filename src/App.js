import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'

import AuthContext from './context/AuthContext'

const App = () => {
  // initially checking whether the user is logged in
  // since i stored the user details in local storage using localStorage methods to retrieve details.

  const userDetailsInJSON = localStorage.getItem('userDetails')
  const userDetails = JSON.parse(userDetailsInJSON)

  const initialLoggedInState = userDetails !== null

  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState)

  const onClickLogin = () => setIsLoggedIn(true)

  const onClickLogout = () => setIsLoggedIn(false)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: onClickLogin,
        onLogout: onClickLogout,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </AuthContext.Provider>
  )
}

export default App
