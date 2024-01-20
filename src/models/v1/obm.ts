export interface OBMEncryptPreparation {
    modulus: string;
    exponent: string;
    random_number: string;
    session_id: string;
    expires_in: string | number;
}