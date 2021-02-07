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
