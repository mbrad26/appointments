import React from 'react';


export const AppointmentForm = ({ selectableServices, service }) => (
  <form id='appointment'>
    <select name='service' value={service} readOnly>
      <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
    </select>
  </form>
);

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
