// 函数

// 函数类型
{
  function add(x: number, y: number): number {
    return x + y;
  }

  // 书写完成函数类型
  let myAdd1: (x: number, y: number) => number =
    function (x: number, y: number): number { return x + y; }

  // 推断类型
  let myAdd2 = function (x: number, y: number): number { return x + y; }

  let myAdd3: (x: number, y: number) => number =
    function (x, y) { return x + y; }

}

// 可选参数
{
  /**
   * !可选参数必须跟在必须参数后面
   * 
   * @param {string} firstName
   * @param {string} [lastName]
   * @returns
   */
  function buildName(firstName: string, lastName?: string) {
    return firstName + ' ' + (lastName || '');
  }
  let result1 = buildName('Bob');
  let result2 = buildName('Bob', 'Adams');

  /**
   * !默认值参数也可以不传值
   *
   * @param {string} firstName
   * @param {string} [lastName="Smith"]
   * @returns
   */
  function buildName1(firstName: string, lastName: string = "Smith") {
    return firstName + ' ' + lastName;
  }
  let result3 = buildName1('Bob');
  let result4 = buildName1('Bob', 'Adams');

  /**
   * !如果默认值参数在必须参数前面，需要使用undefined值来获得默认值
   *
   * @param {string} [firstName="John"]
   * @param {string} [lastName]
   * @returns
   */
  function buildName2(firstName: string = "John", lastName?: string) {
    return firstName || '' + ' ' + lastName;
  }
  let result5 = buildName2();
  let result6 = buildName2('Bob', 'Adams');
  console.log(result1);
  console.log(result2);
  console.log(result3);
  console.log(result4);
  console.log(result5);
  console.log(result6);
}

// 剩余参数
{
  function buildName3(firstName: string, ...restOdName: string[]) {
    return firstName + ' ' + restOdName.join(' ');
  }

  let buildNameFun: (firstName: string, ...rest: string[]) => string = buildName3;
}

// 重载
{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x: { suit: string; card: number; }[]): number;
  function pickCard(x: number): { suit: string; card: number; };
  function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  let pickedCard2 = pickCard(15);
  alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}
