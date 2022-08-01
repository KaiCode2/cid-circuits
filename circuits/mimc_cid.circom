pragma circom 2.0.3;

include "../node_modules/circomlib/circuits/mimcsponge.circom";
// include "../node_modules/circomlib/circuits/comparators.circom";

template Main(MAX_DATA_LENGTH) {
    // Public inputs
    signal input data[MAX_DATA_LENGTH];
    signal input protectedLength;
    signal input protectedHash;

    signal output resultHash;

    var i;

    // 1. Ensure first field in data matches protected hash
    component protectedHasher = MiMCSponge(1, 220, 1);
    // QUESTION: is it possible to use protected length to allow variable size of protected data?
    protectedHasher.ins[0] <== data[0];
    protectedHasher.k <== 0;

    protectedHash === protectedHasher.outs[0];
    
    // 2. Compute hash of data
    component dataHasher = MiMCSponge(MAX_DATA_LENGTH, 220, 1);
    for (i = 0; i < MAX_DATA_LENGTH; i++) {
        dataHasher.ins[i] <== data[i];
    }
    dataHasher.k <== 0;

    resultHash <== dataHasher.outs[0];
    log(resultHash); // 17823310514269002205004272818668731509696428554468454777647623003662692654002n
}

component main { public [protectedLength, protectedHash] } = Main(10);