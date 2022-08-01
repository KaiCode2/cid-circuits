pragma circom 2.0.3;

include "../node_modules/circomlib/circuits/sha256/sha256.circom";

template Main() {
    // Public inputs
    signal input data;
    signal input protectedLength;
    signal input protectedHash;

    signal output resultHash;

    component hasher = Sha256(1);
    hasher.in[0] <== data;
    
    resultHash <== hasher.out[0];

    // out === hash;
}

component main { public [ data, protectedLength, protectedHash ] } = Main();
