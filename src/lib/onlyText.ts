import { Children, isValidElement, ReactNode, ReactText } from 'react';
import hasChildren from './hasChildren';

const childToString = (child: ReactText | boolean | undefined | {} | null): string => {
  if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
    return '';
  }

  return child.toString();
};

const onlyText = (children: ReactNode): string => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce((text: string, child: ReactNode): string => {
    let newText;

    if (isValidElement(child) && hasChildren(child)) {
      newText = onlyText(child.props.children);
    } else {
      newText = childToString(child);
    }

    return text.concat(newText);
  }, '');
};

export default onlyText;
