const express = require("express");
const app = express();
const cors = require("cors");
const uuid = require("uuid");

const bn = require("bn.js");

const Matic = require("@maticnetwork/maticjs").default;

const config = require("./matic/config");

let firebase = require("firebase-admin");
let serviceAccount = require("./serviceAccountKit.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://hackjnu2020.firebaseio.com/"
});

var db = firebase.database();

const port = process.env.PORT || 3000;

app.use(cors());

app.get("/transaction", async (req, res) => {
  0xc96221bea9f531a500b62e436b3ca99372f9c7de;
  const from = "0xa2FF9b0B9c74D3FDEFA77b159E42d1760488da74"; // from address
  const recipient = "0xc96221bEa9f531a500B62e436b3CA99372f9C7De"; // receipent address
  const token = "0x70459e550254b9d3520a56ee95b78ee4f2dbd846"; // test token address
  let wallet = recipient;
  let id = req.query.id;
  amount_new = req.query.amount.toString();

  // Create object of Matic
  const matic = new Matic({
    maticProvider: config.MATIC_PROVIDER,
    parentProvider: config.PARENT_PROVIDER,
    rootChain: config.ROOTCHAIN_ADDRESS,
    registry: config.REGISTRY_ADDRESS,
    depositManager: config.DEPOSITMANAGER_ADDRESS,
    withdrawManager: config.WITHDRAWMANAGER_ADDRESS
  });

  await matic.initialize();
  matic.setWallet(config.PRIVATE_KEY);
  // let res_matic = await matic.transferERC20Tokens(token, wallet, amount_new, {
  //   from,
  //   gas: "8000000"
  // });
  // let ref = db.ref("transaction/");

  // let usersRef = ref.child(res_matic.blockNumber);
  // await usersRef.set({
  //   details: {
  //     blockNumber: res_matic.blockNumber,
  //     blockHash: res_matic.blockHash,
  //     contractAddress: res_matic.contractAddress,
  //     cumulativeGasUsed: res_matic.cumulativeGasUsed,
  //     from: res_matic.from,
  //     status: res_matic.status,
  //     to: res_matic.to,
  //     transactionHash: res_matic.transactionHash
  //   }
  // });
  ref = db.ref("fundraisers/");
  let gotKey = "";
  let curr_amt = 0;
  let total = 0;
  let snapshot = await ref.once("value");
  Object.keys(snapshot.val()).forEach(key => {
    if (key == id) {
      gotKey = key;
      curr_amt = snapshot.val()[key].details.amount;
      total = snapshot.val()[key].details.total;
    }
  });
  console.log(gotKey);
  await ref.child(gotKey).set({
    details: {
      ...snapshot.val()[gotKey].details,
      total: parseFloat(curr_amt) + parseFloat(amount_new),
      current:
        ((parseFloat(total) + parseFloat(amount_new)) / curr_amt).toFixed(2) *
        100
    }
  });

  ref = db.ref("users/sunny");
  let balance = 0;
  await ref.once("value", function(snapshot) {
    balance = snapshot.val()["balance"];
  });
  await ref.set({
    balance: parseFloat(balance) - parseFloat(amount_new)
  });

  res.json({ ok: "Status OK" });
});

app.get("/history", async (req, res) => {
  let ref = db.ref("transaction/");

  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.get("/fundraisers", async (req, res) => {
  let ref = db.ref("fundraisers/");

  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.get("/getbalance", async (req, res) => {
  let ref = db.ref("users/sunny");

  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.get("/newfundraiser", async (req, res) => {
  let amount = req.query.amount;
  let name = req.query.name;
  let doctors = ["Dr. Kuldeep", "Dr Anil", "Dr. Simmi", "Dr. Rajeev"];
  let index = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  let ref = db.ref("fundraisers");
  await ref.child(uuid.v4()).set({
    details: {
      amount,
      current: 0,
      doctor: doctors[index],
      name,
      stage: 2,
      total: 0
    }
  });

  res.json({ ok: "Success" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
