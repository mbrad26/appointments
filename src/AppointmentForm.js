import React, { useState } from 'react';


export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {
  const [appointment, setAppointment] = useState({ service })

  return (
    <form id='appointment' onSubmit={() => onSubmit(appointment)}>
      <label htmlFor='service'>Salon service</label>
      <select
        id='service'
        name='service'
        value={service}
        readOnly>
        <option />
          {selectableServices.map(s => (
            <option key={s}>{s}</option>
          ))}
      </select>
    </form>
  );
};

// default props to be used when required props are not explicitly provided
AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
};
