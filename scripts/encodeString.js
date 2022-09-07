

function encodeMessage(body) {
	const data = new TextEncoder().encode(body)
	let n = 0n
	for (let i = 0; i < data.length; i++) {
		const v = BigInt(data[data.length - i - 1])
		const p = 256n ** BigInt(i)
		n += v * p
	}
	return n;
}

function decodeMessage(n, length) {
    var encoded = [];
    for (let i = 0; i < length; i++) {
		const v = BigInt(data[data.length - i - 1])
		const p = 256n ** BigInt(i)
		n += v * p
	}
}

module.exports = {
    encodeMessage
}
// 20774185679898088051961893363220029043849657770348135264601972956332021119820n
// 66238495963203415413170119088006074510411419172131430670557385618334131091147745276881053475803900539979663243178605291074673n