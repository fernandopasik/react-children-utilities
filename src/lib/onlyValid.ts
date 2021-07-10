import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import deepFilter from './deepFilter.js';

const onlyValid = (children: ReactNode | ReactNode[]): ReactNode[] =>
  deepFilter(children, (child) => isValidElement(child));

export default onlyValid;
