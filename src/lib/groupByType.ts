import { Children, isValidElement, ReactNode, ReactElement } from 'react';

export interface GroupedChildren {
  [name: string]: ReactNode[];
}

const groupByType = (
  children: ReactNode,
  types: ReactNode[] = [],
  rest = 'rest',
): GroupedChildren => {
  return Children.toArray(children).reduce((groups: GroupedChildren, child: ReactNode) => {
    const isGrouped = isValidElement(child) && types.includes(child.type);
    const addChild = isGrouped ? (child as ReactElement).props.children : child;
    const key = isGrouped ? (child as ReactElement).type : rest;

    if (typeof key !== 'string') {
      return groups;
    }

    const group = groups[key];

    return {
      ...groups,
      [key]: [...(group || []), addChild],
    };
  }, {});
};

export default groupByType;
