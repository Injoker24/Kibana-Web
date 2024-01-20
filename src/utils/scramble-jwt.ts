import uuid from './uuid';

/**
 * Scramble JWT String
 * STEP TO SCRAMBLE 
 * 1. SPLIT JWT by .
 * 2. Generate 2 random UID
 * 3. Generate random number with range 1 to length each splited jwt
 * 4. Add random alfanumeric in each splited jwt X Y Z
 * 5. Combine UID1.rand1brorand2brorand3bro.Y.Z.X.UID2 
 * 
 * @param {string} value Original JWT value
 */
export default function scrambleJwt(value: string)
    : string {
    const separatorRandom = 'BCB';
    const separatorJwt = '#';

    try {
        let splitJWT = value.split('.');

        // let uuid1 = uuid().replace('-', '');
        // let uuid2 = uuid().replace('-', '');
        const uuid1 = replaceAll(uuid(), '-');
        const uuid2 = replaceAll(uuid(), '-');

        let headerLen = Math.floor(Math.random() * splitJWT[0].length - 1);
        let payloadLen = Math.floor(Math.random() * splitJWT[1].length - 1);
        let signLen = Math.floor(Math.random() * splitJWT[2].length - 1);

        //normalize random
        if (headerLen < 1) headerLen = (headerLen * -1) + 1;
        if (payloadLen < 1) payloadLen = (payloadLen * -1) + 1;
        if (signLen < 1) signLen = (signLen * -1) + 1;

        let headerAlfa = (Math.random() + 1).toString(36).concat('0000').substring(2, 6);
        let payloadAlfa = (Math.random() + 1).toString(36).concat('0000000000').substring(2, 12);
        let signAlfa = (Math.random() + 1).toString(36).concat('0000').substring(2, 6);

        let X = splitJWT[0].substring(0, headerLen) + headerAlfa + splitJWT[0].substring(headerLen, splitJWT[0].length); // header
        let Y = splitJWT[1].substring(0, payloadLen) + payloadAlfa + splitJWT[1].substring(payloadLen, splitJWT[1].length); // payload
        let Z = splitJWT[2].substring(0, signLen) + signAlfa + splitJWT[2].substring(signLen, splitJWT[2].length); // sign

        return uuid1 + separatorJwt + headerLen + separatorRandom + payloadLen + separatorRandom + signLen + separatorRandom + separatorJwt + Y + separatorJwt + Z + separatorJwt + X + separatorJwt + uuid2;
    } catch (ex) {
        console.error(ex);
        return '';
    }
}

function replaceAll(
    value: string,
    omit: string,
    replacement = ''
) {
    return value.split(omit)
        .join(replacement);
}
