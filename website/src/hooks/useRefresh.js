import React, { useEffect, useState } from "react";

export const useRefresh = (period) => {
  const [tick, setTick] = useState(0);
  if (period < 1) return undefined;
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, period);
    return () => clearInterval(interval);
  }, []);
  return tick;
};
