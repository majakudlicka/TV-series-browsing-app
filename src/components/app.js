import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.fetchEpisodes();
  }

  render() {
    return (
      <div className="wrapper">
        <p>App is being loaded</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.searchEpisodes);
  return {
    episodes: state.searchEpisodes,
    //   newJob: state.postJob.newJob.response,
    //   errorMessage: state.errorMessage,
    //   postJobRequestStatus: state.postJob.newJob.status,
    //   residentId,
  };
}

export default connect(mapStateToProps, actions)(App);
