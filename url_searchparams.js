const myURL = new URL('https://example.org/?user=abc&query=xyz');
console.log(myURL.searchParams.get('user')); //키에 해당하는 첫번째 값을 반환
console.log(myURL.searchParams.has('user')); //키가 존재하는지 체크하고 있으면 true, 없으면 false
console.log(myURL.searchParams.keys()); //Iterator로 모든 키를 반환
console.log(myURL.searchParams.values()); //Iterator로 모든 값을 반환
myURL.searchParams.append('user','admin'); //주어진 키로 값을 추가. 동일한 키가 이미 있으면 그대로 유지하고 하나 더 추가
console.log(myURL.searchParams.getAll('user')); //키에 해당하는 값을 모두를 배열로  반환
myURL.searchParams.set('user','admin'); //주어진 키로 값을 추가. 동일한 키가 이미 있으면 모두 삭제하고 새로 추가
myURL.searchParams.delete('user'); //해당 키를 삭제
console.log(myURL.searchParams.toString()); //searchParams 객체를 문자열로 반환