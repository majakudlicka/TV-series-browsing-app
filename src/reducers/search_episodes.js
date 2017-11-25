import {
  FETCH_EPISODES,
  FILTER_EPISODES,
  SELECT_SEASON,
} from '../constants/action_types.js';

const initialState = {
  episodes: [],
  filteredEpisodes: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return {
        ...state,
        episodes: action.response,
      };
    case SELECT_SEASON:
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
