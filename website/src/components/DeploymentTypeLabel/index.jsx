import React from "react";

export const DeploymentTypeLabel = ({deploymentType, remarks}) => {

  return (
  <div>
    <div className="deploymentTypeContainer">
      {deploymentType.map((type) => {
          if (type === "DNS") return <div className="deploymentTypeDNS">DNS</div>
          if (type === "DID") return <div className="deploymentTypeDID">DID</div>
    })}
    </div>
    <div className="deploymentTypeRemark">{remarks}</div>
  </div>
  )
}
