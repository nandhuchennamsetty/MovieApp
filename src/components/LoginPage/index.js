import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import MovieContext from '../../context/MovieContext'
import './index.css'

/* ha */

class LoginPage extends Component {
  state = {
    showErrorMsg: false,
    errorMsg: '',
  }

  render() {
    // const {showErrorMsg, errorMsg} = this.state

    return (
      <MovieContext.Consumer>
        {value => {
          const {
            username,
            password,
            triggerChangeUsername,
            triggerChangePassword,
          } = value

          const onChangeUsername = event => {
            triggerChangeUsername(event.target.value)
          }

          const onChangeUserPass = event => {
            triggerChangePassword(event.target.value)
          }

          const onSuccess = JwtToken => {
            const {history} = this.props

            Cookies.set('jwt_token', JwtToken, {
              expires: 30,
            })
            history.replace('/')
          }

          const onSubmitFailure = errorMsg => {
            this.setState({showErrorMsg: true, errorMsg})
          }

          const submitUserInfo = async event => {
            event.preventDefault()
            const userDetails = {username, password}

            const url = 'https://apis.ccbp.in/login'

            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok === true) {
              onSuccess(data.jwt_token)
            } else {
              onSubmitFailure(data.error_msg)
            }
          }

          const {showErrorMsg, errorMsg} = this.state

          const jwtToken = Cookies.get('jwt_token')

          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }

          return (
            <div className="main-con">
              <nav className="nav-con">
                <img
                  src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650191862/Mini%20Project%20Netflix%20Clone/MoviesIcon_snclt2.png"
                  alt="login website logo"
                  className="movie-logo"
                />
              </nav>
              <div className="Inner-con">
                <form className="form-con" onSubmit={submitUserInfo}>
                  <h1 className="head-f">Login</h1>
                  <div className="con-inputs">
                    <label htmlFor="username" className="user-label">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      id="username"
                      value={username}
                      onChange={onChangeUsername}
                      placeholder="Username"
                    />
                  </div>
                  <div className="con-inputs">
                    <label htmlFor="password" className="user-label">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      className="input-field"
                      id="password"
                      value={password}
                      onChange={onChangeUserPass}
                      placeholder="Password"
                    />
                  </div>
                  {showErrorMsg && <p className="para">{errorMsg}</p>}
                  <button type="submit" className="btn-login">
                    Login
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default LoginPage
