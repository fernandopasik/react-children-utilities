import type { ComponentClass, FunctionComponent, ReactNode } from 'react';
import { Children } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import getElementName from './getElementName.js';

// eslint-disable-next-line max-lines-per-function
const groupByType = (
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/prefer-readonly-parameter-types
  types: readonly (ComponentClass<any> | FunctionComponent | string)[] = [],
  rest = 'rest',
): Record<string, ReactNode[]> => {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const typeNames: string[] = types.map((type) => (typeof type === 'string' ? type : type.name));

  return Children.toArray(children).reduce(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    (acc: Record<string, ReactNode[]>, child: ReadonlyDeep<ReactNode>) => {
      const elementName = getElementName(child);
      const key = elementName !== null && typeNames.includes(elementName) ? elementName : rest;

      if (typeof acc[key] === 'undefined') {
        acc[key] = [];
      }

      acc[key] = [...acc[key], child];

      return acc;
    },
    {},
  );
};

export default groupByType;
