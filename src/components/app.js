import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';
import LoadingIndicator from 'react-loading-indicator';

class App extends Component {
  constructor() {
    super();
    this.renderEpisodes = this.renderEpisodes.bind(this);
    this.onSubmitTitle = this.onSubmitTitle.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubmitSeason = this.onSubmitSeason.bind(this);
    this.onSeasonChange = this.onSeasonChange.bind(this);

    this.state = {
      searchTerm: '',
      selectedSeason: '',
    };
  }

  componentWillMount() {
    this.props.fetchEpisodes();
  }

  //Renders individual episode
  renderEpisodes(episode) {
    return (
      <div className="episode col-md-4" key={episode.id}>
        <h3 className="brown_title">
          {episode.name}
        </h3>
        <img alt="episode_image" src={episode.image.medium} />
      </div>
    );
  }

  //Filetrs episodes by title on front end on submit
  onSubmitTitle(evt) {
    evt.preventDefault();
    this.props.filterEpisodes(this.state.searchTerm);
  }

  //Sends request to backend for list of episodes filtered by season
  onSubmitSeason(evt) {
    evt.preventDefault();
    this.props.selectSeason(this.state.selectedSeason);
  }

  //Filetrs episodes by title on front end on input change
  onTitleChange(evt) {
    this.setState(
      {
        searchTerm: evt.target.value,
      },
      () => {
        this.props.filterEpisodes(this.state.searchTerm);
      }
    );
  }

  //Updates 'selectedSeason' component state
  onSeasonChange(evt) {
    this.setState({
      selectedSeason: evt.target.value,
    });
  }

  //If filteredEpisodes are not null (if user searches by title), filterEpisodes are rendered;
  //otherwise entire list of episodes from backend is rendered
  render() {
    let {episodes, filteredEpisodes} = this.props;

    if (!episodes) {
      return (
        <div className="flex-container">
          <LoadingIndicator />
        </div>
      );
    } else if (filteredEpisodes !== null) {
      return (
        <div className="wrapper">
          <div className="flex-container">
            <form onSubmit={this.onSubmitTitle}>
              <label className="brown_title">Search by title&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onTitleChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>
            <form onSubmit={this.onSubmitSeason}>
              <label className="brown_title">
                Search by season:&nbsp;&nbsp;{' '}
              </label>
              <input
                type="text"
                id="season"
                name="season"
                value={this.state.selectedSeason}
                onChange={this.onSeasonChange}
              />
            </form>
            <button type="submit" onClick={this.props.fetchEpisodes}>
              Refresh
            </button>
          </div>

          <div className="container">
            <div className="row">
              {filteredEpisodes.map(this.renderEpisodes)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <div className="flex-container">
            <form onSubmit={this.onSubmitTitle}>
              <label className="brown_title">Search by title&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onTitleChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>
            <form onSubmit={this.onSubmitSeason}>
              <label className="brown_title">
                Search by season:&nbsp;&nbsp;{' '}
              </label>
              <input
                type="text"
                id="season"
                name="season"
                value={this.state.selectedSeason}
                onChange={this.onSeasonChange}
              />
            </form>
            <button type="submit" onClick={this.props.fetchEpisodes}>
              Refresh
            </button>
          </div>
          <div className="container">
            <div className="row">
              {episodes.map(this.renderEpisodes)}
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  //Resets the list of episodes  - gets rid of the buggy behaviour in case user wants to
  // filter by season after filtering by title
  if (
    state.searchEpisodes.filteredEpisodes &&
    state.searchEpisodes.filteredEpisodes.length ===
      state.searchEpisodes.episodes.length
  ) {
    state.searchEpisodes.filteredEpisodes = null;
  }
  return {
    episodes: state.searchEpisodes.episodes,
    filteredEpisodes: state.searchEpisodes.filteredEpisodes,
  };
}

export default connect(mapStateToProps, actions)(App);
