import CartContext from '../../context/CartContext'

import './index.css'

const DishItem = props => (
  <CartContext.Consumer>
    {value => {
      const {dishDetails, increaseItemCount, decreaseItemCount} = props
      const {
        dishId,
        dishName,
        dishPrice,
        dishImage,
        dishCurrency,
        dishCalories,
        dishDescription,
        dishType,
        dishAvailability,
        addonCat,
        quantity,
      } = dishDetails

      const {addCartItem} = value
      const onClickAddToCart = () => {
        if (quantity > 0) {
          addCartItem({...dishDetails})
        }
      }

      const onClickMinus = () => {
        if (quantity > 0) {
          decreaseItemCount(dishId)
        }
      }
      const onClickPlus = () => {
        increaseItemCount(dishId)
      }

      return (
        <li className="item-container">
          <div className="dish-item">
            {dishType === 1 ? (
              <span className="dish-type-red">
                <button type="button" className="circle-red">
                  r
                </button>
              </span>
            ) : (
              <span className="dish-type-green">
                <button type="button" className="circle-green">
                  g
                </button>
              </span>
            )}
            <div className="dish-details">
              <h1 className="dish-name">{dishName}</h1>
              <p className="dish-price">
                {dishCurrency} {dishPrice}
              </p>
              <p className="dish-description">{dishDescription}</p>
              {dishAvailability ? (
                <>
                  <div className="available-container">
                    <button
                      onClick={onClickMinus}
                      type="button"
                      className="custom-button"
                    >
                      -
                    </button>
                    <p className="item-count">{quantity}</p>
                    <button
                      onClick={onClickPlus}
                      type="button"
                      className="custom-button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="add-to-cart-btn"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                </>
              ) : (
                <p className="not-available">Not available</p>
              )}
              {addonCat.length > 1 && (
                <p className="customizations">Customizations available</p>
              )}
            </div>
          </div>
          <p className="dish-calories">{`${dishCalories} calories`}</p>
          <img className="dish-image" src={dishImage} alt="dishImage" />
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default DishItem
