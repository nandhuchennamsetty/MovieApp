import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import LoadingElement from '../LoaderElement'
import MovieContext from '../../context/MovieContext'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchElements extends Component {
  state = {
    apiStatus: apiConstants.initial,
    allSearchResults: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getSearchElementVideos()
  }

  triggerSearchChange = props => {
    const {enteredVal} = props
    this.setState({searchInput: enteredVal})
  }

  getSearchElementVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput} = this.state

    // const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`

    const url = 'https://apis.ccbp.in/movies-app/movies-search?search=Venom'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedVideosList = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        allSearchResults: updatedVideosList,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoader = () => <LoadingElement />

  renderSuccessView = () => {
    const {allSearchResults, searchInput} = this.state
    const showSearchResults = allSearchResults.length > 0

    return showSearchResults ? (
      <div className="popular-video-list-container">
        <ul className="popular-video-list">
          {allSearchResults.map(each => (
            <li key={each.id}>
              <Link to={`/movies/${each.id}`} key={each.id}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="popular-image"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="failure-view-container">
        <img
          src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650384280/Mini%20Project%20Netflix%20Clone/no_results_tjfgmd.png"
          alt="no movies"
          className="failure-image"
        />
        <p className="search-content">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderMovieItem = () => {
    this.getSearchElementVideos()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650297174/Mini%20Project%20Netflix%20Clone/Background-Complete_t8c6zl.png"
        className="failure-image"
      />
      <p className="search-content">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.renderMovieItem}
      >
        Try again
      </button>
    </div>
  )

  getResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <MovieContext.Provider
        value={{
          triggerSearchChange: this.triggerSearchChange,
        }}
      >
        <div>{this.getResult()}</div>
      </MovieContext.Provider>
    )
  }
}

export default SearchElements
