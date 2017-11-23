import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';
import LoadingIndicator from 'react-loading-indicator';

class App extends Component {
  constructor() {
    super();
    this.renderEpisodes = this.renderEpisodes.bind(this);
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
        <img src={episode.image} />
      </div>
    );
  }

  render() {
    let {episodes} = this.props;

    if (!episodes) {
      return (
        <div className="register_container flex-container">
          <LoadingIndicator />
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <ul className="search_results_ul">
            {episodes.map(this.renderEpisodes)}
          </ul>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log(state.searchEpisodes);
  return {
    episodes: state.searchEpisodes.episodes,
    //   newepisode: state.postepisode.newepisode.response,
    //   errorMessage: state.errorMessage,
    //   postepisodeRequestStatus: state.postepisode.newepisode.status,
    //   residentId,
  };
}

export default connect(mapStateToProps, actions)(App);
