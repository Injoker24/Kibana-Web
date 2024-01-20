import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  Mock_General_Error_V2,
  Mock_AccountActivation_GetRequestDetail_V2_1,
  Mock_AccountActivation_GenerateOTP_V2_1,
  Mock_AccountActivation_VerifyOTP_V2_1_NotRegistered,
  Mock_AccountActivation_EncryptPIN_V2_1,
  Mock_AccountActivation_ActivateExistingUser_V2_1,
  Mock_AccountActivation_CreateNewUser_V2_1,
  Mock_Fatal_Error_V2,
  Mock_Non_Fatal_Error_V2,
  Mock_AccountActivation_InquiryRiplay_V2_1,
  Mock_AccountActivation_VerifyOTP_V2_ECB_2_308,
  Mock_AccountActivation_VerifyOTP_V2_ECB_3_304,
  Mock_AccountActivation_VerifyOTP_V2_ECB_2_304,
  Mock_AccountActivation_VerifyOTP_V2_1_Registered,
  Mock_AccountActivation_ActivateExistingUser_V2_ECB_2_201,
  Mock_AccountActivation_VerifyOTP_V2_ECB_3_999,
} from './mocks';

const setupAxiosMockV2 = (axios: AxiosInstance) => {
  const mock = new MockAdapter(axios, {
    onNoMatch: 'passthrough',
    delayResponse: 1000,
  });

  /**
   * Mocks
   */

  //#region Account Activation Service

  //#region Get Request Detail
  //Success
  mock
    .onGet(/\/sakuku-cobrand\/v2\/registration\/[A-Za-z0-9]{32}/)
    .reply(200, Mock_AccountActivation_GetRequestDetail_V2_1);

  //Error
  // mock
  //   .onGet(/\/sakuku-cobrand\/v2\/registration\/[A-Za-z0-9]{32}/)
  //   .reply(500, Mock_General_Error_V2);
  // mock.onGet(/\/sakuku-cobrand\/v2\/registration\/[A-Za-z0-9]{32}/).reply(400, Mock_Fatal_Error_V2);
  // mock
  //   .onGet(/\/sakuku-cobrand\/v2\/registration\/[A-Za-z0-9]{32}/)
  //   .reply(400, Mock_Non_Fatal_Error_V2);
  //#endregion

  //#region GenerateOTP
  //Success
  mock
    .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/generate/)
    .reply(200, Mock_AccountActivation_GenerateOTP_V2_1);

  //Error
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/generate/)
  //   .reply(500, Mock_General_Error_V2);
  // mock.onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/generate/).reply(400, Mock_Fatal_Error_V2);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/generate/)
  //   .reply(400, Mock_Non_Fatal_Error_V2);
  //#endregion

  //#region VerifyOTP
  //Success
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
  //   .reply(200, Mock_AccountActivation_VerifyOTP_V2_1_Registered);

  mock
    .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
    .reply(200, Mock_AccountActivation_VerifyOTP_V2_1_NotRegistered);

  //Error
  // mock.onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/).reply(500, Mock_General_Error_V2);
  // mock.onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/).reply(400, Mock_Fatal_Error_V2);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
  //   .reply(400, Mock_Non_Fatal_Error_V2);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
  //   .reply(400, Mock_AccountActivation_VerifyOTP_V2_ECB_2_308);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
  //   .reply(400, Mock_AccountActivation_VerifyOTP_V2_ECB_2_304);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
  //   .reply(400, Mock_AccountActivation_VerifyOTP_V2_ECB_3_999);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
  //   .reply(400, Mock_AccountActivation_VerifyOTP_V2_ECB_3_304);
  // mock.onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/).reply(400, Mock_Fatal_Error_V2);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/otp\/verify/)
  //   .reply(400, Mock_Non_Fatal_Error_V2);
  //#endregion

  //#region EncryptPIN
  //Success
  mock
    .onGet(/\/sakuku-cobrand\/v2\/registration\/encrypt\/prepare/)
    .reply(200, Mock_AccountActivation_EncryptPIN_V2_1);

  //Error
  // mock
  //   .onGet(/\/sakuku-cobrand\/v2\/registration\/encrypt\/prepare/)
  //   .reply(500, Mock_General_Error_V2);
  // mock
  //   .onGet(/\/sakuku-cobrand\/v2\/registration\/encrypt\/prepare/)
  //   .reply(400, Mock_Fatal_Error_V2);
  // mock
  //   .onGet(/\/sakuku-cobrand\/v2\/registration\/encrypt\/prepare/)
  //   .reply(400, Mock_Non_Fatal_Error_V2);
  //#endregion

  //#region ActivateExistingUser
  //Success
  mock
    .onPut(/\/sakuku-cobrand\/v2\/registration\/customer\/verify/)
    .reply(200, Mock_AccountActivation_ActivateExistingUser_V2_1);

  //Error
  // mock
  //   .onPut(/\/sakuku-cobrand\/v2\/registration\/customer\/verify/)
  //   .reply(500, Mock_General_Error_V2);
  // mock
  //   .onPut(/\/sakuku-cobrand\/v2\/registration\/customer\/verify/)
  //   .reply(400, Mock_AccountActivation_ActivateExistingUser_V2_ECB_2_201);
  // mock
  //   .onPut(/\/sakuku-cobrand\/v2\/registration\/customer\/verify/)
  //   .reply(400, Mock_Fatal_Error_V2);
  // mock
  //   .onPut(/\/sakuku-cobrand\/v2\/registration\/customer\/verify/)
  //   .reply(400, Mock_Non_Fatal_Error_V2);

  //#endregion

  //#region CreateNewUser
  //Success
  mock
    .onPost(/\/sakuku-cobrand\/v2\/registration\/customer\/create/)
    .reply(200, Mock_AccountActivation_CreateNewUser_V2_1);

  //Error
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/customer\/create/)
  //   .reply(500, Mock_General_Error_V2);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/customer\/create/)
  //   .reply(400, Mock_Fatal_Error_V2);
  // mock
  //   .onPost(/\/sakuku-cobrand\/v2\/registration\/customer\/create/)
  //   .reply(400, Mock_Non_Fatal_Error_V2);
  //#endregion

  //#region InquiryRiplay
  //Success
  mock
    .onGet(/\/sakuku-cobrand\/v2\/registration\/document/)
    .reply(200, Mock_AccountActivation_InquiryRiplay_V2_1);

  //Error
  // mock.onGet(/\/sakuku-cobrand\/v2\/registration\/document/).reply(500, Mock_General_Error_V2);
  // mock.onGet(/\/sakuku-cobrand\/v2\/registration\/document/).reply(400, Mock_Fatal_Error_V2);
  // mock.onGet(/\/sakuku-cobrand\/v2\/registration\/document/).reply(400, Mock_Non_Fatal_Error_V2);
  //#endregion

  //#endregion
};

export default setupAxiosMockV2;
