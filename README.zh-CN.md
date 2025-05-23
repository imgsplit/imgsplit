# ImgSplit
<p style="text-align:center;" align="center">
    <picture align="center">
        <img align="center" alt="ImgSplit" width="200" src="https://imgsplit.github.io/images/pic.png" />
    </picture>
    <div align="center" style="margin-top: -20px">
        <h3>图片分割器</h3>
        <p>轻松分割长图</p>
    </div>
</p>

[English](./README.md)

- [指南](https://imgsplit.github.io/zh/guide/)
- [API](https://imgsplit.github.io/zh/api/)
- [示例](https://imgsplit.github.io/zh/guide/#示例)


## 安装
```bash [npm]
npm i @imgsplit/core
```
or
```bash [yarn]
yarn add @imgsplit/core
```

## 使用
```ts
import {imgsplit} from "@imgsplit/core";

const result = await imgsplit(
    'https://imgsplit.github.io/images/example.png',
    256
);

for (let i = 0; i < result.length; i++) {
    const {
        x, y,
        width, height,
        dataURL
    } = result[i];

    // ...

}
```