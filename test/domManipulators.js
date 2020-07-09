import ReactDom from 'react-dom';

export const createContainer = () => {
  const container = document.createElement('div');

  return {
    render: component => ReactDom.render(component, container),
    container
  };
};
