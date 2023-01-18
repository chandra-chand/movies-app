import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-head">Lost Your Way ?</h1>
    <p className="not-para">
      we are sorry the page you requested could not be found <br /> Please go
      back to the homepage.
    </p>
    <div>
      <button type="button" className="not-button">
        Go to Home
      </button>
    </div>
  </div>
)
export default NotFound
