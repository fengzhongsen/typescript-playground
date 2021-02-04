// 高级类型

// 交叉类型
{
  function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
      (<T>result)[id] = first[id];
      // (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<U>result)[id] = second[id];
        // (<any>result)[id] = (<any>second)[id];
      }
    }
    return result;
  }

  class Person {
    constructor(public name: string) { }
  }

  interface Loggable {
    log(something: string): void;
  }

  class ConsoleLogger implements Loggable {
    log(something: string) {
      console.log(something)
    }
  }

  var jim = extend(new Person('Jim'), new ConsoleLogger());
  var n = jim.name;
  jim.log(n);
}

// 联合类型
// 联合类型表示一个值可以是几种类型之一
{
  function padLeft(value: string, padding: string | number) {
    if (typeof padding === 'number') {
      return Array(padding + 1).join(' ') + value;
    }
    if (typeof padding === 'string') {
      return padding + value;
    }
    throw new Error(`Expected string or number, got ${padding}.`);
  }

  padLeft('Hello world', 4);
}

{

  interface Bird {
    layEggs();
    fly();
  }

  interface Fish {
    layEggs();
    swim();
  }

  function getSmallPet(): Fish | Bird {
    return {
      layEggs() { },
      fly() { },
      swim() { },
    }
  }

  let pet = getSmallPet();
  pet.layEggs();
  // pet.swim(); // Error

  // 类型保护和类型区分
  {
    if ((<Fish>pet).swim) {
      (<Fish>pet).swim();
    } else {
      (<Bird>pet).fly();
    }

    /**
     * !用户自定义的类型保护
     * @类型谓词 pet is Fish
     * 
     * @param {(Fish | Bird)} pet
     * @returns {pet is Fish}
     */
    function isFish(pet: Fish | Bird): pet is Fish {
      return (<Fish>pet).swim !== undefined;
    }

    if (isFish(pet)) {
      pet.swim();
    } else {
      pet.fly();
    }

    // typeof 类型保护
    // 这样做其实是没必要的
    function isNumber(x: any): x is number {
      return typeof x === 'number';
    }

    function isString(x: any): x is string {
      return typeof x === 'string';
    }

    function padLeft1(value: string, padding: string | number) {
      if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
      }
      if (isString(padding)) {
        return padding + value;
      }
      throw new Error(`Expected string or number, got '${padding}'.`);
    }

    // instanceof 类型保护
    interface Padder {
      getPadderingString(): string;
    }

    class SpaceRepeatingPadder implements Padder {
      constructor(private numSpaces: number) { }
      getPadderingString() {
        return Array(this.numSpaces + 1).join(' ');
      }
    }

    class StringPadder implements Padder {
      constructor(private value: string) { }
      getPadderingString() {
        return this.value;
      }
    }

    function getRandomPadder() {
      return Math.random() < 0.5
        ? new SpaceRepeatingPadder(4)
        : new StringPadder('    ');
    }

    let padder: Padder = getRandomPadder();
    if (padder instanceof SpaceRepeatingPadder) {
      padder; // 类型细化为'SpaceRepeatingPadder'
    }
    if (padder instanceof StringPadder) {
      padder; // 类型细化为'StringPadder'
    }
  }
}

// 可为 null 的类型
// 类型检查器认为 null与 undefined可以赋值给任何类型
// --strictNullChecks 标记可以解决此问题
{
  let s = "foo";
  // s = null; // 错误, 'null'不能赋值给'string'
  let sn: string | null = "bar";
  sn = null; // 可以

  // sn = undefined; // error, 'undefined'不能赋值给'string | null'

  /**
   * ! 可选参数和可选属性
   * 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined
   * 即 f(x: number, y?: number) 相当于 f(x: number, y?: number | undefined)
   * 此时 null 不能赋值给 y
   *
   * @param {number} x
   * @param {number} [y]
   * @returns
   */
  function f(x: number, y?: number) {
    return x + (y || 0);
  }

  f(1, 2);
  f(1);
  f(1, undefined);
  // f(1, null); // error

  // 可选属性也会有同样的处理
  class C {
    a: number;
    b?: number;
  }
  let c = new C();
  c.a = 12;
  // c.a = undefined; // error
  // c.a = null; // error
  c.b = 13;
  c.b = undefined;
  // c.b = null; // error

  // 类型保护和类型断言
  // function broken(name: string | null): string {
  //   function postfix(epithet: string) {
  //     return name.charAt(0) + '. the ' + epithet; // Error
  //   }
  //   name = name || 'Bob';
  //   return postfix('great');
  // }

  function fixed(name: string | null): string {
    function postfix(epithet: string) {
      return name!.charAt(0) + '. the ' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
  }
}

// 类型别名
{
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
      return n;
    } else {
      return n();
    }
  }

  // 类型别名也可以是泛型
  type Container<T> = { value: T }
  // 可以使用类型别名来在属性里引用自己
  type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
  }

  interface Tree1<T> {
    value: T;
    left: Tree1<T>;
    right: Tree1<T>;
  }

  type Tree2<T> = Tree1<T>;

  // 与交叉类型一起使用
  type LinkedList<T> = T & { next: LinkedList<T> };
  interface Person {
    name: string;
  }
  var people: LinkedList<Person> = {} as LinkedList<Person>;
  var s = people.name;
  var s = people.next.name;
  var s = people.next.next.name;
  var s = people.next.next.next.name;


}

