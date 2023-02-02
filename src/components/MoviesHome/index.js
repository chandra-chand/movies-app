import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import Trending from '../Trending'
import Originals from '../Originals'
import Load from '../Load'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MoviesHome extends Component {
  state = {apiStatus: apiStatusConstants.initial, poster: []}

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        poster: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickPlay = () => {
    this.poster()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/djo72ivyd/image/upload/v1675304366/error_Icon_jurt8j.png"
        alt="error"
      />
      <h1 className="failure-head">Something went wrong. Please try again</h1>
      <button className="button" type="button" onClick={this.onClickPlay}>
        Try Again
      </button>
    </div>
  )

  renderLoader = () => <Load />

  renderSuccess = () => {
    const {poster} = this.state
    const randomPoster = poster[Math.floor(Math.random() * poster.length)]
    const bgImage = randomPoster.backdropPath
    const titleHead = randomPoster.title
    const overviewPara = randomPoster.overview

    return (
      <div
        className="poster-container"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div className="home-container">
          <h1 className="home-head">{titleHead}</h1>
          <p className="home-para">{overviewPara}</p>
          <button type="button" className="home-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderPoster = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="movies-home-container">
          {this.renderPoster()}
          <h1 className="trending">Trending</h1>
          <Trending />
          <h1 className="originals">Originals</h1>
          <Originals />
        </div>
        <Footer />
      </>
    )
  }
}
export default MoviesHome
