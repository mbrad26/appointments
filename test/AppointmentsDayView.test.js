import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {
  Appointment,
  AppointmentsDayView
} from '../src/AppointmentsDayView';

describe('Appointment', () => {
  let container;
  let customer = {};

  const render = component => {
    ReactDom.render(component, container);
  };

  const appointmentTable = () =>
    container.querySelector('#appointmentView > table');

  beforeEach(() => {
    container = document.createElement('div');
  });


  it('renders a table', () => {
    render(<Appointment customer={customer} />)

    expect(appointmentTable()).not.toBeNull();
  });

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toMatch('Jordan');
  });

  it('renders customer last name', () => {
    customer = { lastName: 'Jones'};
    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toMatch('Jones');
  });

  it('renders customer telephone number', () => {
    customer = { phoneNumber: '07775688823'};
    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toMatch('07775688823');
  });

  it('renders the stylist name', () => {
    render(<Appointment customer={customer} stylist={'Sam'}/>);

    expect(appointmentTable().textContent).toMatch('Sam');
  });

  it('renders another stylist name', () => {
    render(<Appointment customer={customer} stylist={'Jo'} />);

    expect(appointmentTable().textContent).toMatch('Jo');
  });

  it('renders the salon service', () => {
    render(<Appointment customer={customer} service='Trim' />);

    expect(appointmentTable().textContent).toMatch('Trim');
  });

  it('renders another salon service', () => {
    render(<Appointment customer={customer} service='Beard-Cut'/>);

    expect(appointmentTable().textContent).toMatch('Beard-Cut');
  });

  it('renders appointment notes', () => {
    render(<Appointment customer={customer} notes='some notes' />);

    expect(appointmentTable().textContent).toMatch('some notes');
  });

  it('renders another appointment notes', () => {
    render(<Appointment customer={customer} notes='some other notes' />);

    expect(appointmentTable().textContent).toMatch('some other notes');
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

    it('renders another appointment when selected', () => {
      render(<AppointmentsDayView appointments={appointments} />);
      const button = container.querySelectorAll('button')[1];

      ReactTestUtils.Simulate.click(button);

      expect(container.textContent).toMatch('Jordan');
    });
});
