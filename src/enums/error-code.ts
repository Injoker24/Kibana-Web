export enum ErrorCode {
  // ShouldResendOTP = 'ESB-10-461',
  // InvalidBirthDate = 'ESB-10-463',
  ShouldResendOTP = "1-2-403",
  InvalidBirthDate = "1-2-402",
  PaymentAmountLimitExceeded = "ESB-06-717",

  GatewayTimeout = "901",
  CardlessConnectionTimeout = "ESB-06-068",
  ClientConnectionTimeout = "ESB-99-662",
  PaymentExist = "ESB-06-727",

  GeneralError = "999",
  FatalError = "",
}
