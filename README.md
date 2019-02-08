# README

## Typescript

For Typescript projects, add the following file to the svg directory

```js
// index.d.ts
declare module '*.svg' {
    const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
    export default value;
```

## Examples

[https://geoshen.com](https://geoshen.com)