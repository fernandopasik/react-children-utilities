import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import hasChildren from './hasChildren.js';

export const childToString = (child?: ReactNode): string => {
  if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
    return '';
  }

  if (JSON.stringify(child) === '{}') {
    return '';
  }

  return (child as number | string).toString();
};

const onlyText = (children: ReactNode | ReactNode[]): string => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce((text: string, child: ReactNode): string => {
    let newText = '';

    if (isValidElement(child) && hasChildren(child)) {
      newText = onlyText(child.props.children);
    } else if (isValidElement(child) && !hasChildren(child)) {
      newText = '';
    } else {
      newText = childToString(child);
    }

    return text.concat(newText);
  }, '');
};

export default onlyText;
