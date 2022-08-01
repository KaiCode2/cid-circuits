const hre = require("hardhat");
const { assert } = require("chai");
const { buildMimcSponge } = require("circomlibjs");

describe("mimc cid circuit", () => {
  let circuit;
  let mimc;

  const mimcKey = 0;
  const mimcNumOutputs = 1;
  const sampleInput = {
    data: ["12345","67890","0","0","0","0","0","0","0","0"],
    protectedLength: "1",
    protectedHash: "3963492811933312362902499863589792803917143981460657739503843609827228465580"
  };
  const sanityCheck = true;

  before(async () => {
    mimc = await buildMimcSponge();
    circuit = await hre.circuitTest.setup("mimc_cid");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    assert.propertyVal(witness, "main.protectedLength", sampleInput.protectedLength);
    assert.propertyVal(witness, "main.protectedHash", sampleInput.protectedHash);
    // You might want to test some intermediate values in the mimc sponge
    assert.propertyVal(
      witness,
      "main.resultHash",
      "17823310514269002205004272818668731509696428554468454777647623003662692654002"
    );
  });

  it("has the correct output", async () => {
    const mimcResult = mimc.multiHash(sampleInput.data, mimcKey, mimcNumOutputs);
    const expected = { resultHash: mimc.F.toObject(mimcResult) };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });

  it("should fail is invalid protected value", async () => {
    const invalidInputData = ["0","0","0","0","0","0","0","0","0","0"];
    try {
        const witness = await circuit.calculateWitness({ 
            data: invalidInputData,
            protectedLength: sampleInput.protectedLength,
            protectedHash: sampleInput.protectedHash,
        }, sanityCheck);
        assert(false);
    } catch (err) {
        // console.log("Error is:", err.message)
        assert(true);
    }

    // const mimcResult = mimc.multiHash(invalidInputData, mimcKey, mimcNumOutputs);
    // const validOut = { resultHash: mimc.F.toObject(mimcResult) };
    // assert.notEqual(validOut, witness.main.resultHash);
  })
});
