import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import MovieContext from '../../Context/MovieContext'

import './index.css'

class Login extends Component {
  state = {isShowingError: false}

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {username, password, changeUsername, changePassword} = value

          const onChangeUsername = event => {
            changeUsername(event)
          }

          const onChangePassword = event => {
            changePassword(event)
          }

          const submitSuccess = jwtToken => {
            const {history} = this.props
            Cookies.set('jwt_token', jwtToken, {expires: 30})
            history.replace('/')
          }

          const showFailure = errorMsg => {
            this.setState({isShowingError: true, errorMsg})
          }

          const onSubmitButton = async event => {
            event.preventDefault()

            const userDetails = {username, password}

            const apiUrl = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }

            const response = await fetch(apiUrl, options)
            const data = await response.json()
            if (response.ok === true) {
              submitSuccess(data.jwt_token)
            } else {
              showFailure(data.error_msg)
            }
          }

          const {errorMsg, isShowingError} = this.state
          const jwtToken = Cookies.get('jwt_token')

          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
          return (
            <div className="login-container">
              <div className="logo-container">
                <img
                  src="https://res.cloudinary.com/djo72ivyd/image/upload/v1674027400/Group_7399_donaa1.png"
                  alt="movies"
                  className="movies-logo"
                />
              </div>

              <form onSubmit={onSubmitButton} className="form-container">
                <h1 className="login-head">Login</h1>
                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <input
                  value={username}
                  onChange={onChangeUsername}
                  placeholder="Username"
                  className="input"
                  id="username"
                  type="text"
                />
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input
                  value={password}
                  onChange={onChangePassword}
                  placeholder="Password"
                  className="input"
                  id="password"
                  type="password"
                />
                {isShowingError ? (
                  <p className="error-msg">*{errorMsg}</p>
                ) : null}
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Login
