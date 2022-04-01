import React, { useEffect, useState } from "react";
import { useRefresh } from './useRefresh';

const gasApi = {
  ethereum: "https://www.ethgasstation.info/json/ethgasAPI.json",
  polygon: "https://gasstation-mainnet.matic.network/v2",
};

const parseGasRes = (chain, res) => {
  switch (chain) {
    case "ethereum":
      return Number(res.average) / 10;
    case "polygon":
      return res.standard.maxFee;
    default:
      return 0;
  }
};

const priceApi = {
  ethereum: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
  polygon: "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD",
};

const fetchGasCostData = async (chain) => {
  try {
    const [ethReq, gweiReq] = await Promise.all([
      fetch(priceApi[chain]),
      fetch(gasApi[chain]),
    ]);
    const [ethRes, gweiRes] = await Promise.all([ethReq.json(), gweiReq.json()]);
    return {
      price: ethRes.USD,
      gwei: parseGasRes(chain, gweiRes),
    };
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

export const useFetchGasCost = (chain, interval = 0) => {
  const [price, setPrice] = useState(0);
  const [gwei, setGwei] = useState(0);
  const tick = useRefresh(interval);
  let isMounted = true;
  const fetchData = async () => {
    const data = await fetchGasCostData(chain);
    if (!isMounted || !data) return;
    setPrice(data.price);
    setGwei(data.gwei);
  };

  useEffect(() => {
    fetchData();
    return () => (isMounted = false);
  }, [tick]);

  return { price, gwei };
};
