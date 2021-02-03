// 泛型

// 除了泛型接口，我们还可以创建泛型类，无法创建泛型枚举和泛型命名空间。
// 泛型类指的是实例部分的类型，静态属性不能使用泛型类型。

function identity1(arg: number): number {
  return arg;
}

function identity2(arg: any): any {
  return arg;
}

// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

function loggingIdentity1<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}

let output = identity<string>('myString');

// 泛型函数类型
let myIdentity: <T>(arg: T) => T = identity;
let myIdentity1: <U>(arg: U) => U = identity;
let myIdentity2: { <T>(arg: T): T } = identity;

// 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity3: GenericIdentityFn = identity;

interface GenericIdentityFn1<T> {
  (arg: T): T
}

let myIdentity4: GenericIdentityFn1<number> = identity;

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = '';
stringNumeric.add = function (x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'));

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity2({ length: 1, value: 3 });

// 在泛型约束中使用类型参数

// 在泛型里使用类类型
function create<T>(c: { new(): T }): T {
  return new c();
}

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
