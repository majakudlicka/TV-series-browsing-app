import axios from 'axios';
import {FETCH_EPISODES} from '../constants/action_types.js';

export const fetchEpisodes = () => dispatch => {
  dispatch({
    type: FETCH_EPISODES,
    status: 'pending',
  });

  axios
    .get('http://localhost:8080/api')
    .then(response =>
      dispatch({
        type: FETCH_EPISODES,
        status: 'success',
        response: response.data,
      })
    )
    .catch(err => {
      dispatch({
        type: FETCH_EPISODES,
        status: 'error',
        error: err,
      });
      console.log(err);
    });
};
