TypeScript 学习笔记
====
### 未理解透彻

1. 基础类型 > Never
2. ~~接口 > 可索引的类型~~
3. this 工作原理
4. 泛型 > 在泛型约束中使用类型参数
5. 高级类型 > 可为 null 的类型 > 类型保护和类型断言
6. ~~高级类型 > 索引类型 > 索引类型和字符串索引签名~~
7. 高级类型 > 映射类型

### 特殊操作符

1. ***索引类型查询操作符*** `keyof T`
```typescript
interface Person {
    name: string;
    age: number;
}
const personProps: keyof Person; // 'name' | 'age'
```

2. ***索引访问操作符*** `T[K]`
```typescript
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```
