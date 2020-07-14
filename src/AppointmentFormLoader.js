import React, { useEffect } from 'react';

export const AppointmentFormLoader = () => {

  useEffect(() => {
    const fetchAvailableTimeSlots = () => {
      window.fetch('/availableTimeSlots', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      });
    };
    fetchAvailableTimeSlots();
  }, []);

  return null;
};
