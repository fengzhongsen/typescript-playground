// 类

// 继承
// 在TypeScript里，成员都默认为 public
{
  class Animal {
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
  }

  class Snake extends Animal {
    constructor(name: string) {
      super(name);
    }
    move(distanceInMeters = 5) {
      console.log('Slithering...');
      super.move(distanceInMeters);
    }
  }

  class Horse extends Animal {
    constructor(name: string) {
      super(name);
    }
    move(distanceInMeters = 45) {
      console.log('Galloping...');
      super.move(distanceInMeters);
    }
  }

  let sam = new Snake('Sammy the Python');
  let tom: Animal = new Horse('Tommy the Palomino');

  sam.move();
  tom.move(34);
}

// 理解 private
// 成员被标记成 private时，它就不能在声明它的类的外部访问
{
  class Animal {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  class Rhino extends Animal {
    constructor() {
      super('Rhino');
    }
  }

  class Employee {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  let animal = new Animal('Goat');
  let rhino = new Rhino();
  let employee = new Employee('Bob');

  animal = rhino;
  // animal = employee; // l类型不兼容
}

// 理解 protected
// protected 成员在派生类中仍然可以访问
{
  class Person {
    protected name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  class Employee extends Person {
    private department: string;
    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }
    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }
  let howard = new Employee('Howard', 'Sales');
  console.log(howard.getElevatorPitch());
  // console.log(howard.name);
}

// 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
{
  class Person {
    protected name: string;
    protected constructor(theName: string) {
      this.name = theName;
    }
  }

  class Employee extends Person {
    private department: string;
    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }
    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee('Howard', 'Sales');
  // let john = new Person('John'); // 'Person' 的构造函数是被保护的.
}

// readonly
{
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
      this.name = theName;
    }
  }
  let dad = new Octopus('Man with the 8 strong legs');
  // dad.name = 'Man with thg 3-piece suit'; // name 是只读的
}

// 参数属性：我们把声明和赋值合并至一处。
// 使用 private 限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。
{
  class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) { }
  }
}

// 存取器
// 只带有 get 不带有 set 的存取器自动被推断为 readonly
{
  let passcode = 'secret passcode';
  class Employee {
    private _fullName: string;

    get fullName(): string {
      return this._fullName;
    }

    set fullName(newName: string) {
      if (passcode && passcode === 'secret passcode') {
        this._fullName = newName;
      } else {
        console.log('Error: Unauthorized update of employee!');
      }
    }
  }

  let employee = new Employee();
  employee.fullName = 'Bob Smith';
  if (employee.fullName) {
    // alert(employee.fullName);
  }
}

// 静态属性
{
  class Grid {
    static origin = { x: 0, y: 0 };
    calculateDistanceFromOrigin(point: { x: number; y: number }) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor(public scale: number) { }
  }

  let grid1 = new Grid(1.0);
  let grid2 = new Grid(5.0);
  console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
  console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
}

// 抽象类
{
  abstract class Department {
    constructor(public name: string) { }

    printName(): void {
      console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
  }

  class AccountingDepartment extends Department {
    constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }
    printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
      console.log('Generating accounting reports...');
    }
  }

  let department: Department;
  // department = new Department(); // 无法创建抽象类的实例
  department = new AccountingDepartment();
  department.printName();
  department.printMeeting();
  // department.generateReports(); // 方法在声明的抽象类中不存在
}

// 构造函数
{
  class Greeter {
    static standardGreeting = 'Hello, there';
    greeting: string;
    greet() {
      if (this.greeting) {
        return `Hello, ${this.greeting}`;
      } else {
        return Greeter.standardGreeting;
      }
    }
  }

  let greeter1: Greeter = new Greeter();
  console.log(greeter1.greet());

  let greeterMaker = Greeter;
  greeterMaker.standardGreeting = 'Hey there';

  let greeter2:Greeter = new greeterMaker();
  console.log(greeter2.greet());

  let greeter3: Greeter = new Greeter();
  console.log(greeter3.greet());

}


