import {Component} from 'react'
import Header from '../Header'
import Originals from '../originals'
import Trending from '../Trending'
import TopRated from '../TopRated'
import Footer from '../Footer'

import './index.css'

class Home extends Component {
  state = {
    data: '',
  }

  render() {
    return (
      <div className="main-con-home">
        <div className="back-img-con">
          <Header />
          <div className="card-home">
            <h1 className="heading-h">Super Man</h1>
            <p className="para">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <button type="button" className="button">
              Play
            </button>
            <p className="trend-para">Trending Now</p>
          </div>
        </div>
        <Trending />
        <Originals />
        <TopRated />
        <Footer />
      </div>
    )
  }
}
export default Home
