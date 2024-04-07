import {
  ErrorWrapper,
  ServiceGenerateTokenOutput,
  ServiceInquiryServiceDetailOutput,
  TransactionSendFeedbackOutput,
} from 'models';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ServiceService } from 'services';
import { Image, Row } from 'react-bootstrap';

import {
  Footer,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  PopUpError,
  TitleBanner,
} from 'shared/components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  DefaultAvatar,
  IconCheckmarkCircle,
  IconChevronLeft,
  IconCrossCircle,
  IconStar,
} from 'images';
import { getLocalStorage, setLocalStorage } from 'utils';
import TransactionService from 'services/transaction.service';
import { Midtrans } from 'enums';

declare global {
  interface Window {
    snap: any;
  }
}

const ServiceDetail: React.FC = ({ prevPath }: any) => {
  const params = useParams<{ serviceId: string }>();
  const history = useHistory();
  const location = useLocation();
  const [paymentId, setPaymentId] = useState('');
  const {
    data: serviceDetail,
    isLoading: isLoadingServiceDetail,
    refetch: refetchServiceDetail,
    error: errorServiceDetail,
  } = useQuery<ServiceInquiryServiceDetailOutput, ErrorWrapper>(
    ['inquiry-service-detail', params.serviceId],
    async () => await ServiceService.inquiryServiceDetail(params.serviceId),
  );

  useEffect(() => {
    document.body.scrollTo(0, 0);
    const midtransUrl = Midtrans.URL;

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransUrl;

    const midtransClientkey = Midtrans.ClientKey;
    scriptTag.setAttribute('data-client-key', midtransClientkey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const openProfile = (id: string) => {
    history.push({
      pathname: '/account/profile/' + id,
      state: {
        status: 'freelancer',
        prevPath: location.pathname,
      },
    });
  };

  const buyService = () => {
    if (!getLocalStorage('token')) {
      history.push({
        pathname: '/auth/login',
      });
    } else if (getLocalStorage('status') === 'freelancer') {
      setLocalStorage('status', 'client');
      mutateToken();
    } else {
      mutateToken();
    }
  };

  const {
    data: token,
    isLoading: isLoadingToken,
    mutate: mutateToken,
    error: errorToken,
  } = useMutation<ServiceGenerateTokenOutput, ErrorWrapper>(
    ['inquiry-service-token', params.serviceId],
    async () => await ServiceService.generateToken(params.serviceId),
    {
      onSuccess: (result) => {
        window.snap.pay(result.token, {
          onSuccess: () => {
            setPaymentId(result.paymentId);
            mutateSendFeedback();
          },
          onError: (error: any) => {
            console.log(error);
          },
          onClose: () => {
            console.log('Kamu belum menyelesaikan pembayaran!');
          },
        });
      },
    },
  );

  const {
    data: feedbackData,
    isLoading: isLoadingFeedbackData,
    mutate: mutateSendFeedback,
    error: errorSendFeedback,
  } = useMutation<TransactionSendFeedbackOutput, ErrorWrapper>(
    ['send-feedback', paymentId],
    async () => await TransactionService.sendFeedback(paymentId),
    {
      onSuccess: (result) => {
        history.push({
          pathname: '/service/requirement/' + result.transactionId,
        });
      },
    },
  );

  return (
    <>
      {errorToken && <PopUpError message={errorToken.message} />}
      {isLoadingToken && <Loader type="fixed" />}
      {errorSendFeedback && <PopUpError message={errorSendFeedback.message} />}
      {isLoadingFeedbackData && <Loader type="fixed" />}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Detail Layanan'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div
              className="text-primary-dark flex-centered justify-content-start cursor-pointer mb-4"
              onClick={() => {
                history.push(prevPath ? prevPath : '/service/search');
              }}
            >
              <div className="mr-3">
                <IconChevronLeft />
              </div>
              <p className="cursor-pointer">Kembali</p>
            </div>
            {isLoadingServiceDetail && <Loader type="inline" />}
            {errorServiceDetail && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorServiceDetail.message}
                  onRetry={refetchServiceDetail}
                />
              </div>
            )}
            {serviceDetail && (
              <>
                <div className="d-flex flex-row overflow-auto mb-5">
                  {serviceDetail.serviceDetail.imageUrl.map((image) => {
                    return (
                      <div className="py-3">
                        <Image
                          className="service-detail-image mr-4"
                          src={image}
                          alt="imageService"
                        />
                      </div>
                    );
                  })}
                </div>
                <Row className="mb-5">
                  <div className="col-12 col-lg-8">
                    <div>
                      <h3 className="mb-3">{serviceDetail.serviceDetail.name}</h3>
                      <div className="d-flex flex-row flex-wrap">
                        {serviceDetail.serviceDetail.tags.map((tag) => {
                          return (
                            <div
                              key={tag}
                              className="chip chip-primary mr-2 mb-3"
                            >
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-grey mb-5">
                        Pengerjaan dalam waktu {serviceDetail.serviceDetail.workingTime} hari
                      </p>
                      <div className="card-sm mb-5 d-block d-lg-none">
                        <div className="d-flex flex-row justify-content-between mb-3">
                          <p className="text-grey">Waktu Pengerjaan</p>
                          <p className="font-weight-semibold text-grey">
                            {serviceDetail.serviceDetail.workingTime} hari
                          </p>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-3">
                          <p className="text-grey">Jumlah Revisi</p>
                          <p className="font-weight-semibold text-grey">
                            {serviceDetail.serviceDetail.revisionCount}
                          </p>
                        </div>
                        {serviceDetail.serviceDetail.additionalInfo.map((info) => {
                          return (
                            <div className="d-flex flex-row justify-content-between mb-3">
                              <p className="text-grey">{info.title}</p>
                              {info.isSupported && (
                                <div className="text-primary-dark">
                                  <IconCheckmarkCircle />
                                </div>
                              )}
                              {!info.isSupported && (
                                <div className="text-danger">
                                  <IconCrossCircle />
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <div className="d-flex justify-content-end">
                          <h3 className="text-primary-dark mb-3">
                            Rp {serviceDetail.serviceDetail.price}
                          </h3>
                        </div>
                        {serviceDetail.freelancer.id !== getLocalStorage('id') && (
                          <div
                            className="btn btn-primary w-100"
                            onClick={buyService}
                          >
                            Beli Layanan
                          </div>
                        )}
                        {serviceDetail.freelancer.id === getLocalStorage('id') && (
                          <button
                            disabled
                            className="btn btn-primary w-100"
                          >
                            Layanan Kamu
                          </button>
                        )}
                      </div>
                      <h4 className="font-weight-semibold mb-3">Deskripsi Layanan</h4>
                      <p
                        className="mb-5"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {serviceDetail.serviceDetail.description}
                      </p>
                    </div>

                    <div className="mb-5 mb-lg-0">
                      <h4 className="font-weight-semibold mb-3">Freelancer</h4>
                      <div className="card-sm">
                        <div className="d-flex flex-row mb-4">
                          <Image
                            className="service-detail-freelancer-profile-image mr-4"
                            src={
                              serviceDetail.freelancer.profileImageUrl
                                ? serviceDetail.freelancer.profileImageUrl
                                : DefaultAvatar
                            }
                            alt={serviceDetail.freelancer.name}
                          />
                          <div>
                            <h4 className="font-weight-semibold">
                              {serviceDetail.freelancer.name}
                            </h4>
                            <p
                              className="text-line-clamp line-4"
                              style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {serviceDetail.freelancer.description}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <div
                            className="btn btn-primary"
                            onClick={() => {
                              openProfile(serviceDetail.freelancer.id);
                            }}
                          >
                            Lihat Profil
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-4">
                    <div className="card-sm mb-5 d-none d-lg-block">
                      <div className="d-flex flex-row justify-content-between mb-3">
                        <p className="text-grey">Waktu Pengerjaan</p>
                        <p className="font-weight-semibold text-grey">
                          {serviceDetail.serviceDetail.workingTime} hari
                        </p>
                      </div>
                      <div className="d-flex flex-row justify-content-between mb-3">
                        <p className="text-grey">Jumlah Revisi</p>
                        <p className="font-weight-semibold text-grey">
                          {serviceDetail.serviceDetail.revisionCount}
                        </p>
                      </div>
                      {serviceDetail.serviceDetail.additionalInfo.map((info) => {
                        return (
                          <div className="d-flex flex-row justify-content-between mb-3">
                            <p className="text-grey">{info.title}</p>
                            {info.isSupported && (
                              <div className="text-primary-dark">
                                <IconCheckmarkCircle />
                              </div>
                            )}
                            {!info.isSupported && (
                              <div className="text-danger">
                                <IconCrossCircle />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <div className="d-flex justify-content-end">
                        <h3 className="text-primary-dark mb-3">
                          Rp {serviceDetail.serviceDetail.price}
                        </h3>
                      </div>
                      {serviceDetail.freelancer.id !== getLocalStorage('id') && (
                        <div
                          className="btn btn-primary w-100"
                          onClick={buyService}
                        >
                          Beli Layanan
                        </div>
                      )}
                      {serviceDetail.freelancer.id === getLocalStorage('id') && (
                        <button
                          disabled
                          className="btn btn-primary w-100"
                        >
                          Layanan Kamu
                        </button>
                      )}
                    </div>

                    <div>
                      <h4 className="font-weight-semibold mb-3">Ulasan</h4>
                      <div className="card-sm">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-row align-items-center">
                            <h2 className="mr-2 mb-0">{serviceDetail.review.averageRating}</h2>
                            <div className="text-warning">
                              <IconStar />
                            </div>
                          </div>
                          <p>{serviceDetail.review.ratingAmount} ulasan</p>
                        </div>
                        <hr />
                        <div
                          className="overflow-auto"
                          style={serviceDetail.review.reviewList ? { maxHeight: '40rem' } : {}}
                        >
                          {serviceDetail.review.reviewList?.map((review) => {
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
                                <small className="d-block text-muted">{review.timestamp}</small>
                              </div>
                            );
                          })}
                          {!serviceDetail.review.reviewList && (
                            <InfoBox message={'Belum ada review'} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </>
            )}
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetail;
