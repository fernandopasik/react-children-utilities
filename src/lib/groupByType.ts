import type { FunctionComponent, ReactNode } from 'react';
import { Children } from 'react';
import getElementName from './getElementName.js';

// eslint-disable-next-line max-lines-per-function
const groupByType = (
  children: ReactNode | ReactNode[],
  types: readonly (FunctionComponent | string)[] = [],
  rest = 'rest',
): Record<string, ReactNode[]> => {
  const typeNames: string[] = types.map((type) => (typeof type === 'string' ? type : type.name));

  return Children.toArray(children).reduce(
    (groups: Readonly<Record<string, ReactNode[]>>, child: ReactNode) => {
      const newGroups = { ...groups };
      const elementName = getElementName(child);
      const key = elementName !== null && typeNames.includes(elementName) ? elementName : rest;

      if (typeof newGroups[key] === 'undefined') {
        newGroups[key] = [];
      }

      newGroups[key] = [...newGroups[key], child];

      return newGroups;
    },
    {},
  );
};

export default groupByType;
