import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStateConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStateConstant.initial, 
    repositoryData: [], 
    setLanguageId: languageFiltersData[0].id,
    }

  componentDidMount() {
    this.getReposLink()
  }

  getReposLink = async () => {
    const {setLanguageId} = this.state
    this.setState({apiStatus: apiStateConstant.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${setLanguageId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepos => ({
        id: eachRepos.id,
        name: eachRepos.name,
        issuesCount: eachRepos.issues_count,
        forksCount: eachRepos.forks_count,
        starsCount: eachRepos.stars_count,
        avatarUrl: eachRepos.avatar_url,
      }))
      this.setState({repositoryData: updatedData, apiStatus: apiStateConstant.success})
    }
    else {
      this.setState({apiStatus: apiStateConstant.failure})
    }
  }

  renderSuccessView = () => {
    const {repositoryData} = this.state
    return (
      <ul className="repository-list-container">
        {repositoryData.map(eachreposData => (
          <RepositoryItem
            repositoryData={eachreposData}
            key={eachreposData.id}
          />
        ))}
      </ul>
    )
  }

  updateLanguageTab = id => {
    this.setState({setLanguageId: id}, this.getReposLink)
  }

  renderLanguageFilterList = () => {
    const {setLanguageId} = this.state
    return (
      <ul className="nav-bar-list-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageDetails={eachLanguage}
            key={eachLanguage.id}
            updateLanguageTab={this.updateLanguageTab}
            isActive={eachLanguage.id === setLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-view-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch(apiStatus) {
      case apiStateConstant.success:
        return this.renderSuccessView()
      case apiStateConstant.failure:
        return this.renderFailureView()
      case apiStateConstant.inProgress:
        return this.renderLoadingView()
      default:
        return ''
    }

  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageFilterList()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
