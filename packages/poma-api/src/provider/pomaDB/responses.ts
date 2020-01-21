import { wallet } from "@marcoslobo/poma-core";

export interface PomaDbNode {
  block_height: number | null;
  status: boolean;
  time: number | null;
  url: string;
}

export interface PomaDbBalance {
  GAS: wallet.AssetBalanceLike;
  NEO: wallet.AssetBalanceLike;
  address: string;
  net: string;
}

export interface PomaDbClaims {
  address: string;
  net: string;
  total_claim: number;
  total_unspent_claim: number;
  claims: wallet.ClaimItemLike[];
}

export interface PomaDbHistory {
  address: string;
  history: {
    GAS: number;
    POMA: number;
    block_index: number;
    gas_sent: boolean;
    poma_sent: boolean;
    txid: string;
  }[];
  name: string;
  net: string;
}
