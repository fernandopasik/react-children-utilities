import { Children, isValidElement, type ReactNode } from 'react';
import hasChildren from './hasChildren.ts';

export const childToString = (child?: ReactNode): string => {
  if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
    return '';
  }

  if (JSON.stringify(child) === '{}') {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return child.toString();
};

const onlyText = (children: ReactNode | ReactNode[]): string => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce((text: string, child: ReactNode): string => {
    let newText = '';

    if (hasChildren(child)) {
      newText = onlyText(child.props.children);
    } else if (isValidElement(child)) {
      newText = '';
    } else {
      newText = childToString(child);
    }

    return text.concat(newText);
  }, '');
};

export default onlyText;
