/**
 * Note:
 * 1 = Success,
 * 2 = Error
 */
export const Mock_AccountActivation_VerifyOTP_V2_1_Registered = {
  error_schema: {
    error_code: 'X-Y-ZZZ',
    error_message: {
      indonesian: 'Sukses',
      english: 'Success',
    },
  },
  output_schema: {
    account_registered: true,
  },
};

export const Mock_AccountActivation_VerifyOTP_V2_1_NotRegistered = {
  error_schema: {
    error_code: 'X-Y-ZZZ',
    error_message: {
      indonesian: 'Sukses',
      english: 'Success',
    },
  },
  output_schema: {
    account_registered: false,
  },
};

export const Mock_AccountActivation_VerifyOTP_V2_ECB_2_308 = {
  error_schema: {
    error_code: 'ECB-2-308',
    error_message: {
      indonesian: 'Resend OTP Tidak Valid',
      english: 'Resend OTP Error',
    },
  },
  output_schema: {},
};

export const Mock_AccountActivation_VerifyOTP_V2_ECB_2_304 = {
  error_schema: {
    error_code: 'ECB-2-304',
    error_message: {
      indonesian: 'Tanggal lahir tidak sama',
      english: 'DOB not same',
    },
  },
  output_schema: {},
};

export const Mock_AccountActivation_VerifyOTP_V2_ECB_3_999 = {
  error_schema: {
    error_code: 'ECB-3-999',
    error_message: {
      indonesian: 'Gangguan sistem. Ulangi beberapa saat lagi.',
      english: 'System disruption. Please try again later.',
    },
  },
  output_schema: {},
};

export const Mock_AccountActivation_VerifyOTP_V2_ECB_3_304 = {
  error_schema: {
    error_code: 'ECB-3-304',
    error_message: {
      indonesian: 'Kode OTP Tidak Valid',
      english: 'Invalid OTP Code',
    },
  },
  output_schema: {},
};
