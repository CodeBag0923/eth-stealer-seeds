const ethers = require("ethers");
const fs = require("fs");
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

function generate(seedPhrase) {
  count_1++;
  if (count_1 == 1000000) {
    count_1 = 0;
    mil_count++;
    console.log(mil_count, "e6 mined");
  }

  var wallet = ethers.Wallet.fromMnemonic(seedPhrase);

  const privateKey = wallet.privateKey;
  const address = wallet.address;

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
      seedPhrase;
    fs.writeFileSync(
      `./result/Success${file_count++}.txt`,
      successString,
      (err) => {
        if (err) throw err;
      }
    );
  }
}

while (1) {
  const bip39 = require("bip39");
  const seedPhrase = bip39.generateMnemonic();
  generate(seedPhrase);
}
