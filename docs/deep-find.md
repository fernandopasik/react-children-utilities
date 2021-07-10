---
layout: page
---

# deepFind()

Returns the first element in the children array (and its children) that satisfies the provided testing function.

```typescript
deepFind(
  children: ReactNode | ReactNode[],
  findFn: (child: ReactNode, index?: number, children?: ReactNode[]): ReactNode,
): ReactNode | undefined
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
  <dt><b>findFn</b></dt>
  <dd>Funcion to be called recursively each element (and its children) of the children array. Returns the first element that satisfies the provided testing function. It accepts three arguments:</dd>
  <dd>
    <dl>
      <dt><b>child</b></dt>
      <dd>The current child element being processed.</dd>
      <dt><b>index</b></dt>
      <dd>The index of the current child element being processed.</dd>
      <dt><b>children</b></dt>
      <dd>The children array that find was called upon.</dd>
    </dl>
  </dd>
</dl>

## Return Value

A new children array with the elements and their children that get produced by the callback function.

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { deepFind } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const DeepFound = ({ children }: Props): ReactElement => (
  <div>{deepFind(children, (child: ReactNode) => (child as ReactElement).type === 'i')}</div>
);

const Example = (): ReactElement => (
  <DeepFound>
    <b>1</b>
    <span>
      <i>2</i>
    </span>
    <i>3</i>
  </DeepFound>
);

render(<Example />, document.body)

// Result:
// <div>
//   <i>2</i>
// </div>
```
