---
layout: page
---

# groupByType()

Returns an object with keys that map each tag name to an array of children of that type, and a key that maps the rest of children.

```typescript
groupByType(children: ReactNode | ReactNode[], types: (ComponentClass<any> | FunctionComponent | string)[], rest?: string): { [name: string]: ReactNode[] }
```

## Arguments

<dl>
  <dt><b>children</b></dt>
  <dd>The children array from the element where is used.</dd>
  <dt><b>types</b></dt>
  <dd>
    The types of elements that will be grouped. Different kind of types can be passed
    <ul>
      <li>Tag name string</li>
      <li>React Element name string</li>
      <li>React Element function</li>
      <li>React Element class</li>
    </ul>
  </dd>
  <dt><b>rest</b></dt>
  <dd>The name of the group where the remaining elements will be grouped into.</dd>
</dl>

## Return Value

A new children array with the elements and their children that get produced by the callback function.

## Example

```jsx
import React, { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';
import { groupByType } from 'react-children-utilities';

interface Props {
  children?: ReactNode;
}

const Grouped = ({ children }: Props): ReactElement => (
  <div>
    <div className="spans">{groupByType(children, ['span', 'i'], 'rest').span}</div>
    <div className="rest">{groupByType(children, ['span', 'i'], 'rest').rest}</div>
    <div className="empty">{groupByType(children, ['span', 'i'], 'rest').i}</div>
  </div>
);

const Example = (): ReactElement => (
  <Grouped>
    <span>
      <b>1</b>
    </span>
    <span>
      <b>2</b>
    </span>
    <strong>3</strong>
  </Grouped>
);

render(<Example />, document.body);

// Result:
// <div>
//   <div className="spans">
//     <span>
//       <b>1</b>
//     </span>
//     <span>
//       <b>2</b>
//     </span>
//   </div>
//   <div className="rest">
//     <strong>3</strong>
//   </div>
//   <div className="empty"></div>
// </div>
```
