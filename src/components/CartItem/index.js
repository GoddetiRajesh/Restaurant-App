import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {dishId, dishName, dishPrice, dishImage, quantity} = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const onClickMinus = () => {
        decrementCartItemQuantity(dishId, quantity)
      }

      const onClickPlus = () => {
        incrementCartItemQuantity(dishId)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{dishName}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                onClick={onClickMinus}
                type="button"
                className="quantity-controller-button"
              >
                -
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                onClick={onClickPlus}
                type="button"
                className="quantity-controller-button"
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">SAR {dishPrice * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            x
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
