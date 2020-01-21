export interface PomascanV1GetBalanceResponse {
  balance: PomascanBalance[] | null;
  address: string;
}

export interface PomascanBalance {
  asset: string;
  amount: number;
  unspent: PomascanTx[];
}

export interface PomascanTx {
  txid: string;
  value: number;
  n: number;
}

export interface PomascanV1GetClaimableResponse {
  unclaimed: number;
  claimable: PomascanClaim[] | null;
  address: string;
}

export interface PomascanClaim {
  txid: string;
  n: number;
  value: number;
  unclaimed: number;
  start_height: number;
  end_height: number;
}

export interface PomascanV1GetUnclaimedResponse {
  unclaimed: number;
  address: string;
}

export interface PomascanV1GetHeightResponse {
  height: number;
}

export interface PomascanPastTx {
  vouts: [
    {
      value: number;
      transaction_id: number;
      asset: string;
      address_hash: string;
    }
  ];
  vin: [
    {
      value: number;
      txid: string;
      n: number;
      asset: string;
      address_hash: string;
    }
  ];
  type: string;
  txid: string;
  transfers: [
    {
      txid: string;
      time: number;
      contract: string;
      block_height: number;
      amount: number;
      address_to: string;
      address_from: string;
    }
  ];
  time: number;
  sys_fee: string;
  size: number;
  net_fee: string;
  id: number;
  claims: [
    {
      value: number;
      txid: string;
      n: number;
      asset: string;
      address_hash: string;
    }
  ];
  block_height: number;
  block_hash: string;
  asset: null;
}
