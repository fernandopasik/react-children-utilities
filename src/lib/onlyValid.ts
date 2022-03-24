import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import deepFilter from './deepFilter.js';

function onlyValid(children: ReadonlyDeep<ReactNode | ReactNode[]>): ReactNode[] {
  return deepFilter(children, (child: ReadonlyDeep<ReactNode>) => isValidElement(child));
}
export default onlyValid;
