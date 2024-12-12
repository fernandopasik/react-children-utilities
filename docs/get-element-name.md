---
layout: page
---

# getElementName()

Returns the name of the react element (tag name, functional component or class component).

```typescript
getElementName(element: ReactNode): string
```

## Arguments

<dl>
  <dt><b>element</b></dt>
  <dd>The react element for getting its name.</dd>
</dl>

## Return Value

A `string` that is the name of the react element.

## Examples

```jsx
import React, { Component, JSX, ReactElement } from 'react';
import { getElementName } from 'react-children-utilities';

getElementName('<span />'); // Result: 'span'

const Example = (): ReactElement => <div>this is the inner content</div>;

getElementName(<Example />); // Result: 'Example'

class Example2 extends Component {
  public override render(): JSX.Element {
    return <div />;
  }
}

getElementName(<Example2 />); // Result: 'Example2'
```
