# React Children Utilities

[![Gzip Bundle Size][badge-size]][url-size]
[![Build Status][badge-ci]][url-ci]
[![Test Coverage Status][badge-cov]][url-cov]
[![Known Vulnerabilities][badge-sec]][url-sec]

[![npm version][badge-version]][url-version]
[![npm downloads][badge-downloads]][url-downloads]

[badge-size]: http://img.badgesize.io/https://unpkg.com/react-children-utilities/react-children-utilities.min.js?compression=gzip
[badge-ci]: https://circleci.com/gh/fernandopasik/react-children-utilities.svg?style=svg
[badge-cov]: https://codecov.io/gh/fernandopasik/react-children-utilities/branch/master/graph/badge.svg
[badge-sec]: https://snyk.io/test/github/fernandopasik/react-children-utilities/badge.svg?targetFile=package.json
[badge-version]: https://img.shields.io/npm/v/react-children-utilities.svg
[badge-downloads]: https://img.shields.io/npm/dm/react-children-utilities.svg
[url-size]: https://unpkg.com/react-children-utilities/react-children-utilities.min.js 'Gzip Bundle Size'
[url-ci]: https://circleci.com/gh/fernandopasik/react-children-utilities 'Build Status'
[url-cov]: https://codecov.io/gh/fernandopasik/react-children-utilities 'Test Coverage Status'
[url-sec]: https://snyk.io/test/github/fernandopasik/react-children-utilities?targetFile=package.json 'Known Vulnerabilities'
[url-version]: https://www.npmjs.com/package/react-children-utilities 'npm version'
[url-downloads]: https://www.npmjs.com/package/react-children-utilities 'npm downloads'

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
- [groupByType(children, types, rest)](/docs/group-by-type.md)
- [hasChildren(children)](/docs/has-children.md)
- [hasComplexChildren(children)](/docs/has-complex-children.md)
- [onlyText(children)](/docs/only-text.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fernandopasik.com"><img src="https://avatars1.githubusercontent.com/u/1301335?v=4" width="100px;" alt="Fernando Pasik"/><br /><sub><b>Fernando Pasik</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Afernandopasik" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=fernandopasik" title="Code">💻</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=fernandopasik" title="Documentation">📖</a> <a href="#ideas-fernandopasik" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/mrm007"><img src="https://avatars3.githubusercontent.com/u/3297808?v=4" width="100px;" alt="mrm007"/><br /><sub><b>mrm007</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Amrm007" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=mrm007" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vasilevich"><img src="https://avatars2.githubusercontent.com/u/1217224?v=4" width="100px;" alt="yosef langer"/><br /><sub><b>yosef langer</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Avasilevich" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=vasilevich" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/iyegoroff"><img src="https://avatars2.githubusercontent.com/u/4447438?v=4" width="100px;" alt="iyegoroff"/><br /><sub><b>iyegoroff</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Aiyegoroff" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=iyegoroff" title="Code">💻</a></td>
    <td align="center"><a href="http://vydia.com"><img src="https://avatars1.githubusercontent.com/u/4197823?v=4" width="100px;" alt="Mark Allen"/><br /><sub><b>Mark Allen</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3ATSMMark" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=TSMMark" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@riywo"><img src="https://avatars2.githubusercontent.com/u/37822?v=4" width="100px;" alt="Ryosuke IWANAGA"/><br /><sub><b>Ryosuke IWANAGA</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Ariywo" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=riywo" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT (c) 2018 [Fernando Pasik](https://fernandopasik.com)
