import { Children, type ComponentClass, type FunctionComponent, type ReactNode } from 'react';
import getElementName from './getElementName.js';

const groupByType = (
  children: ReactNode | ReactNode[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  types: (ComponentClass<any> | FunctionComponent | string)[] = [],
  rest = 'rest',
): Record<string, ReactNode[]> => {
  const typeNames: string[] = types.map((type) => (typeof type === 'string' ? type : type.name));

  return Children.toArray(children).reduce((acc: Record<string, ReactNode[]>, child: ReactNode) => {
    const elementName = getElementName(child);
    const key = elementName !== null && typeNames.includes(elementName) ? elementName : rest;

    if (typeof acc[key] === 'undefined') {
      acc[key] = [];
    }

    acc[key] = [...acc[key], child];

    return acc;
  }, {});
};

export default groupByType;
