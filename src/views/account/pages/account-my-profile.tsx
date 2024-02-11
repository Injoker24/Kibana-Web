import {
  AccountEditProfileInput,
  AccountInquiryBankDetailOutput,
  AccountInquiryCVUrlOutput,
  AccountInquiryClientReviewOutput,
  AccountInquiryDescriptionOutput,
  AccountInquiryEducationHistoryOutput,
  AccountInquiryMyProfileOutput,
  AccountInquiryOwnedServiceOutput,
  AccountInquiryOwnedTaskOutput,
  AccountInquiryPortfolioUrlOutput,
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
import { DefaultAvatar, IconStar } from 'images';
import { getLocalStorage } from 'utils';
import { useForm } from 'react-hook-form';

const AccountMyProfile: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [status, setStatus] = useState();
  const [userId, setUserId] = useState('');

  const [editProfile, setEditProfile] = useState(false);
  const [confirmEditProfile, setConfirmEditProfile] = useState(false);

  const [editProfileData, setEditProfileData] = useState<AccountEditProfileInput>({});

  const {
    register: registerProfile,
    errors: errorsProfile,
    formState: formStateProfile,
    handleSubmit: handleSubmitProfile,
    formState: { isValid: isValidProfile },
  } = useForm({
    mode: 'onChange',
  });

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

  useEffect(() => {
    document.body.scrollTo(0, 0);
    setStatus(getLocalStorage('status'));
    mutateMyProfile();
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
      },
    },
  );

  const {
    isLoading: isLoadingEditProfile,
    mutate: mutateEditProfile,
    error: errorEditProfile,
  } = useMutation<{}, ErrorWrapper>(
    ['edit-profile'],
    async () =>
      await AccountService.editProfile({
        email: editProfileData.email,
        username: '@' + editProfileData.username,
        name: editProfileData.name,
        phoneNumber: '+62' + editProfileData.phoneNumber,
      }),
    {
      onSuccess: () => {
        setEditProfile(false);
        mutateMyProfile();
      },
    },
  );

  const {
    data: bankDetail,
    isLoading: isLoadingBankDetail,
    refetch: refetchBankDetail,
    error: errorBankDetail,
  } = useQuery<AccountInquiryBankDetailOutput, ErrorWrapper>(
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
    data: skills,
    isLoading: isLoadingSkills,
    refetch: refetchSkills,
    error: errorSkills,
  } = useQuery<AccountInquirySkillOutput, ErrorWrapper>(
    ['inquiry-skill', userId],
    async () => await AccountService.inquirySkill(userId),
    {
      enabled: !!userId,
    },
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
                          <Image
                            className="my-profile-freelancer-profile-image mb-5"
                            src={
                              myProfile.profileImageUrl ? myProfile.profileImageUrl : DefaultAvatar
                            }
                            alt={myProfile.name}
                          />
                          {!editProfile && (
                            <>
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
                                className="btn btn-primary"
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
                                    onClick={() => setEditProfile(false)}
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
                                onRetry={refetchBankDetail}
                              />
                            </div>
                          )}
                          {bankDetail && bankDetail.bankDetail && (
                            <>
                              <Row className="mb-5">
                                <h4 className="font-weight-semibold mb-0 col-5 col-md-3">
                                  Nama Bank
                                </h4>
                                <p className="col-7 col-md-9">BCA</p>
                              </Row>
                              <Row className="mb-5">
                                <h4 className="font-weight-semibold mb-0 col-5 col-md-3">
                                  Penerima
                                </h4>
                                <p className="col-7 col-md-9">Michael Christian Lee</p>
                              </Row>
                              <Row className="mb-5">
                                <h4 className="font-weight-semibold mb-0 col-5 col-md-3">
                                  Nomor Rekening / Nomor Handphone
                                </h4>
                                <p className="col-7 col-md-9">123348312</p>
                              </Row>
                            </>
                          )}
                          {bankDetail && !bankDetail.bankDetail && (
                            <div className="mb-5">
                              <InfoBox
                                message={myProfile.name + ' belum menambahkan detail bank.'}
                              />
                            </div>
                          )}
                          {bankDetail && <div className="btn btn-primary">Ubah Detail Bank</div>}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="font-weight-semibold mb-3">Tugas yang terbuka</h4>
                        {isLoadingOwnedTask && <Loader type="inline" />}
                        {errorOwnedTask && (
                          <div className="card-sm mb-5 mb-lg-0">
                            <InlineRetryError
                              message={errorOwnedTask.message}
                              onRetry={refetchOwnedTask}
                            />
                          </div>
                        )}
                        {ownedTask &&
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
                        <Row>
                          {ownedService &&
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
                        <h4 className="font-weight-semibold mb-3">Keahlian</h4>
                        <div className="card-sm mb-5 mb-lg-0">
                          {isLoadingSkills && <Loader type="inline" />}
                          {errorSkills && (
                            <div className="flex-centered">
                              <InlineRetryError
                                message={errorSkills.message}
                                onRetry={refetchSkills}
                              />
                            </div>
                          )}
                          <div className="d-flex flex-row flex-wrap">
                            {skills &&
                              skills.skills?.map((item) => {
                                return <div className="chip chip-primary mr-2 mb-3">{item}</div>;
                              })}
                          </div>
                          {skills && !skills.skills && (
                            <InfoBox message={myProfile.name + ' belum menambahkan keahlian.'} />
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
