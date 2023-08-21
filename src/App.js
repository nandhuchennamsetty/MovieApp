import {Component} from 'react'
import Cookies from 'js-cookie'
import {Switch, Route, Redirect} from 'react-router-dom'

import SearchElements from './components/SearchElements'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import PopularItem from './components/PopularItem'
import MovieItemDetails from './components/MovieItemDetails'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import MovieContext from './context/MovieContext'

import './App.css'

/* 
import TopRated from './components/TopRated'
import MovieItem from './components/MovieItem'
import Originals from './components/originals'
import Trending from './components/Trending'
import LoaderElement from './components/LoaderElement'
import Header from './components/Header'
import Footer from './components/Footer'
const App = () => <SearchElements />
/* 
<TopRated />
 <MovieItemDetails />
<MovieItem />
<PopularItem />
<Account />
<Trending />
<LoaderElement />
<Originals />
 <Home />
 <Footer />
 <Header />
<LoginPage /> */

class App extends Component {
  state = {username: '', password: ''}

  render() {
    const {username, password} = this.state

    return (
      <MovieContext.Provider
        value={{
          username: '',
          password: '',
          triggerChangeUsername: this.triggerChangeUsername,
          triggerChangePassword: this.triggerChangePassword,
          triggerLogout: this.triggerLogout,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/popular" component={PopularItem} />
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

export default App
