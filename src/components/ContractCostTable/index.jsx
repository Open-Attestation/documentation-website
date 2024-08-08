import React from "react";
import { FiatLabel } from "@govtechsg/open-attestation-utils";
import { useFetchGasPrice } from "../hooks";
import { DeploymentTypeLabel } from "../DeploymentTypeLabel";
import { BoxTag } from "../BoxTag";

const contractGasData = {
  verifiable: [
    {
      name: "Document Store Deployment (one time set-up)",
      gas: 1040472,
      remarks: "Only applicable to DID if require revocation.",
      deploymentType: ["DNS", "DID"],
    },
    {
      name: "Issuance of Document",
      gas: 44956,
      remarks: "Applicable for batch Issue.",
      deploymentType: ["DNS"],
    },
    {
      name: "Revoke Document",
      gas: 45052,
      deploymentType: ["DNS", "DID"],
    },
  ],
  transferable: [
    {
      name: "Token Registry Deployment (one time set-up)",
      gas: 3714024,
      deploymentType: ["DNS"],
    },
    {
      name: "Issuance of Document",
      gas: 239523,
      deploymentType: ["DNS"],
    },
    {
      name: "Transfer Ownership",
      gas: 324688,
      deploymentType: ["DNS"],
    },
    {
      name: "Transfer Holdership",
      gas: 43634,
      deploymentType: ["DNS"],
    },
    {
      name: "Nominate Ownership",
      gas: 83225,
      deploymentType: ["DNS"],
    },
    {
      name: "Endorse Ownership",
      gas: 241463,
      deploymentType: ["DNS"],
    },
    {
      name: "Surrender Document",
      gas: 93435,
      deploymentType: ["DNS"],
    },
    {
      name: "Restore Document",
      gas: 220780,
      deploymentType: ["DNS"],
    },
    {
      name: "Burn Document",
      gas: 56532,
      deploymentType: ["DNS"],
    },
  ],
};

export const PriceTable = (props) => {
  const { price, gwei } = useFetchGasPrice("ethereum", 60000);
  const { price: maticPrice, gwei: maticGwei } = useFetchGasPrice("polygon", 60000);
  const priceFactor = gwei * 0.000000001 * price;
  const maticPriceFactor = maticGwei * 0.000000001 * maticPrice;
  const { type, priceFormatOptions } = props;
  const costData = contractGasData[type];
  const currentDtStr = new Date().toLocaleString("en-SG", { hour12: true, timeZoneName: "short" });
  const nf = new Intl.NumberFormat();
  const rows = costData.map((record, idx) => (
    <tr key={idx}>
      <td>{record.name}</td>
      <td>{nf.format(record.gas)}</td>
      <td>{priceFactor === 0 ? <em>Calculating...</em> : <FiatLabel>{record.gas * priceFactor}</FiatLabel>}</td>
      <td>
        {maticPriceFactor === 0 ? (
          <em>Calculating...</em>
        ) : (
          <FiatLabel {...priceFormatOptions}>{record.gas * maticPriceFactor}</FiatLabel>
        )}
      </td>
      <td>
        <DeploymentTypeLabel deploymentType={record.deploymentType} remarks={record.remarks} />
      </td>
    </tr>
  ));
  const tableHeaderStyle = { textAlign: "left" };
  return (
    <div>
      <p>
        Estimations based on the current gas average at <BoxTag>{Math.ceil(gwei)} gwei (ETH)</BoxTag>, ETH price at USD{" "}
        <BoxTag>
          <FiatLabel>{price}</FiatLabel>
        </BoxTag>{" "}
        for <strong>Ethereum</strong> and <BoxTag>{Math.ceil(maticGwei)} gwei (MATIC)</BoxTag>, MATIC price at USD{" "}
        <BoxTag>
          <FiatLabel>{maticPrice}</FiatLabel>
        </BoxTag>{" "}
        for <strong>Polygon</strong> as at {currentDtStr}.
      </p>
      <table>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Action</th>
            <th style={tableHeaderStyle}>Estimated Gas</th>
            <th style={tableHeaderStyle}>Est. Fiat (USD) on Ethereum</th>
            <th style={tableHeaderStyle}>Est. Fiat (USD) on Polygon</th>
            <th style={tableHeaderStyle}>Deployment Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
