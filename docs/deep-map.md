---
layout: page
---

# deepMap()

Creates a new children array with results of calling a provided function called recursively on every child (and its children) of the array.

```typescript
deepMap(
  children: ReactNode | ReactNode[],
  mapFn: (child: ReactNode, index?: number, children?: ReactNode[]): boolean,
): ReactNode[]
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
  <dt><b>mapFn</b></dt>
  <dd>Funcion to be called recursively each element (and its children) of the children array. Returns the new element result of the call. It accepts three arguments:</dd>
  <dd>
    <dl>
      <dt><b>child</b></dt>
      <dd>The current child element being processed.</dd>
      <dt><b>index</b></dt>
      <dd>The index of the current child element being processed.</dd>
      <dt><b>children</b></dt>
      <dd>The children array that map was called upon.</dd>
    </dl>
  </dd>
</dl>

## Return Value

A new children array with the elements and their children that get produced by the callback function.

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { deepMap } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const DeepMapped = ({ children }: Props): ReactElement => (
  <div>
    {deepMap(children, (child: ReactNode) => {
      if (child && (child as ReactElement).type === 'b') {
        return cloneElement(child as ReactElement, {
          ...(child as ReactElement).props,
          className: 'mapped',
        });
      }
      return child;
    })}
  </div>
);

const Example = (): ReactElement => (
  <DeepMapped>
    <b>1</b>
    <b>2</b>
    test text
    <span>
      <b>3</b>
    </span>
    <div>
      <div>
        <b>4</b>
      </div>
    </div>
  </DeepMapped>
);

render(<Example />, document.body)

// Result:
// <div>
//   <b class="mapped">1</b>
//   <b class="mapped">2</b>
//   test text
//   <span>
//     <b class="mapped">3</b>
//   </span>
//   <div>
//     <div>
//       <b class="mapped">4</b>
//     </div>
//   </div>
// </div>
```
