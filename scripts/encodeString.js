

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
