import React from "react";

export const DeploymentTypeLabel = ({deploymentType, remarks}) => {

  return (
  <div>
    <div className="deploymentTypeContainer">
      {deploymentType.map((type) => {
          return (
            type === "DID" ? <div className="deploymentTypeDID">DID</div> : <div className="deploymentTypeDNS">DNS</div>
          )
    })}
    </div>
    <div className="deploymentTypeRemark">{remarks}</div>
  </div>
  )
}
