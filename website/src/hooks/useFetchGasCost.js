import React, { useEffect, useState } from "react";
import { useRefresh } from './useRefresh';

const fetchGasCostData = async () => {
  try {
    const [ethReq, gweiReq] = await Promise.all([
      fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"),
      fetch("https://www.ethgasstation.info/json/ethgasAPI.json"),
    ]);
    const [ethRes, gweiRes] = await Promise.all([ethReq.json(), gweiReq.json()]);
    return {
      price: ethRes.USD,
      gwei: gweiRes.average,
    };
  } catch (e) {
    console.error(`Error: ${e.message}`);
    alert(`Error: ${e.message}`);
  }
};

export const useFetchGasCost = (interval = 0) => {
  const [price, setPrice] = useState(0);
  const [gwei, setGwei] = useState(0);
  const tick = useRefresh(interval);
  let isMounted = true;
  const fetchData = async () => {
    const data = await fetchGasCostData();
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
