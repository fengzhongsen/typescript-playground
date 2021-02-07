/// <reference path="Validation">
namespace Validation {
  let numberRegexp = /^[0-9]+S/;

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}