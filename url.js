const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
// #bar

myURL.hash = 'baz';
console.log(myURL.href);
// https://example.org/foo#baz




// const myURL =
//   new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
// console.log(myURL);
//URL {
//  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
//  origin: 'https://sub.example.com:8080',
//  protocol: 'https:',
//  username: 'user',
//  password: 'pass',
//  host: 'sub.example.com:8080',
//  hostname: 'sub.example.com',
//  port: '8080',
//  pathname: '/p/a/t/h',
//  search: '?query=string',
//  searchParams: URLSearchParams { 'query' => 'string' },
//  hash: '#hash'
//}

// const url = require('url');
// console.log(url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'));
//Url {
//  protocol: 'https:',
//  slashes: true,
//  auth: 'user:pass',
//  host: 'sub.example.com:8080',
//  port: '8080',
//  hostname: 'sub.example.com',
//  hash: '#hash',
//  search: '?query=string',
//  query: 'query=string',
//  pathname: '/p/a/t/h',
//  path: '/p/a/t/h?query=string',
//  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
//}

