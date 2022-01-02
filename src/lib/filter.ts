import type { ReactNode } from 'react';
import { Children } from 'react';
import type { ReadonlyDeep } from 'type-fest';

const filter = (
  children: ReadonlyDeep<ReactNode | ReactNode[]>,
  filterFn: (
    child: ReadonlyDeep<ReactNode>,
    index?: number,
    children?: ReadonlyDeep<ReactNode[]>,
  ) => boolean,
): ReactNode[] => Children.toArray(children).filter(filterFn);

export default filter;
