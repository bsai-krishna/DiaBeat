const bn = require("bn.js");

const Matic = require("@maticnetwork/maticjs").default;

const config = require("./config");

const from = "0xa2FF9b0B9c74D3FDEFA77b159E42d1760488da74"; // from address
const recipient = "0xc96221bEa9f531a500B62e436b3CA99372f9C7De"; // receipent address

const token = "0x28C8713DDe7F063Fdc4cA01aB2A8856e0F243Fec"; // test token address
const amount = new bn(100000000000); // amount in wei

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  registry: config.REGISTRY_ADDRESS,
  depositManager: config.DEPOSITMANAGER_ADDRESS,
  withdrawManager: config.WITHDRAWMANAGER_ADDRESS
});

matic.initialize().then(() => {
  matic.setWallet(config.PRIVATE_KEY);
  matic
    .transferERC20Tokens(token, recipient, amount, {
      from,
      gas: "8000000"
      // parent: true, // For token transfer on Main network (false for Matic Network)
    })
    .then(res => {
      console.log("hash", res); // eslint-disable-line
    });
});
