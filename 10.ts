// Symbols
// 自ECMAScript 2015起，symbol 成为了一种新的原生类型
// symbol类型的值是通过Symbol构造函数创建的
{
  let sym1 = Symbol();
  let sym2 = Symbol('key'); // 可选参数
}

// Symbols是不可改变且唯一的
{
  let sym1 = Symbol('key');
  let sym2 = Symbol('key');
  sym1 === sym2; // false
}

// symbols 可以被用做对象属性的键
{
  const sym = Symbol();
  let obj = {
    [sym]: 'value'
  };
  console.log(obj[sym]);

  const getClassNameSymbol = Symbol();
  class C {
    [getClassNameSymbol]() {
      return 'C';
    }
  }
  let c = new C;
  console.log(c[getClassNameSymbol]());
}