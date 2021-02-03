// 类型兼容性

// TypeScript里的类型兼容性是基于结构子类型的。
// 其他语言是基于名义类型的。
{
  interface Named {
    name: string;
  }

  class Person {
    name: string;
  }

  let p: Named;
  p = new Person; // OK
}

{
  interface Named {
    name: string;
  }

  let x: Named;
  let y = { name: 'Alice', location: 'Seattle' };
  x = y; // OK
}

// 函数
{
  // 参数
  let x = (a: number) => 0;
  let y = (b: number, s: string) => 0;
  y = x; // OK
  // x = y; // Error

  // 返回值
  let x1 = () => ({ name: 'Alice' });
  let y1 = () => ({ name: 'Alice', location: 'Seattle' });
  x1 = y1; // OK
  // y1 = x1; // Error
}

// 函数参数双向协变
{
  enum EventType {
    Mouse,
    Keyboard
  }

  interface Event {
    timestamp: number;
  }

  interface MouseEvent extends Event {
    x: number;
    y: number;
  }

  interface KeyEvent extends Event {
    keyCode: number;
  }

  function listenEvent(eventType: EventType, handler: (e: Event) => void) { }

  // listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

  listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
  listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));
}

// 可选参数及剩余参数
{
  function invokeLater(args: any[], callback: (...args: any[]) => void) { }

  invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));
  invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));
}

// 枚举
// 不同枚举类型之间是不兼容的
{
  enum Status { Ready, Waiting };
  enum Color { Red, Blue, Green };
  let status = Status.Ready;
  // status = Color.Red; // Error
}

// 类
// 比较两个类类型的对象时只有实例的成员会被比较，静态成员和构造函数不在比较的范围内
{
  class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
  }

  class Size {
    feet: number;
    constructor(numFeet: number) { }
  }

  let a: Animal;
  let s: Size;
  a = s;
  s = a;
}

{
  class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
  }

  class Size {
    private name: string;
    feet: number;
    constructor(numFeet: number) { }
  }

  let a: Animal;
  let s: Size;
  a = s;
  // s = a; // Error
}

// 如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员
{
  class Base {
    private name: string;
  }

  class Animal extends Base {
    feet: number;
    constructor(name: string, numFeet: number) {
      super()
    }
  }

  class Size extends Base {
    feet: number;
    constructor(numFeet: number) {
      super()
    }
  }

  let a: Animal;
  let s: Size;
  a = s;
  s = a;
}

// 泛型
{
  interface Empty<T> { }
  let x: Empty<number>;
  let y: Empty<string>;
  x = y; // OK
}

{
  interface Empty<T> {
    data: T;
  }
  let x: Empty<number>;
  let y: Empty<string>;
  // x = y; // Error
}

{
  let identity = function <T>(x: T): T {
    return x;
  }

  let reverse = function <U>(y: U): U {
    return y;
  }

  identity = reverse; // OK
}