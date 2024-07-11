// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateLanguageTab, isActive} = props
  const {id, language} = languageDetails

  const onClickLanguageId = () => {
    updateLanguageTab(id)
  }

  const hoverButton = isActive ? 'nav-link-button active' : 'nav-link-button'

  return (
    <li className="nav-list-items">
      <button className={hoverButton} type="button" onClick={onClickLanguageId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
