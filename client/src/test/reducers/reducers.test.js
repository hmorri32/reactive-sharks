/* eslint-env jest, mocha */

import { sharks, species } from '../../reducers/reducers';

describe('testing this reducers', () => {
  it('sharks should return empty array as default', () => {
    expect(sharks(undefined, {})).toEqual([]);
    
  });
});