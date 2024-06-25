import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import TabItem from '../TabItem'
import DishIem from '../DishItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Restaurant extends Component {
  state = {
    dishesData: [],
    apiStatus: apiStatusConstants.initial,
    tabId: '',
    itemCount: 0,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      'https://run.mocky.io/v3/2477b10c-ee18-4487-9962-1b3d073432c4',
    )
    const data = await response.json()
    if (response.ok) {
      const tableMenuList = data[0].table_menu_list
      const updatedData = tableMenuList.map(eachValue => ({
        menuCategory: eachValue.menu_category,
        menuCategoryId: eachValue.menu_category_id,
        menuCategoryImage: eachValue.menu_category_image,
        nextUrl: eachValue.nexturl,
        categoryDishes: eachValue.category_dishes.map(eachItem => ({
          dishId: eachItem.dish_id,
          dishName: eachItem.dish_name,
          dishPrice: eachItem.dish_price,
          dishImage: eachItem.dish_image,
          dishCurrency: eachItem.dish_currency,
          dishCalories: eachItem.dish_calories,
          dishDescription: eachItem.dish_description,
          dishAvailability: eachItem.dish_Availability,
          dishType: eachItem.dish_Type,
          nexturl: eachItem.nextUrl,
          addonCat: eachItem.addonCat,
          itemAdded: 0,
        })),
      }))
      this.setState({
        dishesData: updatedData,
        apiStatus: apiStatusConstants.success,
        tabId: updatedData[0].menuCategoryId,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateTabId = id => {
    this.setState({tabId: id})
  }

  increaseItemCount = id => {
    const {tabId} = this.state
    this.setState(prevState => ({
      dishesData: prevState.dishesData.map(eachItem => {
        if (eachItem.menuCategoryId === tabId) {
          return {
            ...eachItem,
            categoryDishes: eachItem.categoryDishes.map(eachValue => {
              if (eachValue.dishId === id) {
                return {...eachValue, itemAdded: eachValue.itemAdded + 1}
              }
              return {...eachValue}
            }),
          }
        }
        return {...eachItem}
      }),
      itemCount: prevState.itemCount + 1,
    }))
  }

  decreaseItemCount = id => {
    const {tabId} = this.state
    this.setState(prevState => ({
      dishesData: prevState.dishesData.map(eachItem => {
        if (eachItem.menuCategoryId === tabId) {
          return {
            ...eachItem,
            categoryDishes: eachItem.categoryDishes.map(eachValue => {
              if (eachValue.dishId === id) {
                return {...eachValue, itemAdded: eachValue.itemAdded - 1}
              }
              return {...eachValue}
            }),
          }
        }
        return {...eachItem}
      }),
      itemCount: prevState.itemCount - 1,
    }))
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {dishesData, tabId, itemCount} = this.state
    const filterData = dishesData.filter(obj => obj.menuCategoryId === tabId)
    const filterList = filterData[0].categoryDishes
    console.log(filterList)
    return (
      <>
        <Header itemCount={itemCount} />
        <ul className="tabs-list-container">
          {dishesData.map(eachItem => (
            <TabItem
              key={eachItem.menuCategoryId}
              tabDetails={eachItem}
              updateTabId={this.updateTabId}
              tabId={tabId}
            />
          ))}
        </ul>
        <ul className="items-list-container">
          {filterList.map(eachItem => (
            <DishIem
              key={eachItem.dishId}
              dishDetails={eachItem}
              increaseItemCount={this.increaseItemCount}
              decreaseItemCount={this.decreaseItemCount}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return this.renderLoadingView()
    }
  }
}

export default Restaurant