// 接口 vs. 类型别名
type Alias = { num: number }
interface Interface {
  num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
// 类型别名不能被 extends和 implements
// 类型别名不能扩展
interface InterfaceA extends Interface {
  name: string;
}

interface InterfaceA {
  test: number;
}

// 字符串字面量类型
{
  type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
  class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
      switch (easing) {
        case 'ease-in':
          break;
        case 'ease-out':
          break;
        case 'ease-in-out':
          break;
        default:
          break;
      }
    }
  }
  let button = new UIElement();
  button.animate(0, 0, 'ease-in');
  // button.animate(0, 0, "uneasy"); // error
}

{
  enum Easing {
    easeIn = 'ease-in',
    easeOut = 'ease-out',
    easeInOut = 'ease-in-out'
  }
  class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
      switch (easing) {
        case Easing.easeIn:
          break;
        case Easing.easeOut:
          break;
        case Easing.easeInOut:
          break;
        default:
          break;
      }
    }
  }
  let button = new UIElement();
  button.animate(0, 0, Easing.easeIn);
  // button.animate(0, 0, 'ease-in'); // error
}

{
  // 字符串字面量类型还可以用于区分函数重载
  function createElement(tagName: 'img'): HTMLImageElement;
  function createElement(tagName: 'input'): HTMLInputElement;
  function createElement(tagName: string): HTMLElement {
    return new HTMLElement;
  }
}

// 数字字面量类型
{
  function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    return 1;
  }
}

// 可辨识联合
{
  interface Square {
    kind: 'square';
    size: number;
  }
  interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
  }
  interface Circle {
    kind: 'circle';
    radius: number;
  }

  type Shape = Square | Rectangle | Circle | Triangle;

  function area(s: Shape) {
    switch (s.kind) {
      case 'square':
        return s.size * s.size;
      case 'rectangle':
        return s.width * s.height;
      case 'circle':
        return Math.PI * s.radius ** 2;
      default:
        break;
    }
  }

  // 完整性检查
  interface Triangle {
    kind: 'triangle';
    height: number;
    bottom: number;
  }

  type Shape1 = Square | Rectangle | Circle | Triangle;

  // 方法-：启用 --strictNullChecks 并且指定一个返回值类型
  // function area1(s: Shape1): number { // 函数缺少结束 return 语句，返回类型不包括 "undefined"
  //   switch (s.kind) {
  //     case 'square':
  //       return s.size * s.size;
  //     case 'rectangle':
  //       return s.width * s.height;
  //     case 'circle':
  //       return Math.PI * s.radius ** 2;
  //   }
  // }

  // 方法二：使用 never类型
  function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x);
  }
  function area2(s: Shape1) {
    switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
      // default: return assertNever(s); // 类型“Triangle”的参数不能赋给类型“never”的参数
    }
  }
}

// 多态的 this 类型
{
  class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
      return this.value;
    }
    public add(operand: number): this {
      this.value += operand;
      return this;
    }
    public multiply(operand: number): this {
      this.value *= operand;
      return this;
    }
  }
  let v = new BasicCalculator(2)
    .multiply(5)
    .add(1)
    .currentValue();

  class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
      super(value);
    }
    public sin() {
      this.value = Math.sin(this.value);
      return this;
    }
  }

  let v1 = new ScientificCalculator(2)
    .multiply(5)
    .sin()
    .add(1)
    .currentValue();
}

// 索引类型
{
  function pluck1(o, names) {
    return names.map(n => o[n]);
  }

  function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  }
  interface Person {
    name: string;
    age: number;
  }
  let person: Person = {
    name: 'Jarid',
    age: 35
  };
  let strings: string[] = pluck(person, ['name']);

  function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name];
  }
  let name: string = getProperty(person, 'name');
  let age: number = getProperty(person, 'age');
  // let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'

  // 索引类型和字符串索引签名
  interface Map<T> {
    [key: string]: T;
  }
  let keys: keyof Map<number>; // string
  let value: Map<string>['foo']; // number
}

// 映射类型
{
  interface Person {
    name: string;
    age: number;
  }

  interface PersonPartial {
    name?: string;
    age?: number;
  }

  interface PersonReadonly {
    readonly name: string;
    readonly age: number;
  }

  type Partial<T> = {
    [P in keyof T]?: T[P];
  }

  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  }

  type PersonPartial1 = Partial<Person>;
  type PersonReadonly1 = Readonly<Person>;

  type Keys = 'option1' | 'option2';
  type Flags = { [K in Keys]: boolean };
  type Flags1 = {
    option1: boolean;
    option2: boolean;
  }

  type Nullable<T> = { [P in keyof T]: T[P] | null };
  type Partial1<T> = { [P in keyof T]?: T[P] };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  }
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  }

  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  }

  // 由映射类型进行推断
  function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
      result[k] = t[k].get();
    }
    return result;
  }
  let originalProps = unproxify(proxyProps);
}