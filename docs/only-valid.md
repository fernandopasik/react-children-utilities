---
layout: page
---

# onlyValid()

Deep filters all non React Elements

```typescript
onlyValid(children: ReactNode | ReactNode[]): ReactNode[]
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
</dl>

## Return Value

A new children array with only valid React Elements. If there are no valid React Elements, an empty array will be returned.

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { onlyValid } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const OnlyValid = ({ children }: Props): ReactElement => <div>{onlyValid(children)}</div>;

const Example = (): ReactElement => (
  <OnlyValid>
    <span>0</span>
    text
    <i>2</i>
    <span>
      <strong>3</strong>
      {null}
      {3}
      {true}
      <strong>
        <strong>4</strong>
        {false}
      </strong>
      {undefined}
    </span>
  </OnlyValid>
);

render(<Example />, document.body);

// Result:
// <div>
//   <span>0</span>
//   <i>2</i>
//   <span>
//     <strong>3</strong>
//     <strong>
//       <strong>4</strong>
//     </strong>
//   </span>
// </div>
```
