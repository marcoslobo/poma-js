import { CONST, logging, u, wallet } from "@marcoslobo/poma-core";
import * as internal from "../../settings";
import axios from "axios";
import {
  filterHttpsOnly,
  findGoodNodesFromHeight,
  getBestUrl,
  PastTransaction,
  RpcNode
} from "../common";
import {
  PomascanBalance,
  PomascanClaim,
  PomascanPastTx,
  PomascanTx,
  PomascanV1GetBalanceResponse,
  PomascanV1GetClaimableResponse,
  PomascanV1GetHeightResponse,
  PomascanV1GetUnclaimedResponse
} from "./responses";
const log = logging.default("api");

function parseUnspent(unspentArr: PomascanTx[]): wallet.CoinLike[] {
  return unspentArr.map(coin => {
    return {
      index: coin.n,
      txid: coin.txid,
      value: coin.value
    };
  });
}
function parseClaims(claimArr: PomascanClaim[]): wallet.ClaimItemLike[] {
  return claimArr.map(c => {
    return {
      start: c.start_height,
      end: c.end_height,
      index: c.n,
      claim: c.unclaimed,
      txid: c.txid,
      value: c.value
    };
  });
}

function getChange(
  vin: { asset: string; value: number }[],
  vout: { asset: string; value: number }[],
  assetId: string
): u.Fixed8 {
  const totalOut = vin
    .filter(i => i.asset === assetId)
    .reduce((p, c) => p.add(c.value), new u.Fixed8(0));
  const totalIn = vout
    .filter(i => i.asset === assetId)
    .reduce((p, c) => p.add(c.value), new u.Fixed8(0));

  return totalIn.minus(totalOut);
}

function parseTxHistory(
  rawTxs: PomascanPastTx[],
  address: string
): PastTransaction[] {
  return rawTxs.map(tx => {
    const vin = tx.vin
      .filter(i => i.address_hash === address)
      .map(i => ({ asset: i.asset, value: i.value }));
    const vout = tx.vouts
      .filter(o => o.address_hash === address)
      .map(i => ({ asset: i.asset, value: i.value }));
    const change = {
      Poma: getChange(vin, vout, CONST.ASSET_ID.Poma),
      GAS: getChange(vin, vout, CONST.ASSET_ID.GAS)
    };
    return {
      txid: tx.txid,
      blockHeight: tx.block_height,
      change
    };
  });
}

/**
 * Returns an appropriate RPC endpoint retrieved from a PomaScan endpoint.
 * @param url - URL of a Pomascan service.
 * @returns URL of a good RPC endpoint.
 */
export async function getRPCEndpoint(url: string): Promise<string> {
  const response = await axios.get(url + "/v1/get_all_nodes");
  let nodes = response.data as RpcNode[];
  if (internal.settings.httpsOnly) {
    nodes = filterHttpsOnly(nodes);
  }
  const goodNodes = findGoodNodesFromHeight(nodes);
  const bestRPC = await getBestUrl(goodNodes);
  return bestRPC;
}

/**
 * Gets balance for an address. Returns an empty Balance if endpoint returns not found.
 * @param url - URL of a Pomascan service.
 * @param address Address to check.
 * @return Balance of address retrieved from endpoint.
 */
export async function getBalance(
  url: string,
  address: string
): Promise<wallet.Balance> {
  const response = await axios.get(url + "/v1/get_balance/" + address);
  const data = response.data as PomascanV1GetBalanceResponse;
  if (data.address === "not found" && data.balance === null) {
    return new wallet.Balance({ net: url, address });
  }
  const bal = new wallet.Balance({
    net: url,
    address: data.address
  });
  const PomascanBalances = data.balance as PomascanBalance[];
  for (const b of PomascanBalances) {
    if (b.amount > 0 && b.unspent.length > 0) {
      bal.addAsset(b.asset, {
        unspent: parseUnspent(b.unspent)
      } as Partial<wallet.AssetBalanceLike>);
    } else {
      bal.addToken(b.asset, b.amount);
    }
  }
  log.info(`Retrieved Balance for ${address} from Pomascan ${url}`);
  return bal;
}

/**
 * Get claimable amounts for an address. Returns an empty Claims if endpoint returns not found.
 * @param url - URL of a Pomascan service.
 * @param address - Address to check.
 * @return Claims retrieved from endpoint.
 */
export async function getClaims(
  url: string,
  address: string
): Promise<wallet.Claims> {
  const response = await axios.get(url + "/v1/get_claimable/" + address);
  const data = response.data as PomascanV1GetClaimableResponse;
  if (data.address === "not found" && data.claimable === null) {
    return new wallet.Claims({ address: data.address });
  }
  const claims = parseClaims(data.claimable as PomascanClaim[]);
  log.info(`Retrieved Claims for ${address} from Pomascan ${url}`);
  return new wallet.Claims({
    net: url,
    address: data.address,
    claims
  });
}

/**
 * Gets the maximum amount of gas claimable after spending all Poma.
 * @param url - URL of a Pomascan service.
 * @param address Address to check.
 * @return
 */
export async function getMaxClaimAmount(
  url: string,
  address: string
): Promise<u.Fixed8> {
  const response = await axios.get(url + "/v1/get_unclaimed/" + address);
  const data = response.data as PomascanV1GetUnclaimedResponse;
  log.info(
    `Retrieved maximum amount of gas claimable after spending all Poma for ${address} from Pomascan ${url}`
  );
  return new u.Fixed8(data.unclaimed || 0);
}

/**
 * Get the current height of the light wallet DB
 * @param url - URL of a Pomascan service.
 * @return  Current height as reported by provider
 */
export async function getHeight(url: string): Promise<number> {
  const response = await axios.get(url + "/v1/get_height");
  const data = response.data as PomascanV1GetHeightResponse;
  return data.height;
}

/**
 * Get transaction history for an account
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @param {string} address - Address to check.
 * @return {Promise<PastTransaction[]>} A listof PastTransactionPastTransaction[]
 */
export async function getTransactionHistory(
  url: string,
  address: string
): Promise<PastTransaction[]> {
  const response = await axios.get(
    url + "/v1/get_last_transactions_by_address/" + address
  );
  const data = response.data as PomascanPastTx[];
  log.info(`Retrieved History for ${address} from Pomascan ${url}`);
  return parseTxHistory(response.data, address);
}
