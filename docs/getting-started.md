---
layout: default
---

# Getting Started

This library provides Recursive and extended utils for operating on React children opaque data structure.

## Installation

Can be added to your application after installing the peer dependency `react`

```sh
npm install --save react-children-utilities
```

## Usage

This package extends the existing React.Children utilities, you can import it as a whole.

```jsx
import React from 'react';
import Children from 'react-children-utilities';

const MyComponent = ({ children }) => {
  const onlySpans = Children.filter(children, (child) => child.type === 'span');
  return <div>{onlySpans}</div>;
};
```

Also you can import only the function you need

```jsx
import React from 'react';
import { filter } from 'react-children-utilities';

const MyComponent = ({ children }) => {
  const onlySpans = filter(children, (child) => child.type === 'span');
  return <div>{onlySpans}</div>;
};
```

## Next Steps

To find out about more methods please check the [API]({{ site.github.url }}/api)
