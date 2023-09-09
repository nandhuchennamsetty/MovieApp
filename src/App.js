import {Component} from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
//  hello
//  hello
import './App.css'

import SearchElements from './components/SearchElements'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import MovieContext from './context/MovieContext'

class App extends Component {
  state = {username: '', password: '', searchInput: ''}

  triggerChangeUsername = value => {
    this.setState({username: value})
  }

  triggerChangePassword = value => {
    this.setState({password: value})
  }

  triggerLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
    this.setState({username: '', password: ''})
  }

  triggerSearchChange = value => {
    this.setState({searchInput: value})
    // console.log(value)
  }

  render() {
    const {username, password, searchInput} = this.state
    console.log(searchInput)
    return (
      <MovieContext.Provider
        value={{
          username,
          password,
          searchInput,
          triggerChangeUsername: this.triggerChangeUsername,
          triggerChangePassword: this.triggerChangePassword,
          triggerLogout: this.triggerLogout,
          triggerSearchChange: this.triggerSearchChange,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={SearchElements} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default withRouter(App)
