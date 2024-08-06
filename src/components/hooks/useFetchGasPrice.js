import React, { useCallback, useEffect, useState } from "react";
import { useRefresh } from "@govtechsg/open-attestation-utils";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const gasApi = {
  ethereum: "https://api.blocknative.com/gasprices/blockprices",
  polygon: "https://api.blocknative.com/gasprices/blockprices?chainid=137",
};

const parseGasRes = (res) => {
  const estPrice = res.blockPrices[0].estimatedPrices[0];
  if (estPrice.price || estPrice.maxPriorityFeePerGas) {
    return estPrice.price + estPrice.maxPriorityFeePerGas;
  }
  return 0;
};

const priceApi = {
  ethereum: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
  polygon: "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD",
};

const fetchGasCostData = async (chain, opts) => {
  try {
    const { gasApiKey } = opts || {};
    const [ethReq, gweiReq] = await Promise.all([
      fetch(priceApi[chain]),
      fetch(
        gasApi[chain],
        gasApiKey && {
          headers: {
            Authorization: gasApiKey,
          },
        }
      ),
    ]);
    const [ethRes, gweiRes] = await Promise.all([ethReq.json(), gweiReq.json()]);
    return {
      price: ethRes.USD,
      gwei: parseGasRes(gweiRes),
    };
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

export const useFetchGasPrice = (chain, interval = 0) => {
  const [price, setPrice] = useState(0);
  const [gwei, setGwei] = useState(0);
  const tick = useRefresh(interval);
  const { siteConfig } = useDocusaurusContext();

  let isMounted = true;
  const fetchData = useCallback(async () => {
    const data = await fetchGasCostData(chain, { gasApiKey: siteConfig.customFields.blockNativeApiKey });
    if (!isMounted || !data) return;
    setPrice(data.price);
    setGwei(data.gwei);
  }, [siteConfig]);

  useEffect(() => {
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [tick, fetchData]);

  return { price, gwei };
};
