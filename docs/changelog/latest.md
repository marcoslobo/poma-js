---
id: latest
title: Changelog (v4)
---

4.7.1
=====

- Others

  - Update dev dependencies to latest.
  - Update loglevel to latest dependency to use native typings. Removed internal shims.

- Fixes

  - encrypt/decrypt in Wallet return promise correctly

4.7.0
=====

- poma-core

  - Add v2.10.2 RPC methods

- Docs

  - Add code examples

- Fixes

  - Fix Fixed8 overflow in nep5 transfer method

4.6.1
=====

- Fixes

  - Fix getTokenBalances multiplying balance wrongly.

4.6.0
=====

- poma-core

  - Add parsing capabilities for RegisterTransaction and EnrollmentTransaction. At this point, all transaction types in neo 2.x are now fully supported.
  - Update axios dependency due to minor security concern.

- Docs

  - Add jsfiddle docs describing neo RPC.

- Others

  - Update all dev dependencies to latest due to various security warnings.

- Fixes

  - Fix decoding of negative Fixed8 hex string
  - Update VM status output for neo v2.10.2
  - Update default rpc endpoints to suggestions from NGD

4.5.2
=====

- patch release to fix production distribution.


4.5.0
=====

- poma-core

  - Add parsing capabilities for IssueTransaction and MinerTransaction

- Misc

  - Updates to breaking dev dependencies. Major update to clean-webpack-plugin that required a webpack config update.
  - Change linter from tslint (in midst of being deprecated) to eslint-typescript. This introduced a lot of linting warnings as the new ruleset is stricter.

- Fixes

  - Fix neon-api httpsOnly setting not being propagated correctly.
  - Fix test being hung up on the first url and not working as intended. Test will now cut the array at a random point, effectively doing a shuffle. We also use a rough heuristic to determine if node is actually running and up to date with the rest of the network. This should reduce breakage due to single node being stuck on an old block.

4.4.0
=====

- Neon-api

  - Add neoCli API Client. Do not that not all endpoints are currently implemented and the user will have ensure the node is setup to use the plugin.

- Misc
  - Update dev dependencies

- Fixes

  - Fix StackItem serialization/deserialization of zero values.

4.3.3
=====

- Fixes

  - retrieveAppCall returns null for non-appcall operations. This allows non-essential instructions to be parsed and ignored.
  - Fix transaction deserialization without signatures
  - Correct error message in nep2.decrypt (Wrong capitalization of second word)
  - Fix `module` exports pointing at wrong files
  - Update utils error messages
  - Fix es6 getter error

4.3.0
=====

- Neon-NEP5

  - `getTokens` functionality is available. Similar to how `getTokenBalances` complement `getTokenBalance`, this new method will allow developers to quickly retrieve multiple token information by grouping up the call within a single HTTP call.

- Guides

  - Experimenting with generating guides from examples, literate programming style. The runnable examples can be found in the `examples` folder.

- Fixes

  - Further fix on ScriptBuilder's emission of integers.
  - Fix exported files for poma-core. Previously, the `package.json` was pointing at a missing file.
  - Lock dependencies to a fixed version following a major package vulnerability incident.

4.2.0
=====

- Neon-domain

  - Ability to resolve human-friendly addresses into blockchain addresses through the invocation of domain contracts.

- Dependencies

  - Dependencies are updated to latest. `bignumberjs` is not upgraded due to it being a major version jump.

- Fixes

  - Fix ScriptBuilder's integer not emitted as two's complement.
  - Use typing packages available for `bn.js` and `elliptic`.
  - Fix `getVersion` in RPC Client not parsing response properly.

4.1.3
=====

- Fixes

  - Remove `applyTx` from Balance.calculate. You are recommended to apply only after sending out the transaction as the constructed transaction may be rejected.
  - Fix `doInvoke` not attaching intents properly, resulting in no assets sent.
  - Add check for empty claims in `fillClaims`. This means that `claimGas` will throw earlier if there is no available gas to claim.
  - Various documentation fixes

4.1.0
=====

- Neon-NEP9

  - Ability to parse NEP9 QR codes. Do note that this does not come with a QR parser and you require another package to actually scan and decipher the QR code.

- poma-core

  - Transaction.AddWitness orders the witness as best as it can. Witnesses are required to be in order for the transaction to process properly. AddWitness is the proper API call to append a witness to the transaction as opposed to directly calling append on the array. Do note that serializing the witness results in loss of meta data and thus the ordering of the deserialized transaction may not be optimal.

- Neon-API

  - API to depend on AddWitness for ordering.


4.0.0
=====

- Publishing

  > Version 4 will mark the start of the mono-repository for neon-js. This means that there will be multiple packages being published from this repository. `neon-js` will still fulfil the role of the package for browser based interaction with the NEO blockchain. `poma-core` is the core package that contains most of the code from the old `neon-js`. However, the semantic API is moved to `neon-js` and will not be included in the core package. `neon-api` and `neon-nep5` are extracted plugin packages that relies on the `poma-core` package. They contain functionality that is not integral to the workings of the blockchain but are useful in many situations.

- API

  > API is now extracted into its own package under `neon-api`. The core functionalities offered by this package are high level API methods and 3rd party endpoint calls.
  - Managed API methods now require an API provider under the property `api`. This API provider will be used as the main source for data retrieval.
  - The properties `net`, `address` and `privateKey` is now deprecated. Please use `api` to denote the specific network and provider you wish to use and `account` to replace `address` and `privateKey`.
  - The `Provider` interface is now a wrapper for each API provider.
  - `sendFromSmartContract` is now a string property that is the scripthash of the smart contract that you are manipulating.
  - Removed NEP5 methods from API. They now live in the `neon-nep5` package.
  - Removed `cmc` from API.

- NEP5

  > NEP5 is now extracted into its own package under `neon-nep5`. The core functionalities offered by this package are high level common functions and ABI script functions.
  - ABI functions are available to easily create scripts for each documented NEP5 function.
  - Change output of `getTokenBalances` to output a dictionary of symbols to Fixed8 instead of symbols to numbers.

- Core

  > `poma-core` forms the base package and contains all the modules required for interaction with the blockchain.
  - Utility
    - Methods outputting arrayBuffers are now standardised to output UInt8Arrays.
    - bignumber.js package is updated to **7.2** which contains breaking changes. Fixed8 now implements some of the common aliases (ceil, floor, equals, round) but not all changes are covered.

  - Wallet
    - All components are now ES6 classes (AssetBalance, ClaimItem, Coin).
    - Changed message signing API to not perform any message transformation (previously it assumed input was ASCII and converted it to hex). This was done so all signing methods can rely on the same underlying methods (be it message or transaction signing).
    - Encryption and decryption is now fully async.
    - Add support for multi-sig Account creation through `Account.createMultiSig`.
    - Removal of `fs`. `Wallet.readFile` is removed.

  - Transaction
    - All components are now ES6 classes (TransactionAttribute, TransactionInput, TransactionOutput, Witness).
    - Individual transaction types are now ES6 classes.
    - `Transaction` class is now a static class helper.
    - Add support for multi-sig signature through `Witness.buildMultiSig`.

  - Smart Contract
    - Add `StackItem` class.

  - RPC
    - Overhaul parsers. Use `BuildParser` (replaces VMZip) to build a list of parsers to parse the results.
    - Included several common parsers to use.
