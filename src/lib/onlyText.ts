import { Children, ReactElement, ReactNode } from 'react';
import hasChildren from './hasChildren';

const onlyText = (children: ReactNode): string => {
  return Children.toArray(children)
    .reduce((flattened: string[], child: ReactNode): string[] => {
      if (!child) {
        return flattened;
      }

      return [
        ...flattened,
        hasChildren(child) ? onlyText((child as ReactElement).props.children) : child.toString(),
      ];
    }, [])
    .join('');
};

export default onlyText;
