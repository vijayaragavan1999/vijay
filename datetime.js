const moment=require('moment');

let now=moment();
console.log("ISO");
console.log(now.format());
console.log(now.format("h:mm:ss a"));