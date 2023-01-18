import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isShowingError: false}

  submitSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  showFailure = () => {
    this.setState({isShowingError: true})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitButton = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.showFailure()
    }
  }

  render() {
    const {username, password, isShowingError} = this.state

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

        <form onSubmit={this.onSubmitButton} className="form-container">
          <h1 className="login-head">Login</h1>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            value={username}
            onChange={this.onChangeUsername}
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
            onChange={this.onChangePassword}
            placeholder="Password"
            className="input"
            id="password"
            type="password"
          />
          {isShowingError ? (
            <p className="error-msg">Username or Password is invalid</p>
          ) : null}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
