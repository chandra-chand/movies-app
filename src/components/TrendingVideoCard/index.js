import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class TrendingVideoCard extends Component {
  renderSlider = () => {
    const {movies} = this.props

    return (
      <Slider {...settings}>
        {movies.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id}>
            <div>
              <img
                src={each.posterPath}
                alt={each.title}
                className="slick-img"
              />
            </div>
          </Link>
        ))}
      </Slider>
    )
  }

  render() {
    return (
      <div className="slick-container">
        <div>{this.renderSlider()}</div>
      </div>
    )
  }
}
export default withRouter(TrendingVideoCard)
