import {FETCH_EPISODES} from '../constants/action_types.js';

const initialState = {
  episodes: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return {
        ...state,
        episodes: action.response,
      };

    default:
      return state;
  }
};
