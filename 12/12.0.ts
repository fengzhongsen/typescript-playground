// 模块
// ES6导出

// 导出声明
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

export const numberRegexp = /^[0-9]+S/;

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// 导出语句
export {
  ZipCodeValidator,
  ZipCodeValidator as mainValidator
}

// 默认导出

// 每个模块都可以有一个default导出
export default ZipCodeValidator;
// default导出也可以是一个值
// export default 123;
