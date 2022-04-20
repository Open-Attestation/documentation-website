import React, { useState, useEffect } from "react";

export const FiatLabel = ({ children, ...options }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(0);
    setTimeout(() => setOpacity(1), 100);
  }, [children]);

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  });
  const res = nf.format(Number(children));
  return <span key={children} style={{opacity, transition: 'opacity 1s ease-in'}}>{res}</span>;
};
