import MovieContext from '../../context/MovieContext'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = () => (
  <MovieContext.Consumer>
    {value => {
      const {username, password, triggerLogout} = value
      console.log(username)
      console.log(password)
      console.log('hi')
      const onClickLogout = () => {
        triggerLogout()
      }
      const hiddenPassword = '*'.repeat(password.length)

      return (
        <div className="account-main-con">
          <Header />
          <div className="account-main-con-1">
            <h1 className="head-acc">Account</h1>
            <hr className="hr-line" />
            <div className="mem-ship">
              <p className="para-mem">Member ship</p>
              <div className="con-mail">
                <p className="mail-para">{username}@gmail.com</p>
                <p className="pass-para">Password:{hiddenPassword}</p>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="plain-con">
              <p className="para-mem mm">Plan details </p>
              <p className="mail-para mp">Premium </p>
              <button type="button">Ultra HD</button>
            </div>
            <hr className="hr-line" />
            <div className="btn-con">
              <button type="button" className="btn" onClick={onClickLogout}>
                Logout
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default Account
