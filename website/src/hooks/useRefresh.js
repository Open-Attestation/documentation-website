import React, { useEffect, useRef, useState } from "react";

export const useRefresh = (period) => {
  const [tick, setTick] = useState(0);
  const isTabActive = useRef(true);
  if (period < 1) return undefined;

  useEffect(() => {
    const activeHandler = () => {
      isTabActive.current = !document.hidden;
    };
    window.addEventListener("visibilitychange", activeHandler);
    return () => window.removeEventListener("visibilitychange", activeHandler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTabActive.current) setTick((tick) => tick + 1);
    }, period);
    return () => clearInterval(interval);
  }, []);
  return tick;
};
