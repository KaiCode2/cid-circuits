pragma circom 2.0.3;

// include "../node_modules/circomlib/circuits/comparators.circom";
include "../node_modules/circomlib/circuits/sha256/sha256.circom";
include "../node_modules/circomlib/circuits/bitify.circom";

template Main() {
    // Public inputs
    signal input data;
    signal input protectedLength;
    signal input protectedHash;

    signal output resultHash;

    var i;

    // 1. Convert input to bits
    component bits = Num2Bits(254);
    bits.in <== data;
    
    // 2. Hash Input
    component hasher = Sha256(254);
    for (i = 0; i < 254; i++) {
        hasher.in[i] <== bits.out[i];
    }

    // 3. Convert Hashed Output to Number
    component hashedNumber = Bits2Num(256);
    for (i = 0; i < 256; i++) {
        hashedNumber.in[i] <== hasher.out[i];
    }
    log(hashedNumber.out);
    
    // resultHash <== hasher.out[0];

}

component main { public [protectedLength, protectedHash] } = Main();
