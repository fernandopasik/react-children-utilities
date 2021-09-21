# React Children Utilities

Recursive and extended utils for React children opaque data structure.

<!-- BADGES - START -->

[![Gzip Bundle Size](https://img.badgesize.io/https://unpkg.com/react-children-utilities/react-children-utilities.min.js?compression=gzip)](https://unpkg.com/react-children-utilities/react-children-utilities.min.js 'Gzip Bundle Size')
[![Build Status](https://github.com/fernandopasik/react-children-utilities/actions/workflows/main.yml/badge.svg)](https://github.com/fernandopasik/react-children-utilities/actions/workflows/main.yml 'Build Status')
[![Coverage Status](https://codecov.io/gh/fernandopasik/react-children-utilities/branch/main/graph/badge.svg)](https://codecov.io/gh/fernandopasik/react-children-utilities 'Coverage Status')
[![Known Vulnerabilities](https://snyk.io/test/github/fernandopasik/react-children-utilities/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fernandopasik/react-children-utilities?targetFile=package.json 'Known Vulnerabilities')

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)
[![npm version](https://img.shields.io/npm/v/react-children-utilities.svg?logo=npm)](https://www.npmjs.com/package/react-children-utilities 'npm version')
[![npm downloads](https://img.shields.io/npm/dm/react-children-utilities.svg)](https://www.npmjs.com/package/react-children-utilities 'npm downloads')

<!-- BADGES - END -->

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

## API documentation

- [deepFilter](/docs/deep-filter.md)
- [deepFind](/docs/deep-find.md)
- [deepForEach](/docs/deep-foreach.md)
- [deepMap](/docs/deep-map.md)
- [filter](/docs/filter.md)
- [getElementName](/docs/get-element-name.md)
- [groupByType](/docs/group-by-type.md)
- [hasChildren](/docs/has-children.md)
- [hasComplexChildren](/docs/has-complex-children.md)
- [onlyText](/docs/only-text.md)
- [onlyValid](/docs/only-valid.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fernandopasik.com"><img src="https://avatars1.githubusercontent.com/u/1301335?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fernando Pasik</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3Afernandopasik" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=fernandopasik" title="Code">💻</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=fernandopasik" title="Documentation">📖</a> <a href="#ideas-fernandopasik" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/mrm007"><img src="https://avatars3.githubusercontent.com/u/3297808?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mrm007</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3Amrm007" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=mrm007" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vasilevich"><img src="https://avatars2.githubusercontent.com/u/1217224?v=4?s=100" width="100px;" alt=""/><br /><sub><b>yosef langer</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3Avasilevich" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=vasilevich" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/iyegoroff"><img src="https://avatars2.githubusercontent.com/u/4447438?v=4?s=100" width="100px;" alt=""/><br /><sub><b>iyegoroff</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3Aiyegoroff" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=iyegoroff" title="Code">💻</a></td>
    <td align="center"><a href="http://vydia.com"><img src="https://avatars1.githubusercontent.com/u/4197823?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mark Allen</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3ATSMMark" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=TSMMark" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@riywo"><img src="https://avatars2.githubusercontent.com/u/37822?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ryosuke IWANAGA</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3Ariywo" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=riywo" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/dpinol/"><img src="https://avatars0.githubusercontent.com/u/1954955?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Pinyol</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3Adpinol" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=dpinol" title="Code">💻</a></td>
    <td align="center"><a href="http://brianbartholomew.com"><img src="https://avatars0.githubusercontent.com/u/6721622?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brian Bartholomew</b></sub></a><br /><a href="https://github.com/fernandopasik/react-children-utilities/issues?q=author%3Abcbrian" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/react-children-utilities/commits?author=bcbrian" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT (c) 2016 [Fernando Pasik](https://fernandopasik.com)
