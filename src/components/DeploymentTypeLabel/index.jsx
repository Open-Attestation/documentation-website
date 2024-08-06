import React from "react";

export const DeploymentTypeLabel = ({deploymentType, remarks}) => {

  return (
  <div>
    <div className="deploymentTypeContainer">
      {deploymentType.map((type, idx) => {
          if (type === "DNS") return <div className="deploymentTypeDNS" key={idx}>DNS</div>
          if (type === "DID") return <div className="deploymentTypeDID" key={idx}>DID</div>
    })}
    </div>
    <div className="deploymentTypeRemark">{remarks}</div>
  </div>
  )
}
