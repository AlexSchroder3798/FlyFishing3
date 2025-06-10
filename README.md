FlyFishing3

### Path Aliases

This project uses `babel-plugin-module-resolver` to allow imports using the `@`
alias, which resolves to the project root:

```js
import MyComponent from '@/components/MyComponent';
```
