# vite-plugin-file-create


一个vite插件, 在vite打包时创建文件并保存至输出目录.

## 安装

```shell
npm i -D vite-plugin-file-create # yarn add -D vite-plugin-file-create
```

## 使用

下面是一个示例：生成版本号文件并保存到输出目录。

```js
// vite.config.js / vite.config.ts
import { viteFileCreate } from 'vite-plugin-file-create'

const versionStr = `V1.0.1.${Date.now()}` // 版本号

export default {
  plugins: [
    viteFileCreate(versionStr, "version.txt")
  ]
}
```
