// 类型推论

// 最佳通用类型
// 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
let x = [0, 1, null];

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

  class Elephant extends Animal {
    constructor() {
      super('Elephant');
    }
  }

  class Snake extends Animal {
    constructor() {
      super('Snake');
    }
  }

  // 明确声明
  let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];

  // 类型推断结果
  let zoo1: (Rhino | Elephant | Snake)[] = [new Rhino(), new Elephant(), new Snake()];
}

// 上下文类型
{
  window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);
  };

  // 类型推断结果
  window.onmousedown = function (mouseEvent: any) {
    console.log(mouseEvent.button);
  };
}