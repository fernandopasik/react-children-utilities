import { Children } from 'react';
import hasChildren from './hasChildren';

const onlyText = (children) => {
  return Children.toArray(children)
    .reduce(
      (flattened, child) => [
        ...flattened,
        hasChildren(child) ? onlyText(child.props.children) : child,
      ],
      [],
    )
    .join('');
};

export default onlyText;
