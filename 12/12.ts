/// <reference path="12.d.ts">
import url = require("url");
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");

// 模块
// 外部模块
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }

  export module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
  }
}

// 模块声明通配符
declare module "*!text" {
  const content: string;
  export default content;
}

declare module "json!*" {
  const value: any;
  export default value;
}

import fileContent from './12.txt!text';
import data from 'json!http://example.com/data.json';
console.log(data, fileContent)