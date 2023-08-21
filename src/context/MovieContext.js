import React from 'react'

const CartContext = React.createContext({
  username: '',
  password: '',
  closeNavBar: false,
  triggerCloseNavBar: () => {},
  triggerChangeUsername: () => {},
  triggerLogout: () => {},
  searchInput: '',
  triggerSearchChange: () => {},
})
export default CartContext
