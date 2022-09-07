require("@nomicfoundation/hardhat-toolbox");
require("hardhat-circom");

// TODO: add hh task
const { encodeMessage } = require("./scripts/encodeString");
task("encode", "Encode a string to big number")
  .addPositionalParam("input", "string to encode")
  .setAction(async ({ input }) => console.log(encodeMessage(input)));

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.11",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  circom: {
    inputBasePath: "./circuits",
    ptau: "https://hermezptau.blob.core.windows.net/ptau/powersOfTau28_hez_final_15.ptau",
    circuits: [
      // {
      //   name: "mimc_cid",
      //   // No protocol, so it defaults to groth16
      // },
      {
        name: "cid"
      },
      // {
      //   name: "hash",
      //   // Explicitly generate groth16
      //   // protocol: "groth16",
      // },
    ],
  },
};
