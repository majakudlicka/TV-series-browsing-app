import {combineReducers} from 'redux';

import searchEpisodes from './search_episodes.js';

console.log('searchPeiosedes is ', searchEpisodes);

export default combineReducers({
  searchEpisodes,
});
