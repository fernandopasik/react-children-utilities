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

    if (isValidElement(child) && typeof child.type === 'string' && types.includes(child.type)) {
      newGroups[child.type] = [...(newGroups[child.type] || []), child];
    } else {
      newGroups[rest] = [...(newGroups[rest] || []), child];
    }

    return newGroups;
  }, {});
};

export default groupByType;
