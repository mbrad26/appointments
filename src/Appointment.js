import React from 'react';

export const Appointment = ({ customer }) => (
  <div>{ customer.firstName }</div>
);

export const AppointmentsDayView = () => (
  <div id='appointmentsDayView'></div>
);
