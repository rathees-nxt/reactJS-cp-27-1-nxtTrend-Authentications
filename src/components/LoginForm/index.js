// Write your JS code here
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showFailue: false, errMsg: ''}

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errMsg => {
    this.setState({showFailue: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log(username)
    console.log(password)
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, option)
    const data = await response.json()

    if (response.ok === true) {
      this.submitSuccess()
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showFailue, errMsg} = this.state
    return (
      <div className="loginform-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="login-image"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="Website login"
          className="website-image"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="login-image1"
          />
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
              onChange={this.updateUserName}
              value={username}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="userpassword">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="userpassword"
              placeholder="Password"
              onChange={this.updatePassword}
              value={password}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showFailue && <p className="error">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
