---
layout: page
---

# deepForEach()

Executes a provided function once on each child (and its children) on a children array.

```typescript
deepForEach(
  children: ReactNode | ReactNode[],
  forEachFn: (child: ReactNode, index?: number, children?: ReactNode[]): void,
): void
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
  <dt><b>forEachFn</b></dt>
  <dd>Funcion to be called recursively each element (and its children) of the children array. Returns <code>undefined</code>. It accepts three arguments:</dd>
  <dd>
    <dl>
      <dt><b>child</b></dt>
      <dd>The current child element being processed.</dd>
      <dt><b>index</b></dt>
      <dd>The index of the current child element being processed.</dd>
      <dt><b>children</b></dt>
      <dd>The children array that forEach was called upon.</dd>
    </dl>
  </dd>
</dl>

## Return Value

`undefined`

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { deepForEach } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const DeepForEached = ({ children }: Props): ReactElement => {
  const items: ReactNode[] = [];
  deepForEach(children, (child: ReactNode) => {
    if (child && (child as ReactElement).type === 'b') {
      items.push((child as ReactElement).props.children);
    }
  });
  return <div>{items}</div>;
};

const Example = (): ReactElement => (
  <DeepForEached>
    <b>1</b>
    <b>2</b>
    <span>
      <b>3</b>
    </span>
    <i>non matching</i>
    <div>
      <div>
        <b>4</b>
      </div>
    </div>
    example
  </DeepForEached>
);

render(<Example />, document.body)

// Result:
// <div>1234</div>
```
