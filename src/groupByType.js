import { Children } from 'react';

const groupByType = (children, types, rest) => {
  return Children.toArray(children).reduce((group, child) => {
    const isGrouped = types.includes(child.type);
    const addChild = isGrouped ? child.props.children : child;
    const key = isGrouped ? child.type : rest;

    return {
      ...group,
      [key]: [...(group[key] || []), addChild],
    };
  }, {});
};

export default groupByType;
