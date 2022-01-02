import type { ReactElement, ReactNode } from 'react';
import { isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';

const hasChildren = (
  element: ReadonlyDeep<ReactNode>,
): element is ReactElement<{ children: ReadonlyDeep<ReactNode | ReactNode[]> }> =>
  isValidElement<{ children?: ReadonlyDeep<ReactNode[]> }>(element) &&
  Boolean(element.props.children);

export default hasChildren;
