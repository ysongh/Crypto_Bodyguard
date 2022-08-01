require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.MNEMONIC.toString().trim();

module.exports = {
  networks: {
    // truffle migrate --network skale
    skale: {
      provider: () => new HDWalletProvider(mnemonic, `https://hackathon.skalenodes.com/v1/hoarse-well-made-theemim/`),
      network_id: "*",
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    // truffle migrate --network rinkeby
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://eth-rinkeby.gateway.pokt.network/v1/lb/`),
      network_id: "4",
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    // truffle migrate --network optimisticKovan
    optimisticKovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://opt-kovan.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
      network_id: "69",
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    // truffle migrate --network mumbai
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY2}`),
      network_id: "80001",
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
