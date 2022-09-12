

function encodeMessage(body) {
	var hex = "0x";
    var length = body.length;
    for (var i = 0; i < length; i++)
        hex += body.charCodeAt(i).toString(16);
	const decimal = parseInt(hex, 16);
    return decimal;
}

function decodeMessage(number, length) {
    var string = "";
    number = parseInt(number).toString(16);
    var length = number.length;
    for (var i = 0; i < length;) {
        var code = number.slice(i, i += 2);
        string += String.fromCharCode(parseInt(code, 16));
    }
    return string;
}

module.exports = {
    encodeMessage,
	decodeMessage
}
