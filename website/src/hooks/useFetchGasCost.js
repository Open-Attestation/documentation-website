import React, { useEffect, useState } from "react";
import { useRefresh } from "./useRefresh";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const gasApi = {
  ethereum: "https://api.blocknative.com/gasprices/blockprices",
  polygon: "https://api.blocknative.com/gasprices/blockprices?chainid=137",
};

const gasApiOptions = () => {
  const { siteConfig } = useDocusaurusContext();
  return {
    headers: {
      Authorization: siteConfig.blockNativeApiKey,
    },
  };
};

const parseGasRes = (res) => {
  const estPrice = res.blockPrices[0].estimatedPrices[0];
  return estPrice.price + estPrice.maxPriorityFeePerGas;
};

const priceApi = {
  ethereum: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
  polygon: "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD",
};

const fetchGasCostData = async (chain) => {
  try {
    const [ethReq, gweiReq] = await Promise.all([fetch(priceApi[chain]), fetch(gasApi[chain], gasApiOptions)]);
    const [ethRes, gweiRes] = await Promise.all([ethReq.json(), gweiReq.json()]);
    return {
      price: ethRes.USD,
      gwei: parseGasRes(gweiRes),
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
