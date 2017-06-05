/* eslint-env jest */

import configureMockStore from 'redux-mock-store';
import * as actions       from '../../actions/actions';

const store = configureMockStore()();

describe('testing actions', () => {
  it('bueller? bueller? bueller?', () => {
    console.log(store);
  });
});
