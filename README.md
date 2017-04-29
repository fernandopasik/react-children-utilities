# React Children Utilities

[![npm version][img-1]][1]
[![Build Status][img-2]][2]
[![Dependency Status][img-3]][3]
[![devDependency Status][img-4]][4]
[![Coverage Status][img-5]][5]

[img-1]: https://img.shields.io/npm/v/react-children-utilities.svg
[img-2]: https://travis-ci.org/fernandopasik/react-children-utilities.svg?branch=master
[img-3]: https://david-dm.org/fernandopasik/react-children-utilities.svg
[img-4]: https://david-dm.org/fernandopasik/react-children-utilities/dev-status.svg
[img-5]: https://img.shields.io/coveralls/fernandopasik/react-children-utilities.svg

[1]: https://www.npmjs.com/package/react-children-utilities "npm version"
[2]: https://travis-ci.org/fernandopasik/react-children-utilities "Build Status"
[3]: https://david-dm.org/fernandopasik/react-children-utilities "Dependency Status"
[4]: https://david-dm.org/fernandopasik/react-children-utilities#info=devDependencies "devDependency Status"
[5]: https://coveralls.io/r/fernandopasik/react-children-utilities "Coverage Status"

Extended utils for React.Children opaque data structure.

## Install

```
npm install --save react-children-utilities
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

MIT (c) 2017 [Fernando Pasik](https://fernandopasik.com)
