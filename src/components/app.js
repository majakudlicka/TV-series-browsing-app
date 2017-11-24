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

    this.state = {
      searchTerm: '',
    };
  }

  componentWillMount() {
    this.props.fetchEpisodes();
  }

  renderEpisodes(episode) {
    return (
      <div className="episode_wrapper" key={episode.id}>
        <h3 className="pt-2 brown_title">
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

  render() {
    let {episodes, filteredEpisodes} = this.props;

    if (!episodes) {
      return (
        <div className="register_container flex-container">
          <LoadingIndicator />
        </div>
      );
    } else if (filteredEpisodes.length > 0) {
      return (
        <div className="wrapper">
          <form onSubmit={this.onSubmit}>
            <label className="control-label" htmlFor="Job Title">
              Search by title
            </label>
            <input
              className="form-control"
              id="Search Title"
              type="text"
              value={this.state.searchTerm}
              onChange={this.onInputChange}
            />
            <input type="submit" />
          </form>
          <ul className="search_results_ul">
            {filteredEpisodes.map(this.renderEpisodes)}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <form onSubmit={this.onSubmit}>
            <label className="control-label" htmlFor="Job Title">
              Search by title
            </label>
            <input
              className="form-control"
              id="Search Title"
              type="text"
              value={this.state.searchTerm}
              onChange={this.onInputChange}
            />
            <input type="submit" />
          </form>
          <ul className="search_results_ul">
            {episodes.map(this.renderEpisodes)}
          </ul>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log(state.searchEpisodes.episodes);
  return {
    episodes: state.searchEpisodes.episodes,
    filteredEpisodes: state.searchEpisodes.filteredEpisodes,
  };
}

export default connect(mapStateToProps, actions)(App);
