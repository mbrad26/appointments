import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('AppointmentForm', () => {
  let render;
  let container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('appointment').elements[name];
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(
      option => option.textContent === textContent
    );
  };

  it('renders a form', () => {
    render(<AppointmentForm />);

    expect(form('appointment')).not.toBeNull();
  });

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />);

      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    });

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);

      expect(field('service').childNodes[0].value).toEqual('');
      expect(field('service').childNodes[0].selected).toBeTruthy();
    });

    it('lists all salon services', () => {
      const selectableServices = ['Trim', 'Blow-dry'];
      render(<AppointmentForm selectableServices={selectableServices} />);
      const optionNodes = Array.from(field('service').childNodes);
      const renderedServices = optionNodes.map(node => node.textContent);

      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it('pre-selects the existing value', () => {
      const services = ['Trim', 'Blow-dry'];
      render(<AppointmentForm selectableServices={services} service='Blow-dry' />);
      const option = findOption(field('service'), 'Blow-dry');

      expect(option.selected).toBeTruthy();
    });

    it('renders a label', () => {
      render(<AppointmentForm />);

      expect(container.querySelector('label[for="service"]')).not.toBeNull();
      expect(container.querySelector('label[for="service"]').textContent).toEqual('Salon service');
    });

    it('assigns an id that matches the label id', () => {
      render(<AppointmentForm />);

      expect(field('service').id).toEqual('service');
    });

    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(<AppointmentForm
          service='Blow-dry'
          onSubmit={({ service }) => expect(service).toEqual('Blow-dry')}
        />
      );

      await ReactTestUtils.Simulate.submit(form('appointment'));
    });

    it('saves a new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <AppointmentForm
          service='Blow-dry'
          onSubmit={({ service }) => expect(service).toEqual('Cut')}
        />
      );
      await ReactTestUtils.Simulate.change(field('service'), {
        target: { value: 'Cut', name: 'service' }
      });
      await ReactTestUtils.Simulate.submit(form('appointment'));
    });
  });

  describe('time slot table', () => {
    it('renders a table for time slots', () => {
      render(<AppointmentForm />);

      expect(container.querySelector('table#time-slots')).not.toBeNull();
    });
  });
});
