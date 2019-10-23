---
layout: page
---

# deepFilter()

Creates a new children array with all elements that pass the test implemented by the provided function called recursively on every child (and its children) of the array.

```typescript
deepFilter(
  children: ReactNode,
  filterFn: (child: ReactNode, index?: number, children?: ReactNode[]): boolean,
): ReactNode[]
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
  <dt><b>filterFn</b></dt>
  <dd>Predicate to test recursively each element (and its children) of the children array. Return true to keep the element and false to remove it. It accepts three arguments:</dd>
  <dd>
    <dl>
      <dt><b>child</b></dt>
      <dd>The current child element being processed.</dd>
      <dt><b>index</b></dt>
      <dd>The index of the current child element being processed.</dd>
      <dt><b>children</b></dt>
      <dd>The children array that filter was called upon.</dd>
    </dl>
  </dd>
</dl>

## Return Value

A new children array with the elements and their children that pass the test. If no elements pass the test, an empty array will be returned.

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { deepFilter } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const DeepFiltered = ({ children }: Props): ReactElement => (
  <div>
    {deepFilter(children, (item: ReactNode) =>
      Boolean(item && (item as ReactElement).type && (item as ReactElement).type === 'span'),
    )}
  </div>
);

const Example = (): ReactElement => (
  <DeepFiltered>
    <span>1</span>
    <span>2</span>
    <span>
      <strong>3</strong>
      <span>
        <strong>4</strong>
        <span>5</span>
      </span>
    </span>
  </DeepFiltered>
);

render(<Example />, document.body)

// Result:
// <div>
//   <span>1</span>
//   <span>2</span>
//   <span>
//     <span>
//       <span>5</span>
//     </span>
//   </span>
// </div>
```
