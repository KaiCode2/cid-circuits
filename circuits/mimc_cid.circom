pragma circom 2.0.3;

include "../node_modules/circomlib/circuits/mimcsponge.circom";

template Main() {
    // Public inputs
    signal input data;
    // signal input protectedLength;
    // signal input protectedHash;

    signal output resultHash;

    component mimc = MiMCSponge(1, 220, 1);
    mimc.ins[0] <== data;
    mimc.k <== 0;

    resultHash <== mimc.outs[0];

    log(resultHash);
    // out === hash;
}

component main { public [ data /*, protectedLength, protectedHash */ ] } = Main();