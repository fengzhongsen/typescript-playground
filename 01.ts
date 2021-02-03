// 基础类型

// 布尔值
{
  let isDone: boolean = false;
}

// 数字
{
  let decLiteral: number = 6;
  let hexLiteral: number = 0xfffd;
  let binaryLiteral: number = 0b1010;
  let octalLiteral: number = 0o744;
}

// 字符串
{
  let name: string = 'bob';
  let age: number = 37;
  let sentence: string = `Hello, my name is ${name}.
  I'll be ${age + 1} years old next month.`;
}

// 数组
{
  // 字面量
  let list1: number[] = [1, 2, 3];
  // 数组泛型
  let list2: Array<number> = [1, 2, 3];
}

// 元组:表示一个已知元素数量和类型的数组
{
  let x: [string, number];
  x = ['Hello', 10];
  console.log(x[0]);
}

// 枚举
{
  enum A { // 默认0开始
    a, b, c
  }
  enum B { // 指定1开始
    a = 1, b, c
  }
  enum C { // 全部自定义
    a = 4, b = 2, c = 4
  }
  enum D { // 字符串
    A = 'a',
    B = 'b',
    C = 'c',
  }
  console.log(A[0], A.a); // 'a 0'
  console.log(B[1], B.a); // 'a 1'
  console.log(C[4], C.a); // 'c 4'
  console.log(D.A, D['a']); // 'a undefined'
}

// Any
{
  let notSure: any = 4;
  notSure.toFixed(2);
  notSure = 'maybe a string instead';
  notSure.substr(1);
  notSure = false;

  let list1: any[] = [1, true, 'free'];
  let list2: Array<any> = [1, true, 'free'];
}

// Void: 1. 没有返回值的函数；2. 只可赋值 undefined 和 null 的变量
{
  function warnUser(): void {
    console.log('This is my warning message');
  }
  let unusable: void = undefined;
}

// Null 和 Undefined
// 1. 默认情况下 null 和 undefined 是所有类型的子类型，可以赋值给任意类型
// 2. 当指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自
{
  let u: undefined = undefined;
  let n: null = null;
}

// Never
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) { }
}

// 断言类型
{
  let someValue: any = 'this is a string';
  let strLength: number = (<string>someValue).length;
}
{
  // 当在 TypeScript 里使用JSX时，只有 as 语法断言是被允许的
  let someValue: any = 'this is a string';
  let strLength: number = (someValue as string).length;
}

