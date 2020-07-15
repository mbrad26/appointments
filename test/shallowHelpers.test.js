import React from 'react';
import { childrenOf } from './shallowHelpers';

describe('childrenOf', () => {
  it('returns no children', () => {
    expect(childrenOf(<div />)).toEqual([]);
  });

  it('returns direct children', () => {
    expect(childrenOf(
      <div>
        <p>A</p>
        <p>B</p>
      </div>
    )).toEqual([<p>A</p>, <p>B</p>]);
  });

  it('returns text as an array of one item', () => {
    expect(childrenOf(<div>text</div>)).toEqual(['text']);
  });
});
