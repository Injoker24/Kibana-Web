import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  Mock_AccountActivation_GetRequestDetail_1_Without_Deeplink,
  Mock_AccountActivation_GetRequestDetail_1_With_Deeplink,
  Mock_AccountActivation_VerifyOTP_1_Unregistered_User,
  Mock_AccountActivation_VerifyOTP_1_Registered_User,
  Mock_AccountActivation_VerifyOTP_2_Invalid_Birth_Date,
  Mock_AccountActivation_VerifyOTP_2_Invalid_OTP_Input,
  Mock_AccountActivation_VerifyOTP_2_System_Error,
  Mock_General_Error,
  Mock_Payment_GetPaymentDetail_1_Status_Failed,
  Mock_Payment_GetPaymentDetail_1_Status_Pending,
  Mock_Payment_GetPaymentDetail_1_Status_Success,
  Mock_Payment_GetPaymentDetail_1_Status_Unprocessed,
  Mock_Payment_ExecutePayment_2_Invalid,
  Mock_Payment_ExecutePayment_2_System_Error,
  Mock_QrisPayment_CheckPaymentStatus_1_Failed,
  Mock_QrisPayment_CheckPaymentStatus_1_Pending,
  Mock_QrisPayment_CheckPaymentStatus_1_Success,
  Mock_QrisPayment_CheckPaymentStatus_1_Unprocessed,
  Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_10K,
  Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_10Percent,
  Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_Optional,
  Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_10Percent,
  Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_Optional_Absolute,
  Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_Optional_Percentage,
  Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Without_Tip,
  Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_10K,
  Mock_QrisPayment_GetPaymentDetail_1_Static_Without_Tip,
} from "./mocks/v1";

