---
title: NPM
urlname: OevidEbOkoyqhNxjBz7cnDMfnkd
date: '2025-04-05 10:22:51'
updated: '2025-04-05 11:16:48'
---
## 1，npm打包
npm包的基本组成
```undefined
## 核心文件
1. package.json ：包的配置文件，定义了包的基本信息和依赖
   - 包名称、版本、描述
   - 入口文件（main字段）
   - 依赖项列表
   - 脚本命令
   - 许可证信息
2. 源代码 ：通常放在src或lib目录中
   - JavaScript/TypeScript文件
   - CSS/SCSS等样式文件
   - 其他资源文件
3. 构建输出 ：通常放在dist或build目录中
   - 编译后的JavaScript代码
   - 压缩后的CSS
   - 类型定义文件(.d.ts)
4. README.md ：包的说明文档
   - 安装方法
   - 使用示例
   - API文档
   - 贡献指南
## 可选文件
1. LICENSE ：许可证文件
2. .npmignore ：指定发布时要排除的文件
3. CHANGELOG.md ：版本更新日志
4. 测试文件 ：通常放在test或__tests__目录
5. 配置文件 ：如tsconfig.json、.eslintrc等
```
package.json ：包的配置文件，定义了包的基本信息和依赖
```undefined
 "scripts": {
    "build": "turbo run build --filter=!./apps/*",
    "build:lib": "turbo run build --filter=!./apps/* --filter=!./website",
    "dev": "turbo run dev --filter=!./apps/* --filter=!./website",
    "build:pkgs": "turbo run build --filter=./packages/* --filter=./@weapp-core/*",
    "build:apps": "turbo run build --filter=./apps/* --filter=!weapp-library",
    "test": "vitest run --coverage.enabled",
    "test:dev": "vitest",
    "lint": "turbo run lint",
    "release": "changeset",
    "pr": "changeset pre enter alpha",
    "pr:beta": "changeset pre enter beta",
    "pr:rc": "changeset pre enter rc",
    "pr:exit": "changeset pre exit",
    "cv": "changeset version ",
    "ci": "turbo run --filter=!./apps/* --filter=!./website build",
    "//": " lint test",
    "e2e": "vitest run -c ./e2e/vitest.e2e.config.ts",
    "e2e:dev": "vitest -c ./e2e/vitest.e2e.config.ts",
    "e2e:u": "vitest run -u -c ./e2e/vitest.e2e.config.ts",
    "publish-packages": "pnpm run ci && changeset version && changeset publish"
```
### npm 包生成过程
实际的 npm 包生成是在发布过程中完成的，大致流程如下：
1. 使用 pnpm changeset 创建变更记录

1. 使用 pnpm changeset version 更新受影响包的版本号

1. 使用 pnpm build:pkgs 构建包

1. 使用 pnpm changeset publish 发布包到 npm 仓库

### 构建后的包位置
构建后的包通常位于每个包目录的 dist 文件夹中
### 完整发布流程
在 weapp-vite 项目中，你可以使用根目录的 publish-packages 脚本来完成完整的发布流程：
```yaml
pnpm publish-packages
```
这个命令会依次执行构建、版本更新和发布操作。


### 
### 注意事项
1. 确保每个包的 tsconfig.json 正确配置

1. 使用 tsup 、 unbuild 等工具简化构建过程

1. 在 .npmignore 中排除不需要发布的文件

1. 使用 pnpm -w 在根目录安装开发依赖，减少重复

这样就可以将 packages 目录下的每个文件夹打包并发布为独立的 npm 包了。


## 2,项目构建工具
这个项目使用了多种构建工具的组合，主要包括：


1. Turborepo (turbo) ：作为 monorepo 的任务编排工具，负责协调各个包的构建、测试等任务。从根目录的 package.json 中可以看到大量使用了 turbo run 命令。

1. tsup ：作为实际的 TypeScript 构建工具，用于将 TypeScript 代码编译为 JavaScript。这是一个基于 esbuild 的高性能构建工具，适合库的打包。

1. unbuild ：某些包可能使用了 unbuild 作为构建工具，它提供了更多的配置选项。

