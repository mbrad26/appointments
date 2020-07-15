import React from 'react';

export const childrenOf = element => {
  if (!element.props.children) {
    return []
  }
  if (typeof element.props.children === 'string') {
    return [element.props.children]
  }
  return element.props.children;
};
