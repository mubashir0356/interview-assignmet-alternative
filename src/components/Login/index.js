import {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'

import AuthContext from '../../context/AuthContext'
import useInput from '../../hooks/use-input'

import './index.css'

const isNotEmpty = value => value.trim() !== ''
const isEmail = value => value.includes('@')
const isEnteredPasswordValid = value => value.length >= 8

const Login = props => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNotEmpty)

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNotEmpty)

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail)

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: enteredPasswordChangeHandler,
    inputBlurHandler: enteredPasswordBlurHandler,
  } = useInput(isEnteredPasswordValid)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(
    false,
  )

  const [showFormError, setShowFormError] = useState(false)

  const isConfirmPasswordValid = enteredPassword === confirmPassword
  const confirmPasswordHasError =
    !isConfirmPasswordValid && isConfirmPasswordTouched

  const onChangeConfirmPassword = event =>
    setConfirmPassword(event.target.value)

  const onBlurConfirmPassword = () => setIsConfirmPasswordTouched(true)

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
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    enteredPasswordIsValid &&
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
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
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
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
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
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
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
            onChange={enteredPasswordChangeHandler}
            onBlur={enteredPasswordBlurHandler}
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