项目的构建流程大致是：


- Turborepo 负责调度和并行执行各个包的构建任务

- 各个包内部使用 tsup 或 unbuild 进行实际的代码编译和打包

- TypeScript 编译器 (tsc) 主要用于类型检查，而不是实际的代码生成

从 tsconfig.json 的配置来看，项目使用了现代的 ESM 模块系统和打包工具，这与 tsup 的定位相符。
## 3，Vitest 测试框架
Vitest 是一个基于 Vite 的现代测试框架，它提供了简单高效的方式来测试你的代码。下面介绍如何使用 Vitest 进行测试：
#### 基本测试结构
```typescript
// 测试套件
describe('计算函数测试', () => {
  // 单个测试用例
  test('加法函数应该正确计算两个数字', () => {
    // 引入被测试的函数
    import { add } from '@/utils/math';
    
    // 执行函数并断言结果
    expect(add(1, 2)).toBe(3);
  });
  
  // 另一个测试用例
  it('乘法函数应该正确计算两个数字', () => {
    import { multiply } from '@/utils/math';
    
    expect(multiply(2, 3)).toBe(6);
  });
});
```
#### 常用断言方法
```typescript
// 相等性测试
expect(value).toBe(expected);        // 严格相等 (===)
expect(value).toEqual(expected);     // 深度相等 (对象比较)

// 真值测试
expect(value).toBeTruthy();          // 检查是否为真值
expect(value).toBeFalsy();           // 检查是否为假值

// 包含测试
expect(array).toContain(item);       // 数组包含项
expect(string).toContain(substring); // 字符串包含子串

// 异常测试
expect(() => throwingFunction()).toThrow(); // 检查是否抛出异常
```
#### 异步测试
```typescript
// Promise 测试
test('异步函数测试', async () => {
  const result = await fetchData();
  expect(result).toEqual({ name: 'test' });
});

// 回调函数测试
test('回调函数测试', (done) => {
  fetchWithCallback((data) => {
    expect(data).toBe('success');
    done();
  });
});
```
#### 模拟 (Mock)
```typescript
// 模拟函数
const mockFn = vi.fn();
mockFn.mockReturnValue('mocked value');

// 模拟模块
vi.mock('@/api/user', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Test User' })
}));

// 模拟定时器
vi.useFakeTimers();
vi.advanceTimersByTime(1000); // 前进1000ms
```
####  在 weapp-ide-cli 中运行测试
```plaintext

在 weapp-ide-cli 包目录下运行测试：

```bash
cd f:\project_space\weapp-vite\packages\weapp-ide-cli
pnpm test

或者在项目根目录运行特定包的测试：

```bash
cd f:\project_space\weapp-vite
pnpm test --filter=weapp-ide-cli
```
### 本地测试包
pnpm link 是一种在不发布到 npm 仓库的情况下，在本地测试 npm 包的方法。这对于开发和调试非常有用。
##### pnpm link 的工作原理
当你开发一个 npm 包时，通常需要在其他项目中测试它的功能。但如果每次修改都发布到 npm 仓库再安装，会非常耗时。 pnpm link 提供了一种快捷方式，它创建了一个符号链接，让你的测试项目直接使用本地开发中的包。

在发布前，可以使用 pnpm link 在本地测试：
```bash
# 在包目录中
cd f:\project_space\weapp-vite\packages\要测试的包
pnpm link --global

# 在测试项目中
cd f:\其他项目路径
pnpm link --global 包名称
```
## 优势
1. 实时测试 ：修改包代码后，无需重新安装，测试项目可以立即使用最新代码

1. 快速迭代 ：加快开发和调试周期

1. 避免频繁发布 ：不需要为了测试而频繁发布到 npm 仓库

在 monorepo 中的应用

在 weapp-vite 这样的 monorepo 项目中，包之间通常已经通过 workspace 相互引用，但如果你想在外部项目中测试某个包， pnpm link 是一个很好的选择。

当你完成测试后，可以使用 pnpm unlink 来移除链接。



Vitest 配置文件中的 alias 设置确保测试文件可以使用与源代码相同的导入路径。
