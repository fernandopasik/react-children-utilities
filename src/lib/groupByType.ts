import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

export const isChildInTypes = (
  child: ReactNode,
  types: readonly ReactNode[] = [],
): child is { type: string } =>
  isValidElement(child) && typeof child.type === 'string' && types.includes(child.type);

const groupByType = (
  children: ReactNode,
  types: readonly ReactNode[] = [],
  rest = 'rest',
): Record<string, ReactNode[]> => {
  return Children.toArray(children).reduce(
    (groups: Readonly<Record<string, ReactNode[]>>, child: ReactNode) => {
      const newGroups = { ...groups };
      const key = isChildInTypes(child, types) ? child.type : rest;

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
