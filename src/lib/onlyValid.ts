import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import deepFilter from './deepFilter.js';

const onlyValid = (children: ReadonlyDeep<ReactNode | ReactNode[]>): ReactNode[] =>
  deepFilter(children, (child: ReadonlyDeep<ReactNode>) => isValidElement(child));

export default onlyValid;
