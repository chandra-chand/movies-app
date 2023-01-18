import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MoviesHome extends Component {
  state = {apiStatus: apiStatusConstants.initial, videos: []}

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
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
        videos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    return (
      <div className="movies-home-container">
        <Header />
        <div className="movies-super-man-container">
          <h1 className="movies-super-man-head">Super Man</h1>
          <p className="movies-super-man-para">
            Superman is a fictional superhero who first <br />
            appeared in American comic books published by
            <br /> DC Comics.
          </p>
          <button className="movies-super-man-button" type="button">
            Play
          </button>
        </div>
      </div>
    )
  }
}
export default MoviesHome
