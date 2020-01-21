# neon-domain

## Overview

Poma-Domain plugin. Provides the package `domain` within `poma-js`.

- Provides functionality to resolve domain names to addresses.

## Installation

```sh
yarn i @marcoslobo/neon-domain
```

```js
const pomaCore = require("@marcoslobo/poma-core");
const domainPlugin = require("@marcoslobo/poma-domain");

const pomaJs = domainPlugin(pomaCore);

module.exports = pomaJs;
```

## API

In order to use the resolver, you must first create an instance of it using the scripthash:

```js
const provider = pomaJs.domain.nns.instance(contractScriptHash);
```

The resolver interface is defined in `provider/common.ts`.

You can resolve a domain by providing a rpc node url and the domain:

```js
const blockchainAddress = provider.resolveDomain(rpcUrl, "myaddress.poma");
```
