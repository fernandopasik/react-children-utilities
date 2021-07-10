---
layout: page
---

# onlyText()

Strips all html and returns only text nodes

```typescript
onlyText(children: ReactNode | ReactNode[]): string
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
</dl>

## Return Value

A string composed by all text nodes in the provided tree.

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { onlyText } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const OnlyText = ({ children }: Props): ReactElement => <div>{onlyText(children)}</div>;

const Example = (): ReactElement => (
  <OnlyText>
    <span>0</span>
    <b>1</b>
    <span>
      <i>2</i>
    </span>
    <i>3</i>
  </OnlyText>
);

render(<Example />, document.body);

// Result:
// <div>0123</div>
```
