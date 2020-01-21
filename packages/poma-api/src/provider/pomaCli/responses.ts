import { rpc } from "@marcoslobo/poma-core";

export interface PomaCliGetUnspentsResponse extends rpc.RPCResponse {
  result: {
    balance: PomaCliBalance[];
    address: string;
  };
}

export interface PomaCliBalance {
  unspent: PomaCliTx[];
  asset_hash: string;
  asset: string;
  asset_symbol: string;
  amount: number;
}
export interface PomaCliTx {
  txid: string;
  value: number;
  n: number;
}

export interface PomaCliGetUnclaimedResponse extends rpc.RPCResponse {
  result: {
    available: number;
    unavailable: number;
    unclaimed: number;
  };
}

export interface PomaCliGetClaimableResponse extends rpc.RPCResponse {
  result: {
    address: string;
    claimable: PomaCliClaimable[];
    unclaimed: number;
  };
}

export interface PomaCliClaimable {
  end_height: number;
  generated: number;
  n: number;
  start_height: number;
  sys_fee: number;
  txid: string;
  unclaimed: number;
  value: number;
}
