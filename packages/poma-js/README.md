# Poma-js

Constructed package using:

- `poma-core`
- `Poma-api`
- `Poma-nep5`

In addition, this package exposes a high level semantic API binding for beginner usage. The semantic API can be found in the default export of the package.

```js
const Poma = require("marcoslobo/Poma-js");

console.log(Poma); // {wallet, tx, api, nep5, etc...}

const PomaJs = Poma.default;

console.log(PomaJs); // {create, get, sign, verify,...}
```

The semantic API follows a convention of Verb-Noun. Any extra words beyond the first 2 is collapsed into the Noun and camelcased.

```js
PomaJs.create.stringStream("1234");
PomaJs.encrypt.privateKey("key");
```

The exceptions to this rule are the managed methods provided by `api`:

```js
PomaJs.sendAsset
PomaJs.claimGas
PomaJs.doInvoke
PomaJs.setupVote
```
