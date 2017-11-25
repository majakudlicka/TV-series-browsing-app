import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';
import LoadingIndicator from 'react-loading-indicator';

class App extends Component {
  constructor() {
    super();
    this.renderEpisodes = this.renderEpisodes.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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

  renderEpisodes(episode) {
    return (
      <div className="episode col-md-4" key={episode.id}>
        <h3 className="brown_title">
          {episode.name}
        </h3>
        <img src={episode.image.medium} />
      </div>
    );
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.props.filterEpisodes(this.state.searchTerm);
  }

  onInputChange(evt) {
    let searchTerm = this.state.searchTerm;
    this.setState(
      {
        searchTerm: evt.target.value,
      },
      () => {
        this.props.filterEpisodes(this.state.searchTerm);
      }
    );
  }

  onSeasonChange(evt) {
    let selectedSeason = this.state.selectedSeason;
    this.setState({
      selectedSeason: evt.target.value,
    });
  }

  onSubmitSeason(evt) {
    evt.preventDefault();
    this.props.selectSeason(this.state.selectedSeason);
  }

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
            <form onSubmit={this.onSubmit}>
              <label className="brown_title">Search by title&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onInputChange}
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
            <form onSubmit={this.onSubmit}>
              <label className="brown_title">Search by title&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onInputChange}
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
  console.log(state.searchEpisodes.episodes);
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
