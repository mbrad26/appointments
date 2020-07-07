import React from 'react';

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');
  return `${h}:${m}`;
}

export const Appointment = ({ customer }) => (
  <div>{ customer.firstName }</div>
);

export const AppointmentsDayView = ({ appointments }) => (
  <div id='appointmentsDayView'>
    <ol>
      { appointments.map(appointment => (
        <li key={appointment.startsAt}>
          {appointmentTimeOfDay(appointment.startsAt)}
        </li>
      )) }
    </ol>
    <p>There are no appointments scheduled for today.</p>
  </div>
);
