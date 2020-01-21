# poma-nep5

## Overview

Poma-NEP5 plugin. Provides the package `nep5` within `poma-js`.

- ABI functions to quickly craft function calls.
- High level functions to get NEP5 token information.

## Installation

```sh
yarn i @marcoslobo/neon-nep5 @marcoslobo/poma-core
```

```js
const neonCore = require("@marcoslobo/poma-core");
const nep5Plugin = require("@marcoslobo/neon-nep5");

const neonJs = nep5Plugin(neonCore);

module.exports = neonJs;
```
