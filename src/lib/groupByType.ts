import type { ReactNode } from 'react';
import { Children } from 'react';
import getElementName from './getElementName.js';

const groupByType = (
  children: ReactNode | ReactNode[],
  types: readonly ReactNode[] = [],
  rest = 'rest',
): Record<string, ReactNode[]> =>
  Children.toArray(children).reduce(
    (groups: Readonly<Record<string, ReactNode[]>>, child: ReactNode) => {
      const newGroups = { ...groups };
      const elementName = getElementName(child);
      const key = elementName !== null && types.includes(elementName) ? elementName : rest;

      if (typeof newGroups[key] === 'undefined') {
        newGroups[key] = [];
      }

      newGroups[key] = [...newGroups[key], child];

      return newGroups;
    },
    {},
  );

export default groupByType;
