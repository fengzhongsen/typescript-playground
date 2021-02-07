// 模块
// ES6导入

import { ZipCodeValidator } from './12.0';
import { ZipCodeValidator as ZCV } from './12.0';
import * as validator from './12.0';
import { RegExpBasedZipCodeValidator, mainValidator } from './12.1';
import ZipCodeValidatorDefault from './12.0';
import './12.0';

let myValidator;
myValidator = new ZipCodeValidator;
myValidator = new ZCV;
myValidator = new validator.ZipCodeValidator;
myValidator = new RegExpBasedZipCodeValidator;
myValidator = new mainValidator;
myValidator = new ZipCodeValidatorDefault;
