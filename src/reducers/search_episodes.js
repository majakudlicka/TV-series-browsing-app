import {FETCH_EPISODES} from '../constants/action_types.js';
import {FILTER_EPISODES} from '../constants/action_types.js';

const initialState = {
  episodes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return {
        ...state,
        episodes: action.response,
      };
    case FILTER_EPISODES:
      console.log('state.episodes are ', state.episodes);
      let filteredEpisodes = state.episodes.filter(episode => {
        return episode.name.includes(action.response);
      });
      return {
        ...state,
        episodes: filteredEpisodes,
      };

    default:
      return state;
  }
};
