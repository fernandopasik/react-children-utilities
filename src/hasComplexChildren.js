import hasChildren from './hasChildren';

const hasComplexChildren = (child) =>
  hasChildren(child) && typeof child.props.children === 'object';

export default hasComplexChildren;
