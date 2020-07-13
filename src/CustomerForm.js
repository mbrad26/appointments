import React, { useState } from 'react';

export const CustomerForm = ({firstName, lastName, phoneNumber, onSave}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
    if (result.ok) {
      const customerWithId = await result.json();
      onSave(customerWithId);
    }
  };

  const handleChangeFirstName = ({ target }) =>
    setCustomer(customer => ({
      ...customer,
      firstName: target.value
    }));

  const handleChangeLastName = ({ target }) =>
    setCustomer(customer => ({
      ...customer,
      lastName: target.value
    }));

  const handleChangePhoneNumber = ({ target }) =>
    setCustomer(customer => ({
      ...customer,
      phoneNumber: target.value
    }));

  return (
    <form id="customer" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
        onChange={handleChangeFirstName}
      />

      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={lastName}
        onChange={handleChangeLastName}
      />

      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={phoneNumber}
        onChange={handleChangePhoneNumber}
      />

      <input type="submit" value="Add"/>
    </form>
  );
};

CustomerForm.defaultProps = {
  onSave: () => {}
};
