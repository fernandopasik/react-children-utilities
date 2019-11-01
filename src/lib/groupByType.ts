import { Children, isValidElement, ReactNode } from 'react';

export interface GroupedChildren {
  [name: string]: ReactNode[];
}

const groupByType = (
  children: ReactNode,
  types: ReactNode[] = [],
  rest = 'rest',
): GroupedChildren => {
  return Children.toArray(children).reduce((groups: GroupedChildren, child: ReactNode) => {
    const newGroups = { ...groups };
    let key = rest;

    if (isValidElement(child) && typeof child.type === 'string' && types.includes(child.type)) {
      key = child.type;
    }

    if (typeof newGroups[key] === 'undefined') {
      newGroups[key] = [];
    }

    newGroups[key] = [...newGroups[key], child];

    return newGroups;
  }, {});
};

export default groupByType;
