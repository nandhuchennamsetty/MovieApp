import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import LoaderElement from '../LoaderElement'
import './index.css'

const inComponentStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Originals extends Component {
  state = {
    apiStatus: inComponentStatus.initial,
    videosData: '',
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    this.setState({apiStatus: inComponentStatus.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        apiStatus: inComponentStatus.success,
        videosData: updatedData,
      })
    } else {
      this.setState({apiStatus: inComponentStatus.failure})
    }
  }

  successView = () => {
    const {videosData} = this.state

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    }

    return (
      <ul>
        <Slider {...settings} className="slick-container">
          {videosData.map(each => (
            <div className="slick-item" key={each.id}>
              <li key={each.id}>
                <Link to={`/movies/${each.id}`} key={each.id}>
                  <img
                    src={each.posterPath}
                    alt={each.title}
                    className="logo-image"
                  />
                </Link>
              </li>
            </div>
          ))}
        </Slider>
      </ul>
    )
  }

  loadingView = () => <LoaderElement />

  renderMovieItem = () => this.getVideoData()

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

  resultsOriginals = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case inComponentStatus.success:
        return this.successView()

      case inComponentStatus.failure:
        return this.failureView()

      case inComponentStatus.inProgress:
        return this.loadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div testid="originals" className="original-con">
        <div className="trending">
          <h1 className="trending-heading">Originals</h1>
        </div>
        <div>{this.resultsOriginals()}</div>
      </div>
    )
  }
}

export default Originals
