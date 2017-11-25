import * as types from '../constants/action_types.js';
import * as actions from '../actions/fetchData.js';

//Tests for actions
describe('actions', () => {
  it('should create an action with a response being a passed movie tittle', () => {
    const text = 'Example title';
    const expectedAction = {
      type: types.FILTER_EPISODES,
      response: text,
    };
    expect(actions.filterEpisodes('Example title')).toEqual(expectedAction);
  });

  it('(fetchEpisodes) should return a dispatch function', () => {
    expect(typeof actions.fetchEpisodes()).toEqual('function');
  });

  it('(selectSeason) should return a dispatch function', () => {
    expect(typeof actions.selectSeason()).toEqual('function');
  });
});
