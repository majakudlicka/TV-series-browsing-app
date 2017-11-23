import {FETCH_EPISODES} from '../constants/action_types.js';

const initialState = {
  episodes: {},
};

export default (state = initialState, action) => {
  console.log('action is', action);
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
