const path = require('path');

console.log(__filename); // 현재 파일의 절대 경로
console.log(path.basename(__filename)); // 경로의 마지막 부분
console.log(path.basename(__filename, '.js')); //경로의 마지막 부분의 확장자를 제거한 이름
console.log(path.delimiter); // 환경변수 구분자 - 윈도우는 세미콜론(;), POSIX 계열은 콜론(:)

//윈도우
console.log(process.env.PATH);// 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'
process.env.PATH.split(path.delimiter); // ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']

//POSIX
console.log(process.env.PATH); // '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
process.env.PATH.split(path.delimiter); // ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']



console.log(path.dirname(__filename)) // 파일이 위치한 디렉토리(폴더) 경로
console.log(path.extname('index.html')); // 파일의 확장자, 출력결과 - .html

/* path.format(pathObject)
   pathObject는 dir, root, base, name, ext 프로퍼티가 있음
   dir 값이 있으면 root는 무시
   base 값이 있으면 name, ext는 무시
*/
path.format({
  root: '/ignored', // dir 값이 있으므로 root는 무시 됨
  dir: '/home/user/dir',
  base: 'file.txt'
}); 
// '/home/user/dir/file.txt' 

path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored' // base 값이 있으므로 ext는 무시 됨
});
// '/file.txt'

path.format({
  root: '/',
  name: 'file',
  ext: '.txt'
});
// '/file.txt'


path.join('/foo', 'bar', 'baz/asdf'); // '/foo/bar/baz/asdf'


path.parse('/home/user/dir/file.txt');
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }


console.log(path.sep); //경로 구분자 - 윈도우는 역슬래시(\), POSIX 계열은 슬래시(/)
'foo\\bar\\baz'.split(path.sep); // ['foo', 'bar', 'baz']

// console.log()