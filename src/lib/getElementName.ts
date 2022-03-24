import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import type { ReadonlyDeep } from 'type-fest';

function getElementName(element: ReadonlyDeep<ReactNode>): string | null {
  if (!isValidElement(element)) {
    return null;
  }

  return typeof element.type === 'string' ? element.type : element.type.name;
}

export default getElementName;
