import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('CustomerForm', () => {
  let container;
  let render;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);

  const field = name => form('customer').elements[name];

  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`)


  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);

      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm { ...{[fieldName]: 'value'} } />);

      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, content) =>
    it('renders a label', () => {
      render(<CustomerForm />);

      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(content);
    });

  const itAsignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it('it assigns an id that matches the label id', () => {
      render(<CustomerForm />);

      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(<CustomerForm
                { ...{[fieldName]: 'existingValue'} }
                onSubmit={props =>
                  expect(props[fieldName]).toEqual(value)
                }
              />
            );

      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(<CustomerForm
                { ...{[fieldName]: 'existingValue' } }
                onSubmit={props =>
                  expect(props[fieldName]).toEqual(value)
                }
              />
             );

      await ReactTestUtils.Simulate.change(field('firstName'), {
        target: { value: value }
      })
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  it('renders a form', () => {
    render(<CustomerForm />);

    expect(form('customer')).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAsignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'existingValue');
    itSubmitsNewValue('firstName', 'anotherFirstName');
  });
});
