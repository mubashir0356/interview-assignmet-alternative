// Write your JS code here
import {useContext} from 'react'
import AuthContext from '../../context/AuthContext'

const Home = () => {
  const loginDetails = useContext(AuthContext)
  console.log(loginDetails)

  return <p>hi</p>
}

export default Home
