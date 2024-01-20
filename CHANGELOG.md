### Change Logs

### 1.5.0 [TBC]

**Release Notes:**

- Support SNAP for Sakuku Cobrand Registration (as V2). -MLI
- Label "Nama" to "Nama Lengkap" and update error message in account activation (new user).

**Added:**

- [2023-JUL-27] V2 for models, schemas, services, mocks and components for Registration. -MLI
- [2023-SEP-26] Added New Consent Checkmark. -MLI
- [2023-OKT-26] New Riplay (minified using https://kangax.github.io/html-minifier/) -MLI
- [2023-NOV-17] Backward compatibility for Sakuku Cobrand Account Activation. -THI

**Changed:**

- [2022-OCT-19] Label "Nama" to "Nama Lengkap" and update error message in account activation (new
  user).

### 1.4.0 [2022-AUG-18]

**Release Notes:**

- UX Enhancement:
  - Support form submission using `Enter`.
  - Add autofocused ghost button in Loader to dismiss the opened virtual keyboard (if any).
  - Additional double submission prevention.
- Update RIPLAY.
- Disable zoom.

**Added:**

- [2022-AUG-02] Disable zoom using meta tag. -THI
- [2022-AUG-02] Add ghost button (autofocus) in Loader to dismiss the opened virtual keyboard (if
  any). -THI
- [2022-AUG-02] Disable submission when loading and autofocus on confirmation page. -THI

**Fixed:**

- [2022-AUG-01] UX Enhancement: Support form submission using `Enter` -THI

**Changed:**

- [2022-AUG-02] Update RIPLAY -HJS

### 1.3.0 [2022-JUN-27]

**Release Notes:**

- Round down QRIS amount.

**Fixed:**

- [2022-JUN-08] QRIS amount should be rounded down.

### 1.2.0 [2022-MAY-30]

**Release Notes:**

- Since the backend system was migrated from MCB to CELL, several updates should be made (such as
  error codes, etc.).
- Display Riplay Sakuku.
- Record approved tnc version.

**Added:**

- Add `axios-mock-adapter`
- [2022-JAN-04] Add mock files.
- [2022-FEB-02] Display Riplay Sakuku and update TNC version.
- [2022-MAR-24] Add `REACT_APP_IS_MOCKED` as main flag for `axios-mock-adapter`.

**Changed:**

- [2022-MAR-08] Update tnc url.
- [2022-MAR-09] Remove `Registrasi ini dikenakan biaya SMS` since the fee will be absorbed by BCA.

**Fixed:**

- [2022-MAR-09] Update typo in riplay content.
- [2022-MAR-31] [!] Use pure `Axios` instead of `axiosInstance` since it will return CORS error.

**Maintenance:**

- Upgrade several packages

| Package Name        | Previous Version | Current Version | Note                                                   |
| ------------------- | ---------------- | --------------- | ------------------------------------------------------ |
| react               | 16.14.0          | 17.0.2          | Seamless major update                                  |
| react-dom           | 16.14.0          | 17.0.2          | -                                                      |
| react-router-dom    | 5.2.0            | 5.3.0           | -                                                      |
| bootstrap           | 4.5.3            | 4.6.1           | -                                                      |
| react-bootstrap     | 1.4.0            | 1.6.4           | -                                                      |
| react-number-format | 4.4.1            | 4.8.0           | -                                                      |
| dayjs               | 1.9.5            | 1.10.7          | -                                                      |
| text-security       | 3.1.1            | 3.2.1           | Minor adjustment in `style.scss` and `_otp-input.scss` |
| sass                | 1.29.0           | 1.45.0          | -                                                      |
| dotenv              | 8.2.0            | 8.6.0           | -                                                      |
| typescript          | 3.9.7            | 3.9.10          | -                                                      |

**Changed:**

- [2022-JAN-01] Adjust error code for account-activation.

### 1.1.0 [2022-MAR-31]

**Release Notes**

- Display RIPLAY
- TNC Version submission

### 1.0.0 [2021-SEP-28]

**Release Notes**

- Initial release Sakuku Cobrand (Webview).
- Features:
  - Activate/Register Sakuku User
  - Payment
  - QRIS Payment
