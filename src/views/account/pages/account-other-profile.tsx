import {
  AccountInquiryCVUrlOutput,
  AccountInquiryClientReviewOutput,
  AccountInquiryDescriptionOutput,
  AccountInquiryEducationHistoryOutput,
  AccountInquiryOtherProfileOutput,
  AccountInquiryOwnedServiceOutput,
  AccountInquiryOwnedTaskOutput,
  AccountInquiryPortfolioUrlOutput,
  AccountInquirySkillOutput,
  ErrorWrapper,
} from 'models';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { AccountService } from 'services';
import { Image, Row, Tab, Tabs } from 'react-bootstrap';

import {
  Footer,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  Service,
  Task,
  TitleBanner,
} from 'shared/components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { DefaultAvatar, IconChevronLeft, IconStar } from 'images';

const AccountOtherProfile: React.FC = ({ status, prevPath }: any) => {
  const params = useParams<{ userId: string }>();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const {
    data: otherProfile,
    isLoading: isLoadingOtherProfile,
    refetch: refetchOtherProfile,
    error: errorOtherProfile,
  } = useQuery<AccountInquiryOtherProfileOutput, ErrorWrapper>(
    ['inquiry-other-profile', params.userId],
    async () => await AccountService.inquiryOtherProfile(params.userId),
  );

  const {
    data: ownedTask,
    isLoading: isLoadingOwnedTask,
    refetch: refetchOwnedTask,
    error: errorOwnedTask,
  } = useQuery<AccountInquiryOwnedTaskOutput, ErrorWrapper>(
    ['inquiry-owned-task', params.userId],
    async () => await AccountService.inquiryOwnedTask(params.userId),
  );

  const {
    data: clientReview,
    isLoading: isLoadingClientReview,
    refetch: refetchClientReview,
    error: errorClientReview,
  } = useQuery<AccountInquiryClientReviewOutput, ErrorWrapper>(
    ['inquiry-client-review', params.userId],
    async () => await AccountService.inquiryClientReview(params.userId),
  );

  const {
    data: freelancerDesc,
    isLoading: isLoadingFreelancerDesc,
    refetch: refetchFreelancerDesc,
    error: errorFreelancerDesc,
  } = useQuery<AccountInquiryDescriptionOutput, ErrorWrapper>(
    ['inquiry-description', params.userId],
    async () => await AccountService.inquiryDescription(params.userId),
  );

  const {
    data: ownedService,
    isLoading: isLoadingOwnedService,
    refetch: refetchOwnedService,
    error: errorOwnedService,
  } = useQuery<AccountInquiryOwnedServiceOutput, ErrorWrapper>(
    ['inquiry-owned-service', params.userId],
    async () => await AccountService.inquiryOwnedService(params.userId),
  );

  const {
    data: skills,
    isLoading: isLoadingSkills,
    refetch: refetchSkills,
    error: errorSkills,
  } = useQuery<AccountInquirySkillOutput, ErrorWrapper>(
    ['inquiry-skill', params.userId],
    async () => await AccountService.inquirySkill(params.userId),
  );

  const {
    data: education,
    isLoading: isLoadingEducation,
    refetch: refetchEducation,
    error: errorEducation,
  } = useQuery<AccountInquiryEducationHistoryOutput, ErrorWrapper>(
    ['inquiry-education-history', params.userId],
    async () => await AccountService.inquiryEducationHistory(params.userId),
  );

  const {
    data: cvUrl,
    isLoading: isLoadingCVUrl,
    refetch: refetchCVUrl,
    error: errorCVUrl,
  } = useQuery<AccountInquiryCVUrlOutput, ErrorWrapper>(
    ['inquiry-cv-url', params.userId],
    async () => await AccountService.inquiryCV(params.userId),
  );

  const {
    data: portfolioUrl,
    isLoading: isLoadingPortfolioUrl,
    refetch: refetchPortfolioUrl,
    error: errorPortfolioUrl,
  } = useQuery<AccountInquiryPortfolioUrlOutput, ErrorWrapper>(
    ['inquiry-portfolio-url', params.userId],
    async () => await AccountService.inquiryPortfolio(params.userId),
  );

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Profil'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div
              className="text-primary-dark flex-centered justify-content-start cursor-pointer mb-4"
              onClick={() => {
                history.push(prevPath ? prevPath : '/dashboard');
              }}
            >
              <div className="mr-3">
                <IconChevronLeft />
              </div>
              <p className="cursor-pointer">Kembali</p>
            </div>

            {isLoadingOtherProfile && <Loader type="inline" />}
            {errorOtherProfile && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorOtherProfile.message}
                  onRetry={refetchOtherProfile}
                />
              </div>
            )}
            {otherProfile && (
              <>
                <div className="card-sm mb-4">
                  <div className="d-flex flex-row align-items-center">
                    <Image
                      className="service-detail-freelancer-profile-image mr-4"
                      src={
                        otherProfile.profileImageUrl ? otherProfile.profileImageUrl : DefaultAvatar
                      }
                      alt={otherProfile.name}
                    />
                    <div>
                      <h4 className="font-weight-bold mb-0">{otherProfile.name}</h4>
                      <p className="text-muted">{otherProfile.username}</p>
                    </div>
                  </div>
                </div>

                <Tabs
                  defaultActiveKey={status ? status : 'client'}
                  id="tabset"
                  className="mb-5"
                  justify
                >
                  <Tab
                    eventKey="client"
                    title="Klien"
                  >
                    <Row>
                      <div className="col-12 col-lg-8">
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
                          <h4 className="font-weight-semibold mb-3">Ulasan sebagai klien</h4>
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
                  </Tab>
                  <Tab
                    eventKey="freelancer"
                    title="Freelancer"
                  >
                    {!otherProfile.isFreelancer && (
                      <div className="card-sm mb-5">
                        <InfoBox
                          message={otherProfile.name + ' belum mendaftar menjadi freelancer.'}
                        />
                      </div>
                    )}
                    {otherProfile.isFreelancer && (
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
                                    return (
                                      <div className="chip chip-primary mr-2 mb-3">{item}</div>
                                    );
                                  })}
                              </div>
                              {skills && !skills.skills && (
                                <InfoBox
                                  message={otherProfile.name + ' belum menambahkan keahlian.'}
                                />
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
                                  message={
                                    otherProfile.name + ' belum menambahkan riwayat edukasi.'
                                  }
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
                                <InfoBox message={otherProfile.name + ' belum mengupload CV.'} />
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
                                <InfoBox
                                  message={otherProfile.name + ' belum mengupload portfolio.'}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Row>
                    )}
                  </Tab>
                </Tabs>
              </>
            )}
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AccountOtherProfile;
