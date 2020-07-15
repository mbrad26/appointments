import React from 'react';

export const childrenOf = element => {
  if (typeof element === 'string') {
    return [];
  }
  if (!element.props.children) {
    return [];
  }
  if (typeof element.props.children === 'string') {
    return [element.props.children];
  }
  return element.props.children;
};
