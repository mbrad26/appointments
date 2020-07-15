import React from 'react';

export const childrenOf = element => {
  if (!element.props.children) {
    return []
  }
  return element.props.children;
};
