import React from 'react'

/* ha */

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
