import { Children, ReactNode, ReactElement, ReactText, isValidElement } from 'react';
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

    if (!hasChildren(child)) {
      newText = childToString(child);
    } else {
      newText = onlyText((child as ReactElement).props.children);
    }

    return text.concat(newText);
  }, '');
};

export default onlyText;
