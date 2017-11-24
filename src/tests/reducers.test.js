import reducer from '../reducers/search_episodes.js';
import * as types from '../constants/action_types.js';

describe('search episodes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      episodes: [],
    });
  });

  it('should handle FETCH_EPISODES', () => {
    expect(
      reducer(
        {},
        {
          type: types.FETCH_EPISODES,
          status: 'success',
          response: [
            {
              id: 1,
              name: 'a',
              season: 2,
            },
            {
              id: 2,
              name: 'b',
              season: 3,
            },
          ],
        }
      )
    ).toEqual({
      episodes: [
        {
          id: 1,
          name: 'a',
          season: 2,
        },
        {
          id: 2,
          name: 'b',
          season: 3,
        },
      ],
    });
  });

  it('should handle FILTER_EPISODES', () => {
    expect(
      reducer(
        {
          episodes: [
            {
              id: 1,
              name: 'a',
              season: 2,
            },
            {
              id: 2,
              name: 'b',
              season: 3,
            },
          ],
        },
        {
          type: types.FILTER_EPISODES,
          response: 'b',
        }
      )
    ).toEqual({
      episodes: [
        {
          id: 2,
          name: 'b',
          season: 3,
        },
      ],
    });
  });
});
