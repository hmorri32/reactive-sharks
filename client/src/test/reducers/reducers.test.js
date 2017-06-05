/* eslint-env jest, mocha */

import { sharks, species } from '../../reducers/reducers';

describe('testing these reducers', () => {
  it('sharks should return empty array as default', () => {
    expect(sharks(undefined, {})).toEqual([]);
  });
  it('species should return an empty array as default', () => {
    expect(species(undefined, {})).toEqual([]);
  });
});