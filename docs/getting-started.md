---
layout: default
---

# Getting Started

This library provides Recursive and extended utils for operating on React children opaque data structure.

## Installation

Available as a package and can be added to your application with npm or yarn after installing the peer dependency `react`

```sh
# with yarn
yarn add react-children-utilities react

# with npm
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
