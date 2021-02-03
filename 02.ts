// 接口

// 接口初探：描述 JavaScript 对象各种各样的外形
{
  interface LabelledValue {
    label: string;
  }

  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }

  let myObj = { size: 10, label: 'Size 10 Object.' };
  printLabel(myObj);
}

// 可选属性
{
  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }

  let mySquare = createSquare({ color: 'black', });
}

// 只读属性
{
  interface Point {
    readonly x: number;
    readonly y: number;
  }

  let p1: Point = { x: 10, y: 20 };

  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  // ro[0] = 12; // error!
  // ro.push(5); // error!
  // ro.length = 100; // error!
  // a = ro; // error!
  a = ro as number[];
}

// 额外属性检查
// 对象字面量会被特殊对待，而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
{
  interface LabelledValue1 {
    label: string;
  }

  interface LabelledValue2 {
    label: string;
    [propName: string]: any;
  }

  function A(labelledObj: LabelledValue1) {
    console.log(labelledObj.label);
  }

  function B(labelledObj: LabelledValue2) {
    console.log(labelledObj.label);
  }

  // A({ size: 10, label: 'Size 10 Object.' }); // 错误，size 属性未在接口中定义

  // 1. 赋值给另一个变量
  let myObj = { size: 10, label: 'Size 10 Object.' };
  A(myObj); // 正确
  // 2. 使用类型断言
  A({ size: 10, label: 'Size 10 Object.' } as LabelledValue1); // 正确
  // 3. 接口中加入任意属性定义
  B({ size: 10, label: 'Size 10 Object.' }); // 正确
}

// 函数类型
{
  interface SearchFunc {
    (source: string, subString: string): boolean; // 方法签名
  }

  let mySearch: SearchFunc;

  mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
  }

  // 函数的参数名不需要与接口里定义的名字相匹配
  mySearch = function (src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
  }

  // 如果不指定类型，TypeScript的类型系统会推断出参数类型
  mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
  }
}

// 可索引类型
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];
console.log(myArray[0], myArray['0']);


// 类类型
{
  // 实现接口
  // interface ClockInterface {
  //   currentTime: Date;
  //   setTime(d: Date);
  // }

  // class Clock implements ClockInterface {
  //   currentTime: Date;
  //   setTime(d: Date) {
  //     this.currentTime = d;
  //   }
  //   constructor(h: number, m: number) { }
  // }

  // 类静态部分与实例部分区别
  interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface; // 构造器签名
  }
  interface ClockInterface {
    tick();
  }
  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
  }
  class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log('beep beep');
    }
  }
  class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log('tick tick');
    }
  }

  let digital = createClock(DigitalClock, 12, 17);
  let analog = createClock(AnalogClock, 7, 32);
}

// 继承接口：可以继承多个接口
{
  interface Shape {
    color: string;
  }

  interface PenStroke {
    penWidth: number;
  }

  interface Square extends Shape, PenStroke {
    sideLength: number;
  }

  let square = <Square>{};
  square.color = 'blue';
  square.sideLength = 10;
  square.sideLength = 5.0;
}

// 混合类型：一个对象可以同时做为函数和对象使用，并带有额外的属性
{
  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }

  function getCounter(): Counter {
    let counter = <Counter>function (start: number) { }
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 0.5;
  console.log(c, c.toString());
}

// 接口继承类
// 一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}