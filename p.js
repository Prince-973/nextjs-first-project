// const str = ["xyzxxx", "yzx"];
// let str2 = str[0];
// let strArray = str[1].split("");
// // console.log(strArray);

// // console.log(strslice);
// // console.log("abc".includes(strArray[2]));

// let left = 0;
// let ptr = 0;
// let flag = true;
// let strslice = str2.slice(left, 3);
// let prevStr = strslice;
// for (let i = left; i < 3; i++) {
//   if (prevStr !== strslice) {
//     flag = true;
//   }

//   if (!strslice.includes(strArray[ptr])) {
//     flag = false;
//     left = +3;
//     ptr = 0;
//     prevStr = strslice;
//     strslice = str2.slice(left, 3);
//   } else {
//     ptr += 1;
//   }
// }
// console.log(flag);

let str = "testyourskil%madam%labc";
let long = "";
for (let i = 1; i <= str.length; i++) {
  for (let j = i + 1; j <= str.length; j++) {
    let strslice = str.slice(i, j);
    let revStr = strslice.split("").reverse().join("");
    let isPalidrom = strslice === revStr;
    if (isPalidrom && long.length < revStr.length) {
      long = revStr;
    }
  }
}
if (long.length >= 2) {
  console.log(long);
}
