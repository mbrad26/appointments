import React from 'react';
import {
  click,
  className,
  child,
  createShallowRenderer,
  type
} from './shallowHelpers';
import { App } from '../src/App';
import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';
import { CustomerForm } from '../src/CustomerForm';

describe('App', () => {
  let render, elementMatching;

  beforeEach(() => {
    ({ render, elementMatching } = createShallowRenderer());
  });

  const beginAddingCustomerAndAppointment = () => {
    render(<App />);
    click(elementMatching(id('addCustomer')));
  };

  it('initially shows the AppointmentsDayViewLoader', () => {
    render(<App />);

    expect(elementMatching(type(AppointmentsDayViewLoader))).toBeDefined();
  });

  it('it has a button bar as the first child', () => {
    render(<App />);

    expect(child(0).type).toEqual('div');
    expect(child(0).props.className).toEqual('button-bar');
  });

  it('has a button to initiate add customer and appointment action', () => {
    render(<App />);
    const buttons = childrenOf(elementMatching(className('button-bar')));

    expect(button[0].type).toEqual('button');
    expect(button[0].props.children).toEqual('Add customer and appointment');
  });

  it('displays the CustomerForm when button is clicked', async () => {
    beginAddingCustomerAndAppointment();

    expect(elementMatching(type(CustomerForm))).toBeDefined();
  });
});
