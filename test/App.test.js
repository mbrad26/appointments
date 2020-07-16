import React from 'react';
import {
  child,
  createShallowRenderer,
  type
} from './shallowHelpers';
import { App } from '../src/App';
import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';

describe('App', () => {
  let render, elementMatching;

  beforeEach(() => {
    ({ render, elementMatching } = createShallowRenderer());
  });

  it('initially shows the AppointmentsDayViewLoader', () => {
    render(<App />);

    expect(elementMatching(type(AppointmentsDayViewLoader))).toBeDefined();
  });

  it('it has a button bar as the first child', () => {
    render(<App />);

    expect(child(0).type).toEqual('div');
    expect(child(0).props.className).toEqual('button-bar');
  });
});
