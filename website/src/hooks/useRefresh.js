import React, { useEffect, useState } from "react";

export const useRefresh = (interval = 30000) => {
  const [tick, setTick] = useState(0);
  if (interval < 1) return undefined;
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  return tick;
};
