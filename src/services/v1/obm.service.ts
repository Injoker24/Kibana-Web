import {
    ApiResponse,
    PINEcnrtypPreparationResponse
} from 'models';

import { axiosInstance } from 'setup';

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

            const response = await axiosInstance.post<ApiResponse<PINEcnrtypPreparationResponse>>(
                `/sakuku-cobrand/secure/${requestId}`,
                {
                    phone_number: phoneNumber
                }
            );

            const {
                output_schema: {
                    modulus,
                    exponent,
                    random_number,
                    session_id
                }
            } = response.data;

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