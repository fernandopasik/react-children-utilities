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

[url-size]: https://unpkg.com/react-children-utilities "Gzip Bundle Size"
[url-ci]: https://circleci.com/gh/fernandopasik/react-children-utilities "Build Status"
[url-cov]: https://codecov.io/gh/fernandopasik/react-children-utilities "Test Coverage Status"
[url-sec]: https://snyk.io/test/github/fernandopasik/react-children-utilities?targetFile=package.json "Known Vulnerabilities"
[url-version]: https://www.npmjs.com/package/react-children-utilities "npm version"
[url-downloads]: https://www.npmjs.com/package/react-children-utilities "npm downloads"
[url-deps-peer]: https://david-dm.org/fernandopasik/react-children-utilities?type=peer "Peer Dependency Status"
[url-deps-dev]: https://david-dm.org/fernandopasik/react-children-utilities?type=dev "Dev Dependency Status"

Extended utils for React.Children opaque data structure.

## Install

This is a peer dependency so react must be present

```
npm install --save react-children-utilities react
```

## Usage

Instead of requiring Children from React, require this one, it will extend existing capabilities from Children in your current React version.

```
var Children = require('react-children-utilities');
```

With ES6 modules

```
import Children from 'react-children-utilities';
```

## Api documentation

### Children.filter

Creates a new children array with all elements that pass the test implemented by the provided function.

```
Children.filter(children, callback)
```

### Children.groupByType

Returns an object with keys that map each tag name to an array of children of that type, and a key that maps the rest of children.

```
Children.groupByType(children, tagNames[, restKey])
```

### Children.deepMap

Creates a new children array with the results of calling a provided function on every element (and its children) in the provided children.

```
Children.deepMap(children, callback)
```

### Children.deepForEach

Executes a provided function on every element (and its children) in the provided children.

```
Children.deepForEach(children, callback)
```

### Children.deepFind

Returns the first element in the children (and its children) that satisfies the provided testing function.

```
Children.deepFind(children, callback)
```

### Children.onlyText

Strips all html and returns only text nodes

```
Children.onlyText(children)
```

## License

MIT (c) 2018 [Fernando Pasik](https://fernandopasik.com)
