import './index.css'
import {FiShoppingCart} from 'react-icons/fi'

const Header = props => {
  const {itemCount} = props

  return (
    <nav className="header-container">
      <h1 className="restaurant-name">UNI Resto Cafe</h1>
      <div className="orders-container">
        <p className="orders">My Orders</p>
        <FiShoppingCart className="cart" />
        <button type="button" className="cart-items-count">
          {itemCount}
        </button>
      </div>
    </nav>
  )
}

export default Header
