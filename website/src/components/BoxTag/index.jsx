import React from "react";

export const BoxTag = ({ children }) => (
  <span
    className="box-tag"
    style={{
      borderRadius: "3px",
      backgroundColor: "#eee",
      borderColor: "#ccc",
      borderWidth: "1px",
      borderStyle: "solid",
      padding: "0.2rem",
    }}
  >
    {children}
  </span>
);
