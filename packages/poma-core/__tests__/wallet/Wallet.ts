import Wallet from "../../src/wallet/Wallet";
import Account from "../../src/wallet/Account";

const ADDRESS1 = "Adc4jT59RjDLdXbBni6xzg6SEcLVhHZ5Z9";
const PRIVATE_KEY1 =
  "a7b9775c6b9136bf89f63def7eab0c5f2d3d0c9e85492717f54386420cce5aa1";
const PRIVATE_KEY2 =
  "4f0d41eda93941d106d4a26cc90b4b4fddc0e03b396ac94eb439c5d9e0cd6548";
const WALLET_JSON = {
  accounts: [
    {
      address: "Adc4jT59RjDLdXbBni6xzg6SEcLVhHZ5Z9",
      contract: {
        deployed: false,
        parameters: [{ name: "signature", type: "Signature" }],
        script:
          "2102963fc761eb7135c4593bfc6a0af96d8588b70d8f6ef3af8549181e57772181f5ac"
      },
      extra: {},
      isDefault: false,
      key: "6PYVQfxBH2zBvFsJ1zBZJUUD8ykvCdWrAfZzjWw4RRskjwLAc74bkT3eQn",
      label: "Adc4jT59RjDLdXbBni6xzg6SEcLVhHZ5Z9",
      lock: false
    },
    {
      address: "ARCvt1d5qAGzcHqJCWA2MxvhTLQDb9dvjQ",
      contract: {
        deployed: false,
        parameters: [{ name: "signature", type: "Signature" }],
        script:
          "2103c663ba46afa8349f020eb9e8f9e1dc1c8e877b9d239e139af699049126e0f321ac"
      },
      extra: {},
      isDefault: false,
      key: "6PYTmxqFiGnZnioGDCUTkaWsgFubYuTNx4aMJ7SKNV2XAzAJHYXW8RAEgw",
      label: "ARCvt1d5qAGzcHqJCWA2MxvhTLQDb9dvjQ",
      lock: false
    }
  ],
  extra: {},
  name: "myWallet",
  scrypt: { n: 16384, p: 8, r: 8, size: 64 },
  version: "1.0"
};

describe("constructor & export", () => {
  test("constructor", () => {
    const wallet = new Wallet({
      name: "test",
      version: "1"
    });
    expect(wallet.name).toBe("test");
    expect(wallet.version).toBe("1");
  });

  test("export", () => {
    const wallet = new Wallet({
      name: "test",
      version: "1"
    });
    const exported = wallet.export();
    expect(exported.name).toBe("test");
    expect(exported.version).toBe("1");
  });
});

describe("add account, default account", () => {
  test("add account", () => {
    const wallet = new Wallet({
      name: "test",
      version: "1"
    });
    wallet.addAccount(new Account(ADDRESS1));
    expect(wallet.accounts[0].address).toBe(ADDRESS1);
  });

  test("default account", () => {
    const wallet = new Wallet({
      name: "test",
      version: "1"
    });
    wallet.addAccount(new Account(PRIVATE_KEY1));
    wallet.addAccount(new Account(PRIVATE_KEY2));
    expect(wallet.defaultAccount.privateKey).toBe(PRIVATE_KEY1);
  });

  test("set default account", () => {
    const wallet = new Wallet({
      name: "test",
      version: "1"
    });
    wallet.addAccount(new Account(PRIVATE_KEY1));
    wallet.addAccount(new Account(PRIVATE_KEY2));
    wallet.setDefault(1);
    expect(wallet.defaultAccount).toBe(wallet.accounts[1]);
  });
});

describe("encrypt", () => {
  test("success", () => {
    const wallet = new Wallet();
    wallet.addAccount(new Account(PRIVATE_KEY1));
    wallet.addAccount(new Account(PRIVATE_KEY2));
    expect.assertions(2);
    return wallet.encrypt(0, "passw0rd").then(res => {
      expect(res).toBeTruthy();
      expect(wallet.accounts[0].encrypted).toBe(
        "6PYVQfxBH2zBvFsJ1zBZJUUD8ykvCdWrAfZzjWw4RRskjwLAc74bkT3eQn"
      );
    });
  });
  test("failure", () => {
    const wallet = new Wallet();
    wallet.addAccount(new Account(PRIVATE_KEY1));
    wallet.addAccount(new Account(PRIVATE_KEY2));
    expect.assertions(1);
    return wallet.encrypt(-1, "passw0rd").catch(err => {
      expect(err).toBeDefined();
    });
  });
});

describe("encryptAll", () => {
  test("success", () => {
    const wallet = new Wallet();
    wallet.addAccount(new Account(PRIVATE_KEY1));
    wallet.addAccount(new Account(PRIVATE_KEY2));
    expect.assertions(2);
    return wallet.encryptAll("passw0rd").then(res => {
      expect(res).toStrictEqual([true, true]);
      expect(wallet.accounts[0].encrypted).toBe(
        "6PYVQfxBH2zBvFsJ1zBZJUUD8ykvCdWrAfZzjWw4RRskjwLAc74bkT3eQn"
      );
    });
  });
});

describe("decrypt", () => {
  test("success", () => {
    const wallet = new Wallet(WALLET_JSON);
    expect.assertions(2);
    return wallet.decrypt(0, "passw0rd").then(res => {
      expect(res).toBeTruthy();
      expect(wallet.accounts[0].privateKey).toBe(PRIVATE_KEY1);
    });
  });
  test("failure", () => {
    const wallet = new Wallet(WALLET_JSON);
    expect.assertions(1);
    return wallet.decrypt(1, "passw0rd_failure").catch(err => {
      expect(err).toBeDefined();
    });
  });
});

describe("decryptAll", () => {
  test("success", () => {
    const wallet = new Wallet(WALLET_JSON);
    expect.assertions(2);
    return wallet.decryptAll("passw0rd").then(res => {
      expect(res).toStrictEqual([true, true]);
      expect(wallet.accounts[0].privateKey).toBe(PRIVATE_KEY1);
    });
  });

  test("failure", () => {
    const wallet = new Wallet(WALLET_JSON);
    expect.assertions(1);
    return wallet.decryptAll("passw0rd_failure").catch(err => {
      expect(err).toBeDefined();
    });
  });
});
