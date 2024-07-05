import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiShoppingCart} from 'react-icons/fi'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <nav className="header-container">
          <Link to="/" className="home-link">
            <h1 className="restaurant-name">UNI Resto Cafe</h1>
          </Link>
          <div className="orders-container">
            <p className="orders">My Orders</p>
            <Link to="/cart" className="cart-link">
              <FiShoppingCart className="cart" />
              <button
                data-testid="cart"
                type="button"
                className="cart-items-count"
              >
                {cartItemsCount}
              </button>
            </Link>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
