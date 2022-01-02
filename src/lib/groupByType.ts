import type { ComponentClass, FunctionComponent, ReactNode } from 'react';
import { Children } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import getElementName from './getElementName.js';

// eslint-disable-next-line max-lines-per-function
const groupByType = (
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  types: readonly (ComponentClass<any> | FunctionComponent | string)[] = [],
  rest = 'rest',
): Record<string, ReactNode[]> => {
  const typeNames: string[] = types.map((type) => (typeof type === 'string' ? type : type.name));

  return Children.toArray(children).reduce(
    (groups: Readonly<Record<string, ReactNode[]>>, child: ReadonlyDeep<ReactNode>) => {
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
