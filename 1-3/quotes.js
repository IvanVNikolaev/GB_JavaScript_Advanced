let str = prompt("Введите текст с одинарными кавычками и апострофом в слове", ["The postman said, 'I won't deliver this letter tomorrow.'"]);
let regexp1 = /'\s{1}/g;
let regexp2 = /\s{1}'/g;
let str2 = str.replace(regexp1, '" ').replace(regexp2, ' "');
alert(str2);
console.log(str2);