import {Component} from 'react'

import Cookies from 'js-cookie'

import TrendingVideoCard from '../TrendingVideoCard'
import Load from '../Load'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Originals extends Component {
  state = {videosList: [], originalStatus: apiStatus.initial}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        originalStatus: apiStatus.success,
        videosList: updatedData,
      })
    } else {
      this.setState({originalStatus: apiStatus.failure})
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

  renderSuccess = () => {
    const {videosList} = this.state

    return (
      <>
        <TrendingVideoCard movies={videosList} />
      </>
    )
  }

  renderLoader = () => <Load />

  renderOriginalsVideos = () => {
    const {originalStatus} = this.state

    switch (originalStatus) {
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
    return <div testid="originals">{this.renderOriginalsVideos}</div>
  }
}
export default Originals
