import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPass = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = JwtToken => {
    Cookies.set('jwt_token', JwtToken, {
      expires: 30,
    })
  }

  submitUserInfo = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    return (
      <div className="main-con">
        <nav className="nav-con">
          <h1 className="movie-head">MOVIES</h1>
        </nav>
        <div className="Inner-con">
          <form className="form-con" onSubmit={this.submitUserInfo}>
            <h1 className="head-f">Login</h1>
            <div className="con-inputs">
              <label htmlFor="userId" className="user-label">
                USERNAME
              </label>
              <input
                type="text"
                className="input-field"
                id="userId"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="con-inputs">
              <label htmlFor="userPassId" className="user-label">
                PASSWORD
              </label>
              <input
                type="password"
                className="input-field"
                id="userPassId"
                onChange={this.onChangeUserPass}
              />
              {showErrorMsg && <p className="para">{errorMsg}</p>}
            </div>
            <button type="submit" className="btn-login">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginPage
