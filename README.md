# expand

>

[![npm version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]


## Install

```sh
npm install --save @dropb/expand
```

## Usage

```js
const { expand } = require('../lib');

const values = { one: 'One', two: 'Two', '3': 'Three', '4': 'Four', five: ['Five', 'Six'] };
console.log(expand('{ one }...{ two }...{ 3 }...{ 4 }...{five[0]}', values));
// One...Two...Three...Four

const { Template } = require('../lib');
Template.sep = '${ }';

const template = ['-loglevel', '${level}', '-i', '${in}', 'copy', '-f', 'flv', '${out}'];
const config = { level: 'info', in: '/tmp/file.mkv', out: '/tmp/output.mp4' };
console.log(expand(template, config));
/*
[ '-loglevel',
  'info',
  '-i',
  '/tmp/file.mkv',
  'copy',
  '-f',
  'flv',
  '/tmp/output.mp4' ]
*/
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@dropb/expand.svg
[npm-url]: https://www.npmjs.com/package/@dropb/expand
