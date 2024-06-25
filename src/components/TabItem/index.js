import './index.css'

const TabItem = props => {
  const {tabDetails, updateTabId, tabId} = props
  const {menuCategory, menuCategoryId} = tabDetails
  const onClickTabItem = () => {
    updateTabId(menuCategoryId)
  }
  const activeTabId = tabId === menuCategoryId ? 'active-tab' : ''

  return (
    <li>
      <button
        className={`tab-list-item ${activeTabId}`}
        onClick={onClickTabItem}
        type="button"
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
