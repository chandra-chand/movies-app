import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Load from '../Load'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {videosList: [], popularStatus: apiStatus.initial}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        popularStatus: apiStatus.success,
        videosList: updatedData,
      })
    } else {
      this.setState({popularStatus: apiStatus.failure})
    }
  }

  onClickTryAgain = () => {
    this.getVideos()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/djo72ivyd/image/upload/v1675304366/error_Icon_jurt8j.png"
        alt="error"
      />
      <h1 className="failure-head">Something went wrong. Please try again</h1>
      <button className="button" type="button" onClick={this.onClickTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {videosList} = this.state
    return (
      <>
        <h1 className="explore-movies-here">Explore the Popular Movies Here</h1>
        <ul className="popular-ul-container">
          {videosList.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id}>
              <li className="popular-li-item" key={each.id}>
                <img
                  className="popular-poster"
                  src={each.posterPath}
                  alt={each.title}
                />
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => <Load />

  renderTrendingVideos = () => {
    const {popularStatus} = this.state

    switch (popularStatus) {
      case apiStatus.success:
        return this.renderSuccess()
      case apiStatus.failure:
        return this.renderFailure()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div testid="trending">{this.renderTrendingVideos}</div>
  }
}
export default Trending
