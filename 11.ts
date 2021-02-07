// 迭代器和生成器
// 当一个对象实现了 Symbol.iterator 属性时，我们认为它是可迭代的

// for..in 迭代的是对象的键的列表
// 而for..of 则迭代对象的键对应的值
let list = [4, 5, 6];
for (const i in list) {
  console.log(i); // 0 1 2
}
for (const i of list) {
  console.log(i); // 4 5 6
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
  console.log(pet);
}

for (let pet of pets) {
  console.log(pet);
}