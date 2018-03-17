# React Children Utilities

[![npm version][img-1]][url-1]
[![npm downloads][img-2]][url-2]
[![Build Status][img-3]][url-3]
[![peerDependency Status][img-4]][url-4]
[![devDependency Status][img-5]][url-5]
[![Coverage Status][img-6]][url-6]

[img-1]: https://img.shields.io/npm/v/react-children-utilities.svg
[img-2]: https://img.shields.io/npm/dm/react-children-utilities.svg
[img-3]: https://circleci.com/gh/fernandopasik/react-children-utilities.svg?style=svg
[img-4]: https://david-dm.org/fernandopasik/react-children-utilities/peer-status.svg
[img-5]: https://david-dm.org/fernandopasik/react-children-utilities/dev-status.svg
[img-6]: https://coveralls.io/repos/github/fernandopasik/react-children-utilities/badge.svg?branch=master

[url-1]: https://www.npmjs.com/package/react-children-utilities "npm version"
[url-2]: https://www.npmjs.com/package/react-children-utilities "npm downloads"
[url-3]: https://circleci.com/gh/fernandopasik/react-children-utilities "Build Status"
[url-4]: https://david-dm.org/fernandopasik/react-children-utilities?type=peer "Peer Dependency Status"
[url-5]: https://david-dm.org/fernandopasik/react-children-utilities?type=dev "Dev Dependency Status"
[url-6]: https://coveralls.io/github/fernandopasik/react-children-utilities?branch=master "Coverage Status"

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
