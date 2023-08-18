import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'

import AuthContext from './context/AuthContext'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