const setupAxiosMock = (axios: AxiosInstance) => {
  const mock = new MockAdapter(axios, {
    onNoMatch: "passthrough",
    delayResponse: 1000,
  });

  /**
   * Mocks
   */

  //#region Account Activation Service

  //#region getRequestDetail
  //Success
  mock.onGet(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}/).reply(
    200,
    // Mock_AccountActivation_GetRequestDetail_1_With_Deeplink
    Mock_AccountActivation_GetRequestDetail_1_Without_Deeplink
  );

  //Error
  // mock.onGet(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}/).reply(500,
  //   Mock_General_Error
  // )
  //#endregion

  //#region generateOTP
  //Success
  mock
    .onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/otp\/generate/)
    .reply(200, {
      error_schema: {
        error_code: "X-Y-ZZZ",
        fatal_error_flag: true,
        message: "Sukses",
      },
      output_schema: {
        otp_status: "SUCCESS",
      },
    });

  //Error
  // mock.onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/otp\/generate/).reply(500,
  //   Mock_General_Error
  // )

  //#endregion

  //#region verifyOTP
  // Success
  mock
    .onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/otp\/verify/)
    .reply(
      200,
      Mock_AccountActivation_VerifyOTP_1_Unregistered_User
      // Mock_AccountActivation_VerifyOTP_1_Registered_User
    );

  //Error
  //Error 400
  // mock.onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/otp\/verify/).reply(400,
  //   // Mock_AccountActivation_VerifyOTP_2_Invalid_OTP_Input
  //   // Mock_AccountActivation_VerifyOTP_2_Invalid_Birth_Date
  //   Mock_AccountActivation_VerifyOTP_2_System_Error
  // )

  //Error 500
  // mock.onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/otp\/verify/).reply(500,
  //   Mock_General_Error
  // )

  //Error 504
  // mock.onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/otp\/verify/).reply(504, {
  //   "error_schema": {
  //     "fatal_error_flag": true,
  //     "message": "CONNECTIVITY ERROR"
  //   }
  // })
  //#endregion

  //#region Submit Registration TNC
  mock.onPost(/\/sakuku-cobrand\/registration\/tnc/).reply(200, {
    error_schema: {
      error_code: "X-Y-ZZZ",
      fatal_error_flag: false,
      message: "Sukses",
    },
    output_schema: {},
  });
  //#endregion

  //#region createNewUser
  //Success
  mock
    .onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/user\/new/)
    .reply(200, {
      error_schema: {
        error_code: "X-Y-ZZZ",
        fatal_error_flag: false,
        message: "Sukses",
      },
      output_schema: {
        status: "Success",
      },
    });

  // Error
  // mock.onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/user\/new/).reply(500,
  //   Mock_General_Error
  // )
  //#endregion

  //#region activateExistingUser
  //Success
  mock
    .onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/user\/existing/)
    .reply(200, {
      error_schema: {
        error_code: "X-Y-ZZZ",
        fatal_error_flag: false,
        message: "Sukses",
      },
      output_schema: {
        status: "Success",
      },
    });

  //Error
  //Error 400
  // mock.onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/user\/existing/).reply(400, {
  //   "error_schema": {
  //     "error_code": "ESB-10-476",
  //     "message": "PIN salah",
  //     "http_code": 400,
  //     "fatal_error_flag": false
  //   }
  // })

  //Error 500
  // mock.onPost(/\/sakuku-cobrand\/registration\/[A-Za-z0-9]{32}\/user\/existing/).reply(500,
  //   Mock_General_Error
  // )
  //#endregion
  //#endregion

  //#region Payment Service

  //#region getPaymentDetail
  //Success
  mock.onGet(/\/sakuku-cobrand\/payment\/[A-Za-z0-9]{32}/).reply(
    200,
    Mock_Payment_GetPaymentDetail_1_Status_Unprocessed
    // Mock_Payment_GetPaymentDetail_1_Status_Pending
    // Mock_Payment_GetPaymentDetail_1_Status_Success
    // Mock_Payment_GetPaymentDetail_1_Status_Failed
  );

  //Error
  // mock.onGet(/\/sakuku-cobrand\/payment\/[A-Za-z0-9]{32}/).reply(500,
  //   Mock_General_Error
  // )
  //#endregion

  //#region executePayment
  //Success
  mock.onPost(/\/sakuku-cobrand\/payment\/[A-Za-z0-9]{32}/).reply(200, {
    error_schema: {
      error_code: "X-Y-ZZZ",
      fatal_error_flag: false,
      message: "Sukses",
    },
    output_schema: {
      status: "Success",
    },
  });

  //Error 500
  mock.onPost(/\/sakuku-cobrand\/payment\/[A-Za-z0-9]{32}/).reply(
    500,
    // Mock_Payment_ExecutePayment_2_System_Error
    Mock_Payment_ExecutePayment_2_Invalid
  );

  //Error 400
  // mock.onPost(/\/sakuku-cobrand\/payment\/[A-Za-z0-9]{32}/).reply(400, {
  //   "error_schema": {
  //     "error_code": "ESB-10-476",
  //     "message": "PIN salah",
  //     "http_code": 400,
  //     "fatal_error_flag": false
  //   }
  // })

  //#endregion
  //#endregion

  //#region QRIS Payment Service

  //#region getPaymentDetail
  //Success
  mock.onGet(/\/sakuku-cobrand\/qris-payment\/[A-Za-z0-9]{32}/).reply(
    200,
    // Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_10K,
    // Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_10Percent,
    // Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_Optional,
    // Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Without_Tip,
    // Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_10K,
    Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_10Percent
    // Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_Optional_Absolute,
    // Mock_QrisPayment_GetPaymentDetail_1_Static_Tip_Optional_Percentage,
    // Mock_QrisPayment_GetPaymentDetail_1_Static_Without_Tip
  );

  //Error
  // mock.onGet(/\/sakuku-cobrand\/qris-payment\/[A-Za-z0-9]{32}/).reply(500,
  //   Mock_General_Error
  // )
  //#endregion

  //#region executePayment
  //Success
  mock.onPost(/\/sakuku-cobrand\/qris-payment\/[A-Za-z0-9]{32}/).reply(200, {
    error_schema: {
      error_code: "X-Y-ZZZ",
      fatal_error_flag: false,
      message: "Sukses",
    },
    output_schema: {
      status: "Success",
    },
  });

  //Error 500
  // mock.onPost(/\/sakuku-cobrand\/qris-payment\/[A-Za-z0-9]{32}/).reply(500,
  //   Mock_Payment_ExecutePayment_2_System_Error
  //   // Mock_Payment_ExecutePayment_2_Invalid
  // )

  //Error 400
  // mock.onPost(/\/sakuku-cobrand\/qris-payment\/[A-Za-z0-9]{32}/).reply(400, {
  //   "error_schema": {
  //     "error_code": "ESB-10-476",
  //     "message": "PIN salah",
  //     "http_code": 400,
  //     "fatal_error_flag": false
  //   }
  // })
  //#endregion

  //#region checkPaymentStatus
  mock
    .onGet(
      /\/sakuku-cobrand\/qris-payment\/[A-Za-z0-9]{32}\/status?transaction-date=1577415411/
    )
    .reply(
      200,
      // Mock_QrisPayment_CheckPaymentStatus_1_Success
      Mock_QrisPayment_CheckPaymentStatus_1_Pending
      //  Mock_QrisPayment_CheckPaymentStatus_1_Unprocessed
      // Mock_QrisPayment_CheckPaymentStatus_1_Failed
    );
  //#endregion
  //#endregion

  //#region Fire Base Service
  mock
    .onPost(/\/v1\/shortLinks\?key=AIzaSyChO7FpxbKKIFP0vSvsTR2yU3nVeNZ9BD0/)
    .reply(200, {
      shortLink: "https://testcobrand.page.link/6V7Rt9cWH9Si661y6",
      previewLink: "ttps://testcobrand.page.link/6V7Rt9cWH9Si661y6?d=1",
    });
  //#endregion

  //#region OBM Service
  mock.onPost(/\/sakuku-cobrand\/secure\/[A-Za-z0-9]{32}/).reply(200, {
    error_schema: {
      error_code: "00",
      message: "Sukses",
      fatal_error_flag: false,
    },
    output_schema: {
      modulus:
        "D45A18B19B38665971ADE4B1DEA3DD9E5F874EDB67C63EF05205C4CACAC85368AFDF105085C86BED1DCEBEC533137E738539477FC484E05935B2E849E494D0390C80A4E567F862F12CEAAD6D779AEDFC14CD289402A9024156F69FD69FB321E704D00E900844E91B90811CB85D17DF1147B0479289AF91545E7362429E9D74D8A60B606D63CC1617AD338D8D5EB81B24FE3AB6DEDEB3A245C0B5E46AD05F36A47302301B8BA34B3F390F39626D96B0780A10D583CA14F11FCA4C77CFC614D1A4FFA1ED6D89B692224D128428889235D8F9CE0F40BA1B7126A87C1644D8E1DD4748085453E413BCD7A6873AC529C75244876FDCD3B6BA70EA65288214147E7863",
      exponent:
        "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003",
      random_number: "5D7F73A87BDAC425",
      session_id: "A5E85141A7281C17E05400144FFBD319",
      remaining_time: 90,
    },
  });
  //#endregion
};

export default setupAxiosMock;
