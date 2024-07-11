// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = repositoryData
  return (
    <li className="repos-list-items">
      <img src={avatarUrl} className="repo-image" alt={name} />
      <h1 className="reposName">{name}</h1>
      <div className="repos-info-bottom-container">
        <div className="repos-info-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars icon-image"
          />
          <p className="fort count">{starsCount} stars</p>
        </div>
        <div className="repos-info-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="forks icon-image"
          />
          <p className="fort count">{forksCount} forks</p>
        </div>
        <div className="repos-info-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="issues icon-image"
          />
          <p className="fort count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
