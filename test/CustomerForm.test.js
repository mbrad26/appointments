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

  it('renders a form', () => {
    render(<CustomerForm />);

    expect(form('customer')).not.toBeNull();
  });

  describe('first name field', () => {
    it('renders as a text box', () => {
      render(<CustomerForm />);

      expectToBeInputFieldOfTypeText(field('firstName'));
    });

    it('includes the existing value', () => {
      render(<CustomerForm firstName='Ashley' />);

      expect(field('firstName').value).toEqual('Ashley');
    });

    it('renders a label', () => {
      render(<CustomerForm />);

      expect(labelFor('firstName')).not.toBeNull();
      expect(labelFor('firstName').textContent).toEqual('First name');
    });

    it('it assigns an id that matches the label id', () => {
      render(<CustomerForm />);

      expect(field('firstName').id).toEqual('firstName');
    });

    it('saves existing first name when submitted', async() => {
      expect.hasAssertions();
      render(<CustomerForm
                firstName='Ashley'
                onSubmit={({ firstName }) =>
                  expect(firstName).toEqual('Ashley')
                }
              />
            );

      await ReactTestUtils.Simulate.submit(form('customer'));
    });

    it('saves new first name when submitted', async () => {
      expect.hasAssertions();
      render(<CustomerForm firstName='Ashley' onSubmit={({ firstName }) =>
            expect(firstName).toEqual('Jamie')
          }
        />
      );

      await ReactTestUtils.Simulate.change(field('firstName'), {
        target: { value: 'Jamie' }
      })
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  });
});
