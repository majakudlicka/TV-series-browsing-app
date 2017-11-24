import {FETCH_EPISODES} from '../constants/action_types.js';
import {FILTER_EPISODES} from '../constants/action_types.js';

const initialState = {
  episodes: [],
  filteredEpisodes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return {
        ...state,
        episodes: action.response,
      };
    case FILTER_EPISODES:
      let filteredEpisodes = state.episodes.filter(episode => {
        return episode.name.includes(action.response);
      });
      return {
        ...state,
        filteredEpisodes: filteredEpisodes,
      };

    default:
      return state;
  }
};
