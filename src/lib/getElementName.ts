import { isValidElement, type ReactNode } from 'react';

const getElementName = (element: ReactNode): string | null => {
  if (!isValidElement(element)) {
    return null;
  }

  return typeof element.type === 'string' ? element.type : element.type.name;
};

export default getElementName;
