import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/home" component={Home} />
  </Switch>
)

export default App
