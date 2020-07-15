import React from 'react';

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
