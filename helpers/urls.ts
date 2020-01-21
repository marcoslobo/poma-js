import { rpc } from "@marcoslobo/poma-core";

const TESTNET_URLS = [
   ""
];


const MAINNET_URLS = [
  "172.31.94.231:10333",
  "172.31.82.238:10333",
  "172.31.90.198:10333",
  "172.31.86.233:10333"
];

export function getUrls(net: string): string[] {
  if (net === "TestNet") {
    return TESTNET_URLS;
  } else if (net === "MainNet") {
    return MAINNET_URLS;
  } else {
    throw new Error("Expected MainNet or TestNet");
  }
}

function cutArray<T>(arr: T[]): T[] {
  const randomStartIndex = Math.floor(Math.random() * arr.length);
  return arr.slice(randomStartIndex).concat(arr.slice(0, randomStartIndex));
}
export async function getUrl(net: string): Promise<string> {
  const orderedUrls = getUrls(net);

  const slicedUrls = cutArray(orderedUrls);
  var previousBlockCount = 0;
  for (let i = 0; i < slicedUrls.length; i++) {
    try {
      const res = (await rpc.Query.getBlockCount().execute(slicedUrls[i])) as {
        result: number;
      };
      const currentBlockCount = res.result;
      if (currentBlockCount - previousBlockCount <= 5) {
        return slicedUrls[i];
      }
      previousBlockCount = Math.max(currentBlockCount, previousBlockCount);
    } catch (e) {
      continue;
    }
  }
  throw new Error("Exhausted all urls but found no available RPC");
}
