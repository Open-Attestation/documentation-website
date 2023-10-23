   // src/components/NetworkTable.js 
   
   import React from 'react';

   const NetworkTable = () => (
     <table>
        | Network ID | Name                     | Network      | Type       |
        | ---------- | ------------------------ | ------------ | ---------- |
        | `1`        | Ethereum Mainnet         | `mainnet`    | Production |
        | `11155111` | Ethereum Testnet Sepolia | `sepolia`    | Test       |
        | `137`      | Polygon Mainnet          | `polygon`    | Production |
        | `80001`    | Polygon Testnet Mumbai   | `mumbai`     | Test       |
        | `50`       | XDC Network              | `xdc`        | Production |
        | `51`       | XDC Apothem Network      | `xdcapothem` | Test       |
     </table>
   );

   export default NetworkTable;