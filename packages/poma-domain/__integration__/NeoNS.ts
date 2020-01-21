import * as neonCore from "@marcoslobo/poma-core";
import domainPlugin from "../src/index";
import { getUrl } from "../../../helpers/urls";

const neonJs = domainPlugin(neonCore);
const { wallet } = neonJs;

let MAINNET_URL = "";
let provider;

beforeAll(async () => {
  provider = new neonJs.domain.nns.instance(
    "348387116c4a75e420663277d9c02049907128c7"
  );

  MAINNET_URL = await getUrl("MainNet");
});

describe("domainResolve", () => {
  test("name found", async () => {
    const address = await provider.resolveDomain(MAINNET_URL, "test.neo");
    expect(wallet.isAddress(address)).toBe(true);
  });

  test("name not found", async () => {
    const address = await provider.resolveDomain(
      MAINNET_URL,
      "alkdjfklasjdlfkjasdklf.neo"
    );
    expect(address).toMatch("");
  });
});
