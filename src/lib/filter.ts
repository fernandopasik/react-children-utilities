import type { ReactNode } from 'react';
import { Children } from 'react';
import type { ReadonlyDeep } from 'type-fest';

function filter(
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  filterFn: (
    child: ReadonlyDeep<ReactNode>,
    index?: number,
    children?: ReadonlyDeep<ReactNode[]>,
  ) => boolean,
): ReactNode[] {
  return Children.toArray(children).filter(filterFn);
}

export default filter;
