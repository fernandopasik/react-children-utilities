import { Children, isValidElement, type ReactNode } from 'react';

export const childToString = (child?: ReactNode): string => {
  if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
    return '';
  }

  if (JSON.stringify(child) === '{}') {
    return '';
  }

  return (child as number | string).toString();
};

interface ExpectedChildProps {
  children?: React.ReactNode | React.ReactNode[];
}

const onlyText = (children: ReactNode | ReactNode[]): string => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce((text: string, child: ReactNode): string => {
    let newText = '';

    if (isValidElement<ExpectedChildProps>(child)) {
      newText = 'children' in child.props ? onlyText(child.props.children) : '';
    } else {
      newText = childToString(child);
    }

    return text.concat(newText);
  }, '');
};

export default onlyText;
