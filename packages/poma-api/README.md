# poma-api

## Overview

Poma-API plugin. Provides the package `api` within `poma-js`.

- Provides high level functionality for crafting transactions.
- Provides API for accessing external data providers (pomascan).

## Installation

```sh
yarn i @cityofzion/poma-api
```

```js
const pomaCore = require("@marcoslobo/poma-core");
const apiPlugin = require("@marcoslobo/poma-api");

const pomaJs = apiPlugin(pomaCore);

module.exports = pomaJs;
```
