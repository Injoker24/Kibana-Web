import {
    ApiResponse,
    PINEcnrtypPreparationResponse
} from 'models';

declare global {
    interface Window {
        initialisePublicKeyData: any;
        OBM_EncryptPassword: any;
        OBM_GetEncodingParameter: any;
        OBM_GetEncryptedPassword: any;
    }
}

const OBMService = {
    encryptPIN:
        async (requestId: string, phoneNumber: string, pin: string) => {

            console.log(`Function: 'OBMService.encryptPIN()'`, { requestId, phoneNumber, pin });

            const {
                output_schema: {
                    modulus,
                    exponent,
                    random_number,
                    session_id
                }
            } = await new Promise<ApiResponse<PINEcnrtypPreparationResponse>>(resolve => setTimeout(() => {
                resolve({
                    error_schema: {
                        error_code: "00",
                        message: "Sukses",
                        fatal_error_flag: false
                    },
                    output_schema: {
                        modulus: "D45A18B19B38665971ADE4B1DEA3DD9E5F874EDB67C63EF05205C4CACAC85368AFDF105085C86BED1DCEBEC533137E738539477FC484E05935B2E849E494D0390C80A4E567F862F12CEAAD6D779AEDFC14CD289402A9024156F69FD69FB321E704D00E900844E91B90811CB85D17DF1147B0479289AF91545E7362429E9D74D8A60B606D63CC1617AD338D8D5EB81B24FE3AB6DEDEB3A245C0B5E46AD05F36A47302301B8BA34B3F390F39626D96B0780A10D583CA14F11FCA4C77CFC614D1A4FFA1ED6D89B692224D128428889235D8F9CE0F40BA1B7126A87C1644D8E1DD4748085453E413BCD7A6873AC529C75244876FDCD3B6BA70EA65288214147E7863",
                        exponent: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003",
                        random_number: "5D7F73A87BDAC425",
                        session_id: "A5E85141A7281C17E05400144FFBD319",
                        remaining_time: 90
                    }
                });
            }, 1000));

            // intialize public key
            window.initialisePublicKeyData(modulus, exponent);

            // encrypt the password
            window.OBM_EncryptPassword(pin, random_number);

            // fetch the generated value
            const PString = window.OBM_GetEncodingParameter();
            const CString = window.OBM_GetEncryptedPassword();

            return {
                encoding: PString,
                encryptedPIN: CString,
                sessionId: session_id,
                randomNumber: random_number
            }
        }
};

export default OBMService;