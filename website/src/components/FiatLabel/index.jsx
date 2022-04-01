import React from "react";

export const FiatLabel = ({ children, ...options }) => {
  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  });
  const res = nf.format(Number(children));
  return <span>{res}</span>;
};
