import {Link} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'

import './index.css'

const Header = () => (
  <nav className="header-container">
    <Link to="/" className="link-item">
      <img
        src="https://res.cloudinary.com/djo72ivyd/image/upload/v1674027400/Group_7399_donaa1.png"
        alt="movies"
        className="movies-logo"
      />
    </Link>

    <ul className="home-popular-container">
      <Link to="/" className="link-item">
        <li className="home-list">Home</li>
      </Link>
      <Link to="/popular" className="link-item">
        <li className="popular-list">Popular</li>
      </Link>
    </ul>
    <div>
      <Link to="/search" className="link-item">
        <BsSearch size={18} className="search-icon" />
      </Link>
      <Link to="/account" className="link-item">
        <img
          src="https://res.cloudinary.com/djo72ivyd/image/upload/v1674034589/Mask_Group_gsjtri.png"
          alt="account"
        />
      </Link>
    </div>
  </nav>
)

export default Header
