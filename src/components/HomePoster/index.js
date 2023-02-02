import './index.css'

const HomePoster = props => {
  const {bgPoster} = props
  const {backdropPath, overview, title} = bgPoster

  return (
    <>
      <div
        className="poster-container"
        alt={title}
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no - repeat',
          height: '100%',
        }}
      >
        <div className="home-header-container">
          <h1 className="home-header">{title}</h1>
          <p className="home-para">{overview}</p>
          <button type="button" className="home-button">
            Play
          </button>
        </div>
      </div>
    </>
  )
}
export default HomePoster
