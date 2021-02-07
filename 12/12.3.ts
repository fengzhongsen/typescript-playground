// 模块
// TS导出

const numberRegexp = /^[0-9]+S/;
class ZipCodeValidator {
  isAcceptable(s: string): boolean {
    return s.length === 5 && numberRegexp.test(s);
  }
}

export = ZipCodeValidator;