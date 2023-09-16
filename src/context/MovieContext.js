import React from 'react'

const MovieContext = React.createContext({
  username: '',
  password: '',
  triggerChangeUsername: () => {},
  triggerChangePassword: () => {},
  triggerLogout: () => {},
  searchInput: '',
  triggerSearchChange: () => {},
})
export default MovieContext
