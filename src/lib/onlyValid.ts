import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import deepFilter from './deepFilter';

const onlyValid = (children: ReactNode): ReactNode[] =>
  deepFilter(children, (child) => isValidElement(child));

export default onlyValid;
