import { isValidElement, type ReactNode } from 'react';
import deepFilter from './deepFilter.js';

const onlyValid = (children: ReactNode | ReactNode[]): ReactNode[] =>
  deepFilter(children, (child: ReactNode) => isValidElement(child));

export default onlyValid;
