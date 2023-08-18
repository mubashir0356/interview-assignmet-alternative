import {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'

import AuthContext from '../../context/AuthContext'

import './index.css'

const Login = props => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // using the below hooks to know whether if the specific input is valid

  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false)
  const [isLastNameTouched, setIsLastNameTouched] = useState(false)
  const [isEmailTouched, setIsEmailTouched] = useState(false)
  const [isPasswordTouched, setIsPasswordTouched] = useState(false)
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(
    false,
  )

  const [showFormError, setShowFormError] = useState(false)

  // validating the input elements

  const isFirstNameValid = firstName.trim() !== ''
  const firstNameHasError = !isFirstNameValid && isFirstNameTouched

  const isLastNameValid = lastName.trim() !== ''
  const lastNameHasError = !isLastNameValid && isLastNameTouched

  const isEmailValid = email.includes('@')
  const emailHasError = !isEmailValid && isEmailTouched

  const isPasswordValid = enteredPassword.length >= 8
  const enteredPasswordHasError = !isPasswordValid && isPasswordTouched

  const isConfirmPasswordValid = enteredPassword === confirmPassword
  const confirmPasswordHasError =
    !isConfirmPasswordValid && isConfirmPasswordTouched

  // managing event handlers

  const onChangeFirstName = event => setFirstName(event.target.value)

  const onChangeLastName = event => setLastName(event.target.value)

  const onChangeEmail = event => setEmail(event.target.value)

  const onChangeEnteredPassword = event =>
    setEnteredPassword(event.target.value)

  const onChangeConfirmPassword = event =>
    setConfirmPassword(event.target.value)

  const onBlurFirstName = () => setIsFirstNameTouched(true)

  const onBlurLastName = () => setIsLastNameTouched(true)

  const onBlurEmail = () => setIsEmailTouched(true)

  const onBlurEnteredPassword = () => setIsPasswordTouched(true)

  const onBlurConfirmPassword = () => setIsConfirmPasswordTouched(true)

  // defining styling for valid and in-valid input fields

  const firstNameClassName = firstNameHasError
    ? 'input-field invalid-input'
    : 'input-field'
  const lastNameClassName = lastNameHasError
    ? 'input-field invalid-input'
    : 'input-field'
  const emailClassName = emailHasError
    ? 'input-field invalid-input'
    : 'input-field'
  const passwordClassName = enteredPasswordHasError
    ? 'input-field invalid-input'
    : 'input-field'
  const confirmPasswordClassName = confirmPasswordHasError
    ? 'input-field invalid-input'
    : 'input-field'

  let formIsValid = false

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    formIsValid = true
  }

  // using context to know if the user is already signed up and then conditionally render the output

  const loginContext = useContext(AuthContext)
  const {onLogin, isLoggedIn} = loginContext

  const onSubmitForm = event => {
    event.preventDefault()

    if (formIsValid) {
      const {history} = props

      const userDetails = {
        firstName,
        lastName,
        email,
        enteredPassword,
      }

      localStorage.setItem('userDetails', JSON.stringify(userDetails))
      onLogin()
      history.replace('/')
    } else {
      setShowFormError(true)
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className="app">
      <form className="form" onSubmit={onSubmitForm}>
        <div className="input-container">
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            placeholder="Enter First name"
            id="firstName"
            value={firstName}
            onChange={onChangeFirstName}
            onBlur={onBlurFirstName}
            className={firstNameClassName}
            type="text"
          />
          {firstNameHasError && <p className="error">Enter a valid name</p>}
        </div>
        <div className="input-container">
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            placeholder="Enter Last name"
            id="lastName"
            value={lastName}
            onChange={onChangeLastName}
            onBlur={onBlurLastName}
            className={lastNameClassName}
            type="text"
          />
          {lastNameHasError && <p className="error">Enter a valid name</p>}
        </div>
        <div className="input-container">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            placeholder="example@example.com"
            id="email"
            value={email}
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            className={emailClassName}
            type="email"
          />
          {emailHasError && <p className="error">Enter a valid email</p>}
        </div>
        <div className="input-container">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            placeholder="Enter Password"
            id="password"
            value={enteredPassword}
            onChange={onChangeEnteredPassword}
            onBlur={onBlurEnteredPassword}
            className={passwordClassName}
            type="password"
          />
          {enteredPasswordHasError && (
            <p className="error">Password must be of 8 characters</p>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <input
            placeholder="Re-enter the password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            onBlur={onBlurConfirmPassword}
            className={confirmPasswordClassName}
            type="password"
          />
          {confirmPasswordHasError && (
            <p className="error">{`Passwords didn't match`}</p>
          )}
        </div>
        <div className="actions">
          <button type="submit" className="submit-button">
            Signup
          </button>
          {showFormError && (
            <p className="error">
              Please fill the form correctly. All fields are mandatory
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
