/**
 * Generate UUID
 */
export default function uuid() {
    if (typeof (window) !== 'undefined' && typeof (window.crypto) !== 'undefined' && typeof (window.crypto.getRandomValues) !== 'undefined') {
        // If we have a cryptographically secure PRNG, use that
        // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
        let buf = new Uint16Array(8);
        window.crypto.getRandomValues(buf);
        return (pad4(buf[0]) + pad4(buf[1]) + '-' + pad4(buf[2]) + '-' + pad4(buf[3]) + '-' + pad4(buf[4]) + '-' + pad4(buf[5]) + pad4(buf[6]) + pad4(buf[7]));
    } else {
        // Otherwise, just use Math.random
        // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        // https://stackoverflow.com/questions/11605068/why-does-jshint-argue-against-bitwise-operators-how-should-i-express-this-code
        return random4() + random4() + '-' + random4() + '-' + random4() + '-' +
            random4() + '-' + random4() + random4() + random4();
    }
}

function pad4(num: any) {
    let ret = num.toString(16);
    while (ret.length < 4) {
        ret = '0' + ret;
    }
    return ret;
}

function random4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}