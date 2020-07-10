import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  let render;
  let container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('renders a form', () => {
    render(<AppointmentForm />);

    expect(container.querySelector('form[id="appointment"]')).not.toBeNull();
  });

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />);

      expect(container.querySelector('form[id="appointment"]').elements.service).not.toBeNull();
      expect(container.querySelector('form[id="appointment"]').elements.service.tagName).toEqual('SELECT');
    });
  });
});
