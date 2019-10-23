---
layout: page
---

# hasComplexChildren()

Returns true if the element has children that are React components, otherwise returns false.

```typescript
hasComplexChildren(child: ReactNode): boolean
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
</dl>

## Return Value

A `boolean` which is `true` if the element has children that are React components, but `false` if it doesn't.

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { hasComplexChildren } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const Test = ({ children }: Props): ReactElement => (
  <div>{hasComplexChildren(children) ? 'yes' : 'no'}</div>
);

const Example = (): ReactElement => (
  <Test>
    <span />
    <span />
    this too
  </Test>
);

render(<Example />, document.body);

// Result:
// <div>yes</div>

const Example2 = (): ReactElement => <Test>these are not elements</Test>;

render(<Example2 />, document.body);

// Result:
// <div>no</div>
```
