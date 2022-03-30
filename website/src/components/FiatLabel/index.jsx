import React from "react";

export const FiatLabel = ({ children }) => {
  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const res = nf.format(Number(children));
  return <span>{res}</span>;
};
