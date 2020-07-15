import React from 'react';
import { childrenOf } from './shallowHelpers';

describe('childrenOf', () => {
  it('returns no children', () => {
    expect(childrenOf(<div />)).toEqual([]);
  });
});
