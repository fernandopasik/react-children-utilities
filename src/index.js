import { Children, cloneElement } from 'react';

export const hasChildren = (child) => Boolean(child && child.props && child.props.children);

export const hasComplexChildren = (child) =>
  hasChildren(child) && typeof child.props.children === 'object';

export const filter = (children, filterFn) => {
  return Children.toArray(children).filter(filterFn);
};

export const deepFilter = (children, deepFilterFn) => {
  return Children.toArray(children)
    .filter(deepFilterFn)
    .map((child) => {
      if (hasComplexChildren(child)) {
        // Clone the child that has children and filter them too
        return cloneElement(child, {
          ...child.props,
          children: deepFilter(child.props.children, deepFilterFn),
        });
      }
      return child;
    });
};

export const groupByType = (children, types, rest) => {
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

export const deepMap = (children, deepMapFn) => {
  return Children.map(children, (child) => {
    if (hasComplexChildren(child)) {
      // Clone the child that has children and map them too
      return deepMapFn(
        cloneElement(child, {
          ...child.props,
          children: deepMap(child.props.children, deepMapFn),
        }),
      );
    }
    return deepMapFn(child);
  });
};

export const deepForEach = (children, deepForEachFn) => {
  Children.forEach(children, (child) => {
    if (hasComplexChildren(child)) {
      // Each inside the child that has children
      deepForEach(child.props.children, deepForEachFn);
    }
    deepForEachFn(child);
  });
};

export const deepFind = (children, deepFindFn) => {
  let found;
  Children.toArray(children).find((child) => {
    if (hasComplexChildren(child)) {
      // Find inside the child that has children
      found = deepFind(child.props.children, deepFindFn);
      return typeof (found) !== 'undefined';
    }
    if (deepFindFn(child)) {
      found = child;
      return true;
    }
    return false;
  });
  return found;
};

export const onlyText = (children) => {
  return Children.toArray(children)
    .reduce(
      (flattened, child) => [
        ...flattened,
        hasChildren(child) ? onlyText(child.props.children) : child,
      ],
      [],
    )
    .join('');
};

export default {
  ...Children,
  filter,
  deepFilter,
  groupByType,
  deepMap,
  deepForEach,
  deepFind,
  onlyText,
  hasChildren,
  hasComplexChildren,
};
