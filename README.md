# React Children Utilities

[![Gzip Bundle Size][badge-size]][url-size]
[![Build Status][badge-ci]][url-ci]
[![Test Coverage Status][badge-cov]][url-cov]
[![Known Vulnerabilities][badge-sec]][url-sec]

[![npm version][badge-version]][url-version]
[![npm downloads][badge-downloads]][url-downloads]
[![peerDependency Status][badge-deps-peer]][url-deps-peer]
[![devDependency Status][badge-deps-dev]][url-deps-dev]

[badge-size]: http://img.badgesize.io/https://unpkg.com/react-children-utilities?compression=gzip
[badge-ci]: https://circleci.com/gh/fernandopasik/react-children-utilities.svg?style=svg
[badge-cov]: https://codecov.io/gh/fernandopasik/react-children-utilities/branch/master/graph/badge.svg
[badge-sec]: https://snyk.io/test/github/fernandopasik/react-children-utilities/badge.svg?targetFile=package.json
[badge-version]: https://img.shields.io/npm/v/react-children-utilities.svg
[badge-downloads]: https://img.shields.io/npm/dm/react-children-utilities.svg
[badge-deps-peer]: https://david-dm.org/fernandopasik/react-children-utilities/peer-status.svg
[badge-deps-dev]: https://david-dm.org/fernandopasik/react-children-utilities/dev-status.svg
[url-size]: https://unpkg.com/react-children-utilities 'Gzip Bundle Size'
[url-ci]: https://circleci.com/gh/fernandopasik/react-children-utilities 'Build Status'
[url-cov]: https://codecov.io/gh/fernandopasik/react-children-utilities 'Test Coverage Status'
[url-sec]: https://snyk.io/test/github/fernandopasik/react-children-utilities?targetFile=package.json 'Known Vulnerabilities'
[url-version]: https://www.npmjs.com/package/react-children-utilities 'npm version'
[url-downloads]: https://www.npmjs.com/package/react-children-utilities 'npm downloads'
[url-deps-peer]: https://david-dm.org/fernandopasik/react-children-utilities?type=peer 'Peer Dependency Status'
[url-deps-dev]: https://david-dm.org/fernandopasik/react-children-utilities?type=dev 'Dev Dependency Status'

Extended utils for React.Children opaque data structure.

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

## Api documentation

- [deepFilter(children, filterFn)](/docs/deep-filter.md)
- [deepFind(children, findFn)](/docs/deep-find.md)
- [deepForEach(children, forEachFn)](/docs/deep-foreach.md)
- [deepMap(children, mapFn)](/docs/deep-map.md)
- [filter(children, filterFn)](/docs/filter.md)
- [onlyText(children)](/docs/only-text.md)

### Children.groupByType

Returns an object with keys that map each tag name to an array of children of that type, and a key that maps the rest of children.

```
Children.groupByType(children, tagNames[, restKey])
```

## License

MIT (c) 2018 [Fernando Pasik](https://fernandopasik.com)
