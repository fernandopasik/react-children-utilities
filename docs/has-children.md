---
layout: page
---

# hasChildren()

Returns true if the element has children, otherwise returns false.

```typescript
hasChildren(child: ReactNode): boolean
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
</dl>

## Return Value

A `boolean` which is `true` if the element has children, but `false` if it doesn't.

## Examples

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { hasChildren } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const Test = ({ children }: Props): ReactElement => (
  <div>{hasChildren(children) ? 'yes' : 'no'}</div>
);

const Example = (): ReactElement => <Test>this is the inner content</Test>;

render(<Example />, document.body);

// Result:
// <div>yes</div>

const Example2 = (): ReactElement => <Test>{null}</Test>;

render(<Example2 />, document.body);

// Result:
// <div>no</div>
```
