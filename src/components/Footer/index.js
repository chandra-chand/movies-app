import {FaGoogle, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <FaGoogle size={22} className="footer-icon" />
      <FaTwitter size={22} className="footer-icon" />
      <FaInstagram size={22} className="footer-icon" />
      <FaYoutube size={22} className="footer-icon" />
    </div>
    <p className="footer-para">Contact Us</p>
  </>
)
export default Footer
