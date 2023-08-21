import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import LoaderElement from '../LoaderElement'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularItem extends Component {
  state = {
    apiStatus: '',
    allPopularVideos: [],
  }

  componentDidMount() {
    this.getPopularVideos()
  }

  getPopularVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        overview: each.overView,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        allPopularVideos: updatedVideosList,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  lodingView = () => <LoaderElement />

  successView = () => {
    const {allPopularVideos} = this.state

    return (
      <div className="popular-video-list-container">
        <ul className="popular-video-list">
          {allPopularVideos.map(each => (
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
    )
  }

  failureView = () => (
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
        onClick={this.renderMovieItem()}
      >
        Try again
      </button>
    </div>
  )

  getResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.successView()

      case apiConstants.failure:
        return this.failureView()

      case apiConstants.inProgress:
        return this.lodingView()

      default:
        return null
    }
  }

  render() {
    return <div testid="trending">{this.getResult()}</div>
  }
}

export default PopularItem
