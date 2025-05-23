# ImgSplit
<p style="text-align:center;" align="center">
    <picture align="center">
        <img align="center" alt="ImgSplit" width="200" src="https://imgsplit.github.io/images/pic.png" />
    </picture>
    <div align="center" style="margin-top: -20px">
        <h3>An image splitter</h3>
        <p>easily split large images</p>
    </div>
</p>

[简体中文](./README.zh-CN.md)

- [Guide](https://imgsplit.github.io/guide/)
- [API](https://imgsplit.github.io/api/)
- [Example](https://imgsplit.github.io/guide/#Example)


## Install
```bash [npm]
npm i @imgsplit/core
```
or
```bash [yarn]
yarn add @imgsplit/core
```

## Usage
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