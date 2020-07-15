import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

const elementsMatching = (element, matcherFn) => {
  if (matcherFn(element)) {
    return [element];
  }

  return childrenOf(element).reduce(
    (acc, child) => [
      ...acc,
      ...elementsMatching(child, matcherFn)
    ],
    []
  );
};

export const createShallowRenderer = () => {
  let renderer = new ShallowRenderer();

  return {
    render: component => renderer.render(component),
    elementsMatching: matcherFn =>
      elementsMatching(renderer.getRenderOutput(), matcherFn),
    child: n => childrenOf(renderer.getRenderOutput())[n]
  };
};

export const childrenOf = element => {
  if (typeof element === 'string') {
    return [];
  }
  const { props: { children } } = element;
  if (!children) {
    return [];
  }
  if (typeof children === 'string') {
    return [children];
  }
  if (Array.isArray(children)) {
    return children;
  }
  return [children];
};
