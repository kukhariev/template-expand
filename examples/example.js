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
