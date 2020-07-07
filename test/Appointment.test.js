import React from 'react';
import ReactDom from 'react-dom';
import {
  Appointment,
  AppointmentsDayView
} from '../src/Appointment';

describe('Appointment', () => {
  let customer;
  let container;

  const render = component => {
    ReactDom.render(component, container);
  };

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch('Jordan');
  });
});

describe('AppointmentsDayView', () => {
    let container;

    const render = component => {
      ReactDom.render(component, container);
    };

    const today = new Date();

    const appointments = [
      { startsAt: today.setHours(12, 0),
        customer: { firstName: 'Ashley' }
       },
      { startsAt: today.setHours(13, 0),
        customer: { firstName: 'Jordan' }
      }
    ];

    beforeEach(() => {
      container = document.createElement('div');
    });

    it('renders a div with the right id', () => {
      render(<AppointmentsDayView appointments={ [] }/>);

      expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it('renders multiple appointments in an ol element', () => {
      render(<AppointmentsDayView appointments={appointments} />);

      expect(container.querySelector('ol')).not.toBeNull();
      expect(container.querySelector('ol').children).toHaveLength(2);
    });

    it('renders each appointment in a li', () => {
      render(<AppointmentsDayView appointments={appointments} />);

      expect(container.querySelectorAll('li')).toHaveLength(2);
      expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
      expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    });

    it('initially shows a message saying there are no appointments', () => {
      render(<AppointmentsDayView appointments={ [] } />),

      expect(container.textContent).toMatch('There are no appointments scheduled for today.')
    });

    it('selects the first appointment by default', () => {
      render(<AppointmentsDayView appointments={appointments} />);

      expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element in each li', () => {
      render(<AppointmentsDayView appointments={appointments} />);

      expect(container.querySelectorAll('li > button')).toHaveLength(2);
      expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
    });
});
