import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle, AiOutlineMenuUnfold} from 'react-icons/ai'
import {useState} from 'react'
import MovieContext from '../../context/MovieContext'
import './index.css'

//  ha

const Header = () => {
  // const {SearchFun} = props
  const [onClickValue, onSet] = useState(false)
  const search = 'true'

  const applyingClassMenu = () => {
    onSet(true)
  }

  const onClickCross = () => {
    onSet(false)
  }
  return (
    <MovieContext.Consumer>
      {value => {
        const {triggerSearchChange} = value

        let enteredVal = ''
        const onChangeSearch = event => {
          enteredVal = event.target.value
        }

        const searchButtonClick = () => {
          // SearchFun(enteredVal)
          triggerSearchChange(enteredVal)
          console.log(enteredVal)
        }
        return (
          <div className="header-con">
            <div className="nav-container">
              <ul className="nav-ul">
                <li className="fst-nav-con">
                  <Link to="/">
                    <img
                      className="img"
                      alt="website logo"
                      src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655456206/Group_7399_tjbtzb.png"
                    />
                  </Link>
                  <Link to="/">
                    <p className="Home-header">Home</p>
                  </Link>
                  <Link to="/popular">
                    <p className="popular-header">Popular</p>
                  </Link>
                </li>

                <li className="sec-nav-con ">
                  {search === 'true' && (
                    <div className="search-input">
                      <input
                        type="search"
                        placeholder="Search"
                        onChange={onChangeSearch}
                        className="input-search"
                      />
                      <Link to="/search">
                        <button
                          type="button"
                          testid="searchButton"
                          onClick={searchButtonClick}
                          alt="searchButton"
                          className="search-ion"
                        >
                          <HiOutlineSearch />
                        </button>
                      </Link>
                    </div>
                  )}
                  {search !== 'true' && (
                    <Link to="/search">
                      <button
                        type="button"
                        testid="searchButton"
                        alt="searchButton"
                        className="search-ion"
                      >
                        <HiOutlineSearch />
                      </button>
                    </Link>
                  )}
                  <button
                    className="menu-btn"
                    type="button"
                    onClick={applyingClassMenu}
                  >
                    <AiOutlineMenuUnfold />
                  </button>

                  <Link to="/Account">
                    <button type="button" className="profile-img">
                      <img
                        src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655477627/Avatar_v4saqp.png"
                        alt="profile"
                      />
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
            <ul className={`drop-down ${onClickValue ? 'open' : 'close'}`}>
              <li>
                <Link to="/">
                  <p className="Home-head">Home</p>
                </Link>
              </li>
              <li>
                <Link to="/popular">
                  <p className="popular-head">Popular</p>
                </Link>
              </li>

              <li>
                <Link to="/Account">
                  <p className="popular-head">Account</p>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onClickCross}
                  className="btn-cross"
                >
                  <AiFillCloseCircle size="24px" color="white" />
                </button>
              </li>
            </ul>
          </div>
        )
      }}
    </MovieContext.Consumer>
  )
}

export default Header
