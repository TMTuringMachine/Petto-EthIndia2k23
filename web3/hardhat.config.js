require('@nomiclabs/hardhat-ethers');
//https://eth-sepolia.g.alchemy.com/v2/xEhQjOITEbPv5e-XXO29raEbR5oCR-qf
//deployed on : 0x900241F50bF3Bd65a9079AADA3C625431d31a376
module.exports = {
  solidity: '0.8.19',
  defaultNetwork: 'scrollSepolia',
  networks: {
    hardhat: {},
    scrollSepolia: {
      url: 'https://sepolia-rpc.scroll.io/' || '',
      accounts: [
        `0x415834599139a0a24eabadd079ff450a1a8d767da98907a3dc90b338ac6aa6ba`,
      ],
    },
  },
};
