import {
  AccountEditBankDetailInput,
  AccountEditProfileInput,
  AccountEditSkillInput,
  AccountInquiryBankDetailOutput,
  AccountInquiryCVUrlOutput,
  AccountInquiryClientReviewOutput,
  AccountInquiryDescriptionOutput,
  AccountInquiryEducationHistoryOutput,
  AccountInquiryMyProfileOutput,
  AccountInquiryOwnedServiceOutput,
  AccountInquiryOwnedTaskOutput,
  AccountInquiryPortfolioUrlOutput,
  AccountInquiryReviewHistoryOutput,
  AccountInquirySkillOutput,
  ErrorWrapper,
} from 'models';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AccountService } from 'services';
import { Form, Image, Row } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  PopUpConfirm,
  Service,
  Task,
  TitleBanner,
} from 'shared/components';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultAvatar, IconCameraSwap, IconClose, IconStar } from 'images';
import { getLocalStorage, setLocalStorage } from 'utils';
import { useForm } from 'react-hook-form';

const AccountMyProfile: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [status, setStatus] = useState();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    document.body.scrollTo(0, 0);
    setStatus(getLocalStorage('status'));
    mutateMyProfile();
    mutateBankDetail();
  }, []);

  const {
    data: myProfile,
    isLoading: isLoadingMyProfile,
    mutate: mutateMyProfile,
    error: errorMyProfile,
  } = useMutation<AccountInquiryMyProfileOutput, ErrorWrapper>(
    ['inquiry-my-profile'],
    async () => await AccountService.inquiryMyProfile(),
    {
      onSuccess: (output) => {
        setUserId(output.id);
        setLocalStorage('name', output.name);
        setLocalStorage('username', output.username);
        setLocalStorage('profileImageUrl', output.profileImageUrl);
        mutateSkills();
      },
    },
  );

  //#region Edit Profile
  const [editProfile, setEditProfile] = useState(false);
  const [confirmEditProfile, setConfirmEditProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState<AccountEditProfileInput>({
    email: '',
    username: '',
    name: '',
    phoneNumber: '',
  });

  const [profileImage, setProfileImage] = useState<any>();

  const {
    register: registerProfile,
    errors: errorsProfile,
    formState: formStateProfile,
    handleSubmit: handleSubmitProfile,
    formState: { isValid: isValidProfile },
  } = useForm({
    mode: 'onChange',
  });

  const handleUpload = (e: any) => {
    if (e.target.files.length !== 0) {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setProfileImage(img);
    }
  };

  const uploadImage = () => {
    document.getElementById('selectImage')?.click();
  };

  const cancelEditProfile = () => {
    setEditProfile(false);
    setProfileImage(null);
  };

  const confirmSubmitProfile = (formData: any) => {
    setEditProfileData(formData);
    setConfirmEditProfile(true);
  };

  const submitProfile = () => {
    setConfirmEditProfile(false);
    mutateEditProfile();
  };

  const cancelSubmitProfile = () => {
    setConfirmEditProfile(false);
  };

  const {
    isLoading: isLoadingEditProfile,
    mutate: mutateEditProfile,
    error: errorEditProfile,
  } = useMutation<{}, ErrorWrapper>(
    ['edit-profile'],
    async () =>
      await AccountService.editProfile({
        profileImage: profileImage?.data,
        email: editProfileData.email,
        username: '@' + editProfileData.username,
        name: editProfileData.name,
        phoneNumber: '+62' + editProfileData.phoneNumber,
      }),
    {
      onSuccess: () => {
        setEditProfile(false);
        setProfileImage(null);
        mutateMyProfile();
      },
    },
  );
  //#endregion

  //#region Edit Bank
  const [editBank, setEditBank] = useState(false);
  const [confirmEditBank, setConfirmEditBank] = useState(false);
  const [editBankData, setEditBankData] = useState<AccountEditBankDetailInput>({
    bankName: '',
    beneficiaryName: '',
    accountNumber: '',
  });

  const {
    register: registerBank,
    errors: errorsBank,
    formState: formStateBank,
    handleSubmit: handleSubmitBank,
    formState: { isValid: isValidBank },
  } = useForm({
    mode: 'onChange',
  });

  const cancelEditBank = () => {
    setEditBank(false);
  };

  const confirmSubmitBank = (formData: any) => {
    setEditBankData(formData);
    setConfirmEditBank(true);
  };

  const submitBank = () => {
    setConfirmEditBank(false);
    mutateEditBank();
  };

  const cancelSubmitBank = () => {
    setConfirmEditBank(false);
  };

  const {
    isLoading: isLoadingEditBank,
    mutate: mutateEditBank,
    error: errorEditBank,
  } = useMutation<{}, ErrorWrapper>(
    ['edit-bank-detail'],
    async () =>
      await AccountService.editBankDetail({
        bankName: editBankData.bankName,
        beneficiaryName: editBankData.beneficiaryName,
        accountNumber: editBankData.accountNumber,
      }),
    {
      onSuccess: () => {
        setEditBank(false);
        mutateBankDetail();
      },
    },
  );
  //#endregion

  //#region Edit Skill
  const [editSkill, setEditSkill] = useState(false);
  const [editSkillData, setEditSkillData] = useState<string[]>([]);

  const {
    register: registerSkill,
    errors: errorsSkill,
    formState: formStateSkill,
    handleSubmit: handleSubmitSkill,
  } = useForm({
    mode: 'onChange',
  });

  const addSkill = (formData: any) => {
    setEditSkillData((current) => [...current, formData.skill]);
  };

  const cancelEditSkill = () => {
    setEditSkill(false);
  };

  const confirmEditSkill = () => {
    mutateEditSkill();
  };

  const removeSkill = (index: number) => {
    setEditSkillData(editSkillData.filter((item, i) => i !== index));
  };

  const {
    isLoading: isLoadingEditSkill,
    mutate: mutateEditSkill,
    error: errorEditSkill,
  } = useMutation<{}, ErrorWrapper>(
    ['edit-skill'],
    async () =>
      await AccountService.editSkill({
        skills: editSkillData,
      }),
    {
      onSuccess: () => {
        setEditSkill(false);
        mutateSkills();
      },
    },
  );
  //#endregion

  const {
    data: bankDetail,
    isLoading: isLoadingBankDetail,
    mutate: mutateBankDetail,
    error: errorBankDetail,
  } = useMutation<AccountInquiryBankDetailOutput, ErrorWrapper>(
    ['inquiry-bank-detail'],
    async () => await AccountService.inquiryBankDetail(),
  );

  const {
    data: ownedTask,
    isLoading: isLoadingOwnedTask,
    refetch: refetchOwnedTask,
    error: errorOwnedTask,
  } = useQuery<AccountInquiryOwnedTaskOutput, ErrorWrapper>(
    ['inquiry-owned-task', userId],
    async () => await AccountService.inquiryOwnedTask(userId),
    {
      enabled: !!userId,
    },
  );

  const {
    data: clientReview,
    isLoading: isLoadingClientReview,
    refetch: refetchClientReview,
    error: errorClientReview,
  } = useQuery<AccountInquiryClientReviewOutput, ErrorWrapper>(
    ['inquiry-client-review', userId],
    async () => await AccountService.inquiryClientReview(userId),
    {
      enabled: !!userId,
    },
  );

  const {
    data: freelancerDesc,
    isLoading: isLoadingFreelancerDesc,
    refetch: refetchFreelancerDesc,
    error: errorFreelancerDesc,
  } = useQuery<AccountInquiryDescriptionOutput, ErrorWrapper>(
    ['inquiry-description', userId],
    async () => await AccountService.inquiryDescription(userId),
    {
      enabled: !!userId,
    },
  );

  const {
    data: ownedService,
    isLoading: isLoadingOwnedService,
    refetch: refetchOwnedService,
    error: errorOwnedService,
  } = useQuery<AccountInquiryOwnedServiceOutput, ErrorWrapper>(
    ['inquiry-owned-service', userId],
    async () => await AccountService.inquiryOwnedService(userId),
    {
      enabled: !!userId,
    },
  );

  const {
    data: skillsData,
    isLoading: isLoadingSkills,
    mutate: mutateSkills,
    error: errorSkills,
  } = useMutation<AccountInquirySkillOutput, ErrorWrapper>(
    ['inquiry-skill', userId],
    async () => await AccountService.inquirySkill(userId),
  );

  const {
    data: education,
    isLoading: isLoadingEducation,
    refetch: refetchEducation,
    error: errorEducation,
  } = useQuery<AccountInquiryEducationHistoryOutput, ErrorWrapper>(
    ['inquiry-education-history', userId],
    async () => await AccountService.inquiryEducationHistory(userId),
    {
      enabled: !!userId,
    },
  );

  const {
    data: cvUrl,
    isLoading: isLoadingCVUrl,
    refetch: refetchCVUrl,
    error: errorCVUrl,
  } = useQuery<AccountInquiryCVUrlOutput, ErrorWrapper>(
    ['inquiry-cv-url', userId],
    async () => await AccountService.inquiryCV(userId),
    {
      enabled: !!userId,
    },
  );

  const {
    data: portfolioUrl,
    isLoading: isLoadingPortfolioUrl,
    refetch: refetchPortfolioUrl,
    error: errorPortfolioUrl,
  } = useQuery<AccountInquiryPortfolioUrlOutput, ErrorWrapper>(
    ['inquiry-portfolio-url', userId],
    async () => await AccountService.inquiryPortfolio(userId),
    {
      enabled: !!userId,
    },
  );

  const {
    data: reviewHistory,
    isLoading: isLoadingReviewHistory,
    refetch: refetchReviewHistory,
    error: errorReviewHistory,
  } = useQuery<AccountInquiryReviewHistoryOutput, ErrorWrapper>(
    ['inquiry-review-history', userId],
    async () => await AccountService.inquiryReviewHistory(userId),
  );

  return (
    <>
      {confirmEditProfile && (
        <PopUpConfirm
          title="Ubah profil"
          message="Apakah anda yakin akan mengubah profil anda?"
          onCancel={cancelSubmitProfile}
          onSubmit={submitProfile}
        />
      )}
      {confirmEditBank && (
        <PopUpConfirm
          title="Ubah detail bank"
          message="Apakah anda yakin akan mengubah detail bank anda?"
          onCancel={cancelSubmitBank}
          onSubmit={submitBank}
        />
      )}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Profil Saya'} />
        <Row className="justify-content-center">
          <div className="col-10">
            {isLoadingMyProfile && <Loader type="inline" />}
            {errorMyProfile && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorMyProfile.message}
                  onRetry={mutateMyProfile}
                />
              </div>
            )}
            {myProfile && (
              <>
                {status === 'client' && (
                  <Row>
                    <div className="col-12 col-lg-8">
                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Profil saya</h4>
                        <div className="card-sm">
                          {!editProfile && (
                            <>
                              <Image
                                className="my-profile-freelancer-profile-image mb-4"
                                src={
                                  myProfile.profileImageUrl
                                    ? myProfile.profileImageUrl
                                    : DefaultAvatar
                                }
                                alt={myProfile.name}
                              />
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  E-Mail
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.email}</p>
                              </Row>
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  Username
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.username}</p>
                              </Row>
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  Nama
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.name}</p>
                              </Row>
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  Nomor Handphone
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.phoneNumber}</p>
                              </Row>
                              <div
                                className="btn btn-outline-primary"
                                onClick={() => setEditProfile(true)}
                              >
                                Ubah Profil
                              </div>
                            </>
                          )}

                          {editProfile && (
                            <>
                              {isLoadingEditProfile && <Loader type="inline" />}
                              {!isLoadingEditProfile && (
                                <form onSubmit={handleSubmitProfile(confirmSubmitProfile)}>
                                  {errorEditProfile && (
                                    <div className="mb-4">
                                      <InfoBox
                                        message={errorEditProfile?.message}
                                        type="danger"
                                      />
                                    </div>
                                  )}
                                  <div
                                    className="position-relative cursor-pointer"
                                    onClick={uploadImage}
                                  >
                                    <Image
                                      className="my-profile-freelancer-profile-image mb-4"
                                      src={
                                        profileImage?.preview
                                          ? profileImage?.preview
                                          : myProfile.profileImageUrl
                                          ? myProfile.profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={myProfile.name}
                                      style={{ filter: 'brightness(0.75)' }}
                                    />
                                    <div
                                      className="text-white position-absolute"
                                      style={{ top: '1.5rem', left: '1.75rem' }}
                                    >
                                      <IconCameraSwap />
                                    </div>
                                  </div>
                                  <input
                                    hidden
                                    id="selectImage"
                                    type="file"
                                    onChange={handleUpload}
                                  />
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      E-Mail
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.email?.message}>
                                        <Form.Control
                                          type="text"
                                          id="email"
                                          name="email"
                                          defaultValue={myProfile.email}
                                          isInvalid={
                                            formStateProfile.touched.email === true &&
                                            !!errorsProfile.email
                                          }
                                          ref={
                                            registerProfile({
                                              required: {
                                                value: true,
                                                message: 'E-mail harus diisi.',
                                              },
                                            }) as string & ((ref: Element | null) => void)
                                          }
                                        />
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Username
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.username?.message}>
                                        <div className="d-flex flex-row">
                                          <div className="input-prefix flex-centered mr-3">@</div>
                                          <Form.Control
                                            type="text"
                                            id="username"
                                            name="username"
                                            defaultValue={myProfile.username.slice(1)}
                                            className="w-100"
                                            isInvalid={
                                              formStateProfile.touched.username === true &&
                                              !!errorsProfile.username
                                            }
                                            ref={
                                              registerProfile({
                                                required: {
                                                  value: true,
                                                  message: 'Username harus diisi.',
                                                },
                                              }) as string & ((ref: Element | null) => void)
                                            }
                                          />
                                        </div>
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Nama
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.name?.message}>
                                        <Form.Control
                                          type="text"
                                          id="name"
                                          name="name"
                                          defaultValue={myProfile.name}
                                          isInvalid={
                                            formStateProfile.touched.name === true &&
                                            !!errorsProfile.name
                                          }
                                          ref={
                                            registerProfile({
                                              required: {
                                                value: true,
                                                message: 'Nama harus diisi.',
                                              },
                                            }) as string & ((ref: Element | null) => void)
                                          }
                                        />
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Nomor Handphone
                                    </h4>
                                    <div className=" col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.phoneNumber?.message}>
                                        <div className="d-flex flex-row">
                                          <div className="input-prefix flex-centered mr-3">+62</div>
                                          <Form.Control
                                            type="number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            defaultValue={myProfile.phoneNumber.slice(3)}
                                            isInvalid={
                                              formStateProfile.touched.phoneNumber === true &&
                                              !!errorsProfile.phoneNumber
                                            }
                                            ref={
                                              registerProfile({
                                                required: {
                                                  value: true,
                                                  message: 'Nomor handphone harus diisi.',
                                                },
                                              }) as string & ((ref: Element | null) => void)
                                            }
                                          />
                                        </div>
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <button
                                    className="btn btn-primary w-100 mb-4"
                                    disabled={!isValidProfile}
                                    type="submit"
                                  >
                                    Simpan
                                  </button>

                                  <div
                                    className="btn btn-outline-primary w-100"
                                    onClick={cancelEditProfile}
                                  >
                                    Batal
                                  </div>
                                </form>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Detail bank</h4>
                        <div className="card-sm">
                          {isLoadingBankDetail && <Loader type="inline" />}

                          {errorBankDetail && (
                            <div className="flex-centered">
                              <InlineRetryError
                                message={errorBankDetail.message}
                                onRetry={mutateBankDetail}
                              />
                            </div>
                          )}

                          {!editBank && bankDetail && (
                            <>
                              {bankDetail.bankDetail && (
                                <>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Nama Bank
                                    </h4>
                                    <p className="col-12 col-md-9">
                                      {bankDetail.bankDetail.bankName.toUpperCase()}
                                    </p>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Penerima
                                    </h4>
                                    <p className="col-12 col-md-9">
                                      {bankDetail.bankDetail.beneficiaryName}
                                    </p>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      No. Rekening / No. Handphone
                                    </h4>
                                    <p className="col-12 col-md-9">
                                      {bankDetail.bankDetail.accountNumber}
                                    </p>
                                  </Row>
                                </>
                              )}

                              {!bankDetail.bankDetail && (
                                <div className="mb-4">
                                  <InfoBox
                                    message={myProfile.name + ' belum menambahkan detail bank.'}
                                  />
                                </div>
                              )}
                              <div
                                className="btn btn-outline-primary"
                                onClick={() => setEditBank(true)}
                              >
                                Ubah Detail Bank
                              </div>
                            </>
                          )}

                          {editBank && bankDetail && (
                            <>
                              {isLoadingEditBank && <Loader type="inline" />}
                              {!isLoadingEditBank && (
                                <form onSubmit={handleSubmitBank(confirmSubmitBank)}>
                                  {errorEditBank && (
                                    <div className="mb-4">
                                      <InfoBox
                                        message={errorEditBank?.message}
                                        type="danger"
                                      />
                                    </div>
                                  )}
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Nama Bank
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsBank?.bankName?.message}>
                                        <Form.Control
                                          as="select"
                                          id="bankName"
                                          name="bankName"
                                          defaultValue={bankDetail.bankDetail?.bankName}
                                          isInvalid={
                                            formStateBank.touched.bankName === true &&
                                            !!errorsBank.bankName
                                          }
                                          ref={
                                            registerBank() as string &
                                              ((ref: Element | null) => void)
                                          }
                                        >
                                          <option value="bca">BCA</option>
                                          <option value="mandiri">MANDIRI</option>
                                          <option value="bni">BNI</option>
                                          <option value="gopay">GOPAY</option>
                                          <option value="ovo">OVO</option>
                                        </Form.Control>
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Penerima
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput
                                        errorMessage={errorsBank?.beneficiaryName?.message}
                                      >
                                        <Form.Control
                                          type="text"
                                          id="beneficiaryName"
                                          name="beneficiaryName"
                                          defaultValue={bankDetail.bankDetail?.beneficiaryName}
                                          isInvalid={
                                            formStateBank.touched.beneficiaryName === true &&
                                            !!errorsBank.beneficiaryName
                                          }
                                          ref={
                                            registerBank({
                                              required: {
                                                value: true,
                                                message: 'Penerima harus diisi.',
                                              },
                                            }) as string & ((ref: Element | null) => void)
                                          }
                                        />
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      No. Rekening / No. Handphone
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsBank?.accountNumber?.message}>
                                        <Form.Control
                                          type="number"
                                          id="accountNumber"
                                          name="accountNumber"
                                          defaultValue={bankDetail.bankDetail?.accountNumber}
                                          isInvalid={
                                            formStateBank.touched.accountNumber === true &&
                                            !!errorsBank.accountNumber
                                          }
                                          ref={
                                            registerBank({
                                              required: {
                                                value: true,
                                                message:
                                                  'No. rekening / No. handphone harus diisi.',
                                              },
                                            }) as string & ((ref: Element | null) => void)
                                          }
                                        />
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <button
                                    className="btn btn-primary w-100 mb-4"
                                    disabled={!isValidBank}
                                    type="submit"
                                  >
                                    Simpan
                                  </button>
                                  <div
                                    className="btn btn-outline-primary w-100"
                                    onClick={cancelEditBank}
                                  >
                                    Batal
                                  </div>
                                </form>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Tugas yang terbuka</h4>
                        {isLoadingOwnedTask && <Loader type="inline" />}
                        {errorOwnedTask && (
                          <div className="card-sm">
                            <InlineRetryError
                              message={errorOwnedTask.message}
                              onRetry={refetchOwnedTask}
                            />
                          </div>
                        )}
                        {ownedTask && !ownedTask.tasks && (
                          <div className="card-sm">
                            <InfoBox message={myProfile.name + ' belum memiliki tugas.'} />
                          </div>
                        )}
                        {ownedTask &&
                          ownedTask.tasks &&
                          ownedTask.tasks.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="w-100 pb-4 cursor-pointer"
                                onClick={() => {
                                  history.push({
                                    pathname: '/task/' + item.id,
                                    state: {
                                      prevPath: location.pathname,
                                    },
                                  });
                                }}
                              >
                                <Task
                                  name={item.name}
                                  description={item.description}
                                  tags={item.tags}
                                  dueDate={item.dueDate}
                                  difficulty={item.difficulty}
                                  price={item.price}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Ulasan untuk saya</h4>
                        <div className="card-sm">
                          {isLoadingClientReview && <Loader type="inline" />}
                          {errorClientReview && (
                            <div className="flex-centered">
                              <InlineRetryError
                                message={errorClientReview.message}
                                onRetry={refetchClientReview}
                              />
                            </div>
                          )}
                          {clientReview && (
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-row align-items-center">
                                  <h2 className="mr-2 mb-0">{clientReview.averageRating}</h2>
                                  <div className="text-warning">
                                    <IconStar />
                                  </div>
                                </div>
                                <p>{clientReview.ratingAmount} ulasan</p>
                              </div>
                              <hr />
                              <div
                                className="overflow-auto"
                                style={clientReview.reviewList ? { height: '70rem' } : {}}
                              >
                                {clientReview.reviewList?.map((review) => {
                                  return (
                                    <div className="mb-3">
                                      <p className="font-weight-bold">{review.name}</p>
                                      <div className="d-flex flex-row mb-2">
                                        {Array(review.star)
                                          .fill(null)
                                          .map(() => {
                                            return (
                                              <div className="text-warning">
                                                <IconStar />
                                              </div>
                                            );
                                          })}
                                      </div>
                                      <small className="d-block mb-2">{review.description}</small>
                                      <small className="d-block text-muted">
                                        {review.timestamp}
                                      </small>
                                    </div>
                                  );
                                })}
                                {!clientReview.reviewList && (
                                  <InfoBox message={'Belum ada review'} />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Row>
                )}

                {status === 'freelancer' && (
                  <Row>
                    <div className="col-12 col-lg-6">
                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Profil saya</h4>
                        <div className="card-sm">
                          {!editProfile && (
                            <>
                              <Image
                                className="my-profile-freelancer-profile-image mb-4"
                                src={
                                  myProfile.profileImageUrl
                                    ? myProfile.profileImageUrl
                                    : DefaultAvatar
                                }
                                alt={myProfile.name}
                              />
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  E-Mail
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.email}</p>
                              </Row>
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  Username
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.username}</p>
                              </Row>
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  Nama
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.name}</p>
                              </Row>
                              <Row className="mb-5 align-items-center">
                                <h4 className="font-weight-semibold mb-2 mb-md-0 col-12 col-md-3">
                                  Nomor Handphone
                                </h4>
                                <p className="col-12 col-md-9">{myProfile.phoneNumber}</p>
                              </Row>
                              <div
                                className="btn btn-outline-primary"
                                onClick={() => setEditProfile(true)}
                              >
                                Ubah Profil
                              </div>
                            </>
                          )}

                          {editProfile && (
                            <>
                              {isLoadingEditProfile && <Loader type="inline" />}
                              {!isLoadingEditProfile && (
                                <form onSubmit={handleSubmitProfile(confirmSubmitProfile)}>
                                  {errorEditProfile && (
                                    <div className="mb-4">
                                      <InfoBox
                                        message={errorEditProfile?.message}
                                        type="danger"
                                      />
                                    </div>
                                  )}
                                  <div
                                    className="position-relative cursor-pointer"
                                    onClick={uploadImage}
                                  >
                                    <Image
                                      className="my-profile-freelancer-profile-image mb-4"
                                      src={
                                        profileImage?.preview
                                          ? profileImage?.preview
                                          : myProfile.profileImageUrl
                                          ? myProfile.profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={myProfile.name}
                                      style={{ filter: 'brightness(0.75)' }}
                                    />
                                    <div
                                      className="text-white position-absolute"
                                      style={{ top: '1.5rem', left: '1.75rem' }}
                                    >
                                      <IconCameraSwap />
                                    </div>
                                  </div>
                                  <input
                                    hidden
                                    id="selectImage"
                                    type="file"
                                    onChange={handleUpload}
                                  />
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      E-Mail
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.email?.message}>
                                        <Form.Control
                                          type="text"
                                          id="email"
                                          name="email"
                                          defaultValue={myProfile.email}
                                          isInvalid={
                                            formStateProfile.touched.email === true &&
                                            !!errorsProfile.email
                                          }
                                          ref={
                                            registerProfile({
                                              required: {
                                                value: true,
                                                message: 'E-mail harus diisi.',
                                              },
                                            }) as string & ((ref: Element | null) => void)
                                          }
                                        />
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Username
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.username?.message}>
                                        <div className="d-flex flex-row">
                                          <div className="input-prefix flex-centered mr-3">@</div>
                                          <Form.Control
                                            type="text"
                                            id="username"
                                            name="username"
                                            defaultValue={myProfile.username.slice(1)}
                                            className="w-100"
                                            isInvalid={
                                              formStateProfile.touched.username === true &&
                                              !!errorsProfile.username
                                            }
                                            ref={
                                              registerProfile({
                                                required: {
                                                  value: true,
                                                  message: 'Username harus diisi.',
                                                },
                                              }) as string & ((ref: Element | null) => void)
                                            }
                                          />
                                        </div>
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5 align-items-center">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Nama
                                    </h4>
                                    <div className="col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.name?.message}>
                                        <Form.Control
                                          type="text"
                                          id="name"
                                          name="name"
                                          defaultValue={myProfile.name}
                                          isInvalid={
                                            formStateProfile.touched.name === true &&
                                            !!errorsProfile.name
                                          }
                                          ref={
                                            registerProfile({
                                              required: {
                                                value: true,
                                                message: 'Nama harus diisi.',
                                              },
                                            }) as string & ((ref: Element | null) => void)
                                          }
                                        />
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <Row className="mb-5">
                                    <h4 className="font-weight-semibold mb-3 mb-md-0 col-12 col-md-3">
                                      Nomor Handphone
                                    </h4>
                                    <div className=" col-12 col-md-9">
                                      <FormInput errorMessage={errorsProfile?.phoneNumber?.message}>
                                        <div className="d-flex flex-row">
                                          <div className="input-prefix flex-centered mr-3">+62</div>
                                          <Form.Control
                                            type="number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            defaultValue={myProfile.phoneNumber.slice(3)}
                                            isInvalid={
                                              formStateProfile.touched.phoneNumber === true &&
                                              !!errorsProfile.phoneNumber
                                            }
                                            ref={
                                              registerProfile({
                                                required: {
                                                  value: true,
                                                  message: 'Nomor handphone harus diisi.',
                                                },
                                              }) as string & ((ref: Element | null) => void)
                                            }
                                          />
                                        </div>
                                      </FormInput>
                                    </div>
                                  </Row>
                                  <button
                                    className="btn btn-primary w-100 mb-4"
                                    disabled={!isValidProfile}
                                    type="submit"
                                  >
                                    Simpan
                                  </button>

                                  <div
                                    className="btn btn-outline-primary w-100"
                                    onClick={cancelEditProfile}
                                  >
                                    Batal
                                  </div>
                                </form>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Deskripsi freelancer</h4>
                        <div className="card-sm">
                          {isLoadingFreelancerDesc && <Loader type="inline" />}
                          {errorFreelancerDesc && (
                            <div className="card-sm mb-5 mb-lg-0">
                              <InlineRetryError
                                message={errorFreelancerDesc.message}
                                onRetry={refetchFreelancerDesc}
                              />
                            </div>
                          )}
                          {freelancerDesc && (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: freelancerDesc.description,
                              }}
                            ></p>
                          )}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Layanan yang tersedia</h4>
                        {isLoadingOwnedService && <Loader type="inline" />}
                        {errorOwnedService && (
                          <div className="flex-centered">
                            <InlineRetryError
                              message={errorOwnedService.message}
                              onRetry={refetchOwnedService}
                            />
                          </div>
                        )}
                        {ownedService && !ownedService.services && (
                          <div className="card-sm">
                            <InfoBox message={myProfile.name + ' belum memiliki layanan.'} />
                          </div>
                        )}
                        <Row>
                          {ownedService &&
                            ownedService.services &&
                            ownedService.services.map((item) => {
                              return (
                                <div
                                  key={item.id}
                                  className="col-12 col-md-6 pb-4 cursor-pointer"
                                  onClick={() => {
                                    history.push({
                                      pathname: '/service/' + item.id,
                                      state: {
                                        prevPath: location.pathname,
                                      },
                                    });
                                  }}
                                >
                                  <Service
                                    imageUrl={item.imageUrl}
                                    name={item.name}
                                    freelancer={item.freelancer}
                                    averageRating={item.averageRating}
                                    ratingAmount={item.ratingAmount}
                                    tags={item.tags}
                                    price={item.price}
                                    workingTime={item.workingTime}
                                  />
                                </div>
                              );
                            })}
                        </Row>
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Riwayat pengerjaan proyek</h4>
                        <div className="card-sm">
                          {isLoadingReviewHistory && <Loader type="inline" />}
                          {errorReviewHistory && (
                            <div className="flex-centered">
                              <InlineRetryError
                                message={errorReviewHistory.message}
                                onRetry={refetchReviewHistory}
                              />
                            </div>
                          )}
                          {reviewHistory && (
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-row align-items-center">
                                  <h2 className="mr-2 mb-0">{reviewHistory.averageRating}</h2>
                                  <div className="text-warning">
                                    <IconStar />
                                  </div>
                                </div>
                                <p>{reviewHistory.projectAmount} proyek</p>
                              </div>
                              <hr />
                              <div
                                className="overflow-auto"
                                style={reviewHistory.projectList ? { maxHeight: '50rem' } : {}}
                              >
                                {reviewHistory.projectList?.map((review) => {
                                  return (
                                    <div className="mb-4">
                                      <p className="font-weight-bold">{review.projectName}</p>
                                      <div className="d-flex flex-row mb-2">
                                        {review.star &&
                                          Array(review.star)
                                            .fill(null)
                                            .map(() => {
                                              return (
                                                <div className="text-warning">
                                                  <IconStar />
                                                </div>
                                              );
                                            })}
                                        {!review.star && <small>Belum ada ulasan</small>}
                                      </div>
                                      <small className="d-block mb-2">{review.description}</small>
                                      <small className="d-block text-muted">
                                        {review.timestamp}
                                      </small>
                                    </div>
                                  );
                                })}
                                {!reviewHistory.projectList && (
                                  <InfoBox message={'Belum ada review'} />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Keahlian</h4>
                        <div className="card-sm mb-5 mb-lg-0">
                          {isLoadingSkills && <Loader type="inline" />}
                          {errorSkills && (
                            <div className="flex-centered">
                              <InlineRetryError
                                message={errorSkills.message}
                                onRetry={mutateSkills}
                              />
                            </div>
                          )}
                          {!editSkill && skillsData && (
                            <>
                              <div className="d-flex flex-row flex-wrap">
                                {skillsData.skills?.map((item) => {
                                  return <div className="chip chip-primary mr-2 mb-3">{item}</div>;
                                })}
                              </div>
                              {!skillsData.skills && (
                                <InfoBox
                                  message={myProfile.name + ' belum menambahkan keahlian.'}
                                />
                              )}
                              <div
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  setEditSkill(true);
                                  setEditSkillData(skillsData.skills ? skillsData.skills : []);
                                }}
                              >
                                Ubah Keahlian
                              </div>
                            </>
                          )}

                          {editSkill && skillsData && (
                            <>
                              {isLoadingEditSkill && <Loader type="inline" />}
                              {!isLoadingEditSkill && (
                                <>
                                  {errorEditSkill && (
                                    <div className="mb-4">
                                      <InfoBox
                                        message={errorEditSkill?.message}
                                        type="danger"
                                      />
                                    </div>
                                  )}
                                  <div className="d-flex flex-row flex-wrap">
                                    {editSkillData.map((item, i) => {
                                      return (
                                        <div className="chip chip-primary mr-2 mb-3">
                                          <span className="mr-2"> {item} </span>
                                          <div
                                            className="cursor-pointer"
                                            onClick={() => removeSkill(i)}
                                          >
                                            <IconClose />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <form onSubmit={handleSubmitSkill(addSkill)}>
                                    <div className="d-flex flex-row mb-4">
                                      <div className="w-100 mr-3">
                                        <FormInput errorMessage={errorsSkill?.skill?.message}>
                                          <Form.Control
                                            type="text"
                                            id="skill"
                                            name="skill"
                                            isInvalid={
                                              formStateSkill.touched.skill === true &&
                                              !!errorsSkill.skill
                                            }
                                            ref={
                                              registerSkill({
                                                required: {
                                                  value: true,
                                                  message: 'Keahlian tidak boleh kosong.',
                                                },
                                              }) as string & ((ref: Element | null) => void)
                                            }
                                          ></Form.Control>
                                        </FormInput>
                                      </div>
                                      <div style={{ width: '6rem' }}>
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                          style={{ borderRadius: '0.5rem' }}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                  <div className="d-flex flex-row justify-content-end">
                                    <div
                                      className="btn btn-outline-primary mr-3"
                                      onClick={cancelEditSkill}
                                    >
                                      Batal
                                    </div>
                                    <div
                                      className="btn btn-primary"
                                      onClick={confirmEditSkill}
                                    >
                                      Simpan
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Edukasi</h4>
                        <div className="card-sm mb-5 mb-lg-0">
                          {isLoadingEducation && <Loader type="inline" />}
                          {errorEducation && (
                            <div className="flex-centered">
                              <InlineRetryError
                                message={errorEducation.message}
                                onRetry={refetchEducation}
                              />
                            </div>
                          )}
                          {education &&
                            education.educationHistory?.map((item, i, { length }) => {
                              return (
                                <div className="mb-3">
                                  <p className="mb-2">
                                    {item.degree} {item.major}
                                  </p>
                                  <p className="font-weight-bold mb-2">{item.university}</p>
                                  <p className="text-muted">
                                    {item.country} ({item.graduationYear})
                                  </p>
                                  {i + 1 !== length && <hr />}
                                </div>
                              );
                            })}
                          {education && !education.educationHistory && (
                            <InfoBox
                              message={myProfile.name + ' belum menambahkan riwayat edukasi.'}
                            />
                          )}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">CV</h4>
                        {isLoadingCVUrl && <Loader type="inline" />}
                        {errorCVUrl && (
                          <div className="card-sm mb-5 mb-lg-0">
                            <InlineRetryError
                              message={errorCVUrl.message}
                              onRetry={refetchCVUrl}
                            />
                          </div>
                        )}
                        {cvUrl && cvUrl.cvUrl && (
                          <iframe
                            src={cvUrl.cvUrl}
                            title="CV"
                            className="w-100"
                            style={{ height: '60rem' }}
                          ></iframe>
                        )}
                        {cvUrl && !cvUrl.cvUrl && (
                          <div className="card-sm mb-5 mb-lg-0">
                            <InfoBox message={myProfile.name + ' belum mengupload CV.'} />
                          </div>
                        )}
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Portfolio</h4>
                        {isLoadingPortfolioUrl && <Loader type="inline" />}
                        {errorPortfolioUrl && (
                          <div className="card-sm mb-5 mb-lg-0">
                            <InlineRetryError
                              message={errorPortfolioUrl.message}
                              onRetry={refetchPortfolioUrl}
                            />
                          </div>
                        )}
                        {portfolioUrl && portfolioUrl.portfolioUrl && (
                          <iframe
                            src={portfolioUrl.portfolioUrl}
                            title="CV"
                            className="w-100"
                            style={{ height: '60rem' }}
                          ></iframe>
                        )}
                        {portfolioUrl && !portfolioUrl.portfolioUrl && (
                          <div className="card-sm mb-5 mb-lg-0">
                            <InfoBox message={myProfile.name + ' belum mengupload portfolio.'} />
                          </div>
                        )}
                      </div>
                    </div>
                  </Row>
                )}
              </>
            )}
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AccountMyProfile;
