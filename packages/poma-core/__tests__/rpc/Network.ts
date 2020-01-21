import { Protocol } from "../../src/rpc";
import Network from "../../src/rpc/Network";

describe("constructor", () => {
  test("empty", () => {
    const result = new Network();
    expect(result instanceof Network).toBeTruthy();
    expect(result).toEqual({
      name: "RandomNet",
      protocol: new Protocol(),
      nodes: [],
      extra: {}
    });
  });

  test("NetworkLike", () => {
    const testObject = {
      name: "UnitTestNet",
      protocol: {
        magic: 123456
      },
      nodes: ["a", "b"],
      extra: {
        neoscan: "neoscanUrl"
      }
    };

    const result = new Network(testObject);
    expect(result instanceof Network).toBeTruthy();
  });

  test("Network", () => {
    const testObject = {
      name: "UnitTestNet",
      protocol: {
        magic: 123456
      },
      nodes: ["a", "b"],
      extra: {
        neoscan: "neoscanUrl"
      }
    };

    const NetworkObj = new Network(testObject);
    const result = new Network(NetworkObj);
    expect(result instanceof Network).toBeTruthy();
    expect(result).not.toBe(NetworkObj);
    expect(result.extra).not.toBe(testObject.extra);
    expect(result.extra).toEqual(testObject.extra);
  });
});

describe("export", () => {
  test("export to NetworkJSON", () => {
    const expected = {
      Name: "UnitTestNet",
      ProtocolConfiguration: new Protocol({
        magic: 123456
      }).export(),
      Nodes: ["a", "b"],
      ExtraConfiguration: {
        neoscan: "neoscanUrl"
      }
    };

    const NetworkObj = new Network(expected);
    const result = NetworkObj.export();
    expect(result).toEqual(expected);
  });
});

describe("equals", () => {
  const obj1 = {
    name: "UnitTestNet",
    protocol: {
      magic: 123456,
      addressVersion: 99,
      systemFee: {}
    },
    nodes: ["a", "b"],
    extra: {
      neoscan: "neoscanUrl"
    }
  };
  const obj2 = {
    name: "UnitTestNet",
    protocol: {
      magic: 654321
    },
    nodes: ["a", "b"],
    extra: {
      neoscan: "neoscanUrl"
    }
  };
  const Network1 = new Network(obj1);
  const Network2 = new Network(obj2);

  test.each([
    ["Network1 === Network1", Network1, Network1, true],
    ["Network1 !== Network2", Network1, Network2, false],
    ["Network1 === Obj1", Network1, obj1, true],
    ["Network1 !== Obj2", Network1, obj2, false]
  ])("%s", (msg: string, a: Network, b: any, cond: boolean) => {
    expect(a.equals(b)).toBe(cond);
  });
});
