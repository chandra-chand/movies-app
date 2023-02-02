import React from 'react'

const MovieContext = React.createContext({
  username: '',
  password: '',
  closeNavbar: false,
  changeUsername: () => {},
  changePassword: () => {},
  clickLogout: () => {},
  searchInput: '',
  changeSearchInput: () => {},
})
export default MovieContext
