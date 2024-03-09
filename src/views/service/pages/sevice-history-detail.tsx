import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs, Image, Form } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  PopUpError,
  TitleBanner,
  TransactionActivity,
} from 'shared/components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import {
  ErrorWrapper,
  TransactionInquiryClientActivityOutput,
  TransactionInquiryClientInvoiceOutput,
  TransactionInquiryDetailClientServiceOutput,
} from 'models';
import { ReviewService } from 'services';
import {
  DefaultAvatar,
  IconAddCircle,
  IconChevronLeft,
  IconClose,
  IconStar,
  logoDark,
  logoDarkLg,
} from 'images';
import { TransactionStatus } from 'enums';
import { formatCurrency } from 'utils';
import TransactionService from 'services/transaction.service';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';

const ServiceHistoryDetail: React.FC = () => {
  const params = useParams<{ transactionId: string }>();
  const history = useHistory();
  const location = useLocation();
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  // #region status = 2, 3, 4, 5, 7, 8, 9
  const {
    data: transactionDetail,
    isLoading: isLoadingTransactionDetail,
    isFetching: isFetchingTransactionDetail,
    refetch: refetchTransactionDetail,
    error: errorTransactionDetail,
  } = useQuery<TransactionInquiryDetailClientServiceOutput, ErrorWrapper>(
    ['inquiry-client-service-transaction-detail', params.transactionId],
    async () =>
      await TransactionService.inquiryClientServiceTransactionDetail(params.transactionId),
    {
      onSuccess: (response) => {
        setTransactionStatus(response.transactionDetail.status);
        mutateClientActivity();
      },
    },
  );

  const {
    data: clientInvoice,
    isLoading: isLoadingClientInvoice,
    isFetching: isFetchingClientInvoice,
    refetch: refetchClientInvoice,
    error: errorClientInvoice,
  } = useQuery<TransactionInquiryClientInvoiceOutput, ErrorWrapper>(
    ['inquiry-client-invoice', params.transactionId],
    async () => await TransactionService.inquiryClientInvoice(params.transactionId),
  );

  const {
    data: clientActivity,
    isLoading: isLoadingClientActivity,
    mutate: mutateClientActivity,
    error: errorClientActivity,
  } = useMutation<TransactionInquiryClientActivityOutput, ErrorWrapper>(
    ['inquiry-client-activity', params.transactionId],
    async () => await TransactionService.inquiryClientActivity(params.transactionId),
  );

  const [modalReview, setModalReview] = useState<boolean>(false);
  const [ratingAmount, setRatingAmount] = useState<number>(0);
  const [review, setReview] = useState<string>();
  const [serviceToReview, setServiceToReview] = useState<{
    name: string;
    transactionId: string;
  }>({
    name: '',
    transactionId: '',
  });

  const openModalReview = (name: string, transactionId: string) => {
    setServiceToReview({
      name: name ? name : '',
      transactionId: transactionId ? transactionId : '',
    });
    setModalReview(true);
  };

  const {
    register: registerReview,
    errors: errorsReview,
    formState: formStateReview,
    handleSubmit: handleSubmitReview,
  } = useForm({
    mode: 'onChange',
  });

  const confirmSubmitReview = (formData: any) => {
    setReview(formData.review);
    mutateReviewService();
  };

  const {
    isLoading: isLoadingReviewService,
    mutate: mutateReviewService,
    error: errorReviewService,
  } = useMutation<{}, ErrorWrapper>(
    ['review-service'],
    async () =>
      await ReviewService.reviewService({
        transactionId: serviceToReview?.transactionId,
        star: ratingAmount,
        description: review,
      }),
    {
      onSuccess: () => {
        setModalReview(false);
        setRatingAmount(0);
        refetchTransactionDetail();
      },
    },
  );

  const [modalReturn, setModalReturn] = useState<boolean>(false);
  const [returnMessage, setReturnMessage] = useState<string>('');

  const openModalReturn = () => {
    setModalReturn(true);
  };

  const {
    register: registerReturn,
    errors: errorsReturn,
    formState: formStateReturn,
    handleSubmit: handleSubmitReturn,
    formState: { isValid: isValidReturn },
  } = useForm({
    mode: 'onChange',
  });

  const confirmSubmitReturn = (formData: any) => {
    setReturnMessage(formData.returnMessage);
    mutateAskReturn();
  };

  const {
    isLoading: isLoadingAskReturn,
    mutate: mutateAskReturn,
    error: errorAskReturn,
  } = useMutation<{}, ErrorWrapper>(
    ['ask-return'],
    async () =>
      await TransactionService.askReturn({
        transactionId: params.transactionId,
        message: returnMessage,
      }),
    {
      onSuccess: () => {
        setModalReturn(false);
        setReturnMessage('');
        refetchTransactionDetail();
      },
    },
  );

  const [activityMessage, setActivityMessage] = useState<string>('');

  const {
    register: registerMessage,
    errors: errorsMessage,
    formState: formStateMessage,
    handleSubmit: handleSubmitMessage,
    formState: { isValid: isValidMessage },
  } = useForm({
    mode: 'onChange',
  });

  const confirmSubmitMessage = (formData: any) => {
    setActivityMessage(formData.activityMessage);
    mutateSendMessage();
  };

  const {
    isLoading: isLoadingSendMessage,
    mutate: mutateSendMessage,
    error: errorSendMessage,
  } = useMutation<{}, ErrorWrapper>(
    ['send-message'],
    async () =>
      await TransactionService.sendMessage({
        transactionId: params.transactionId,
        message: activityMessage,
      }),
    {
      onSuccess: () => {
        setActivityMessage('');
        refetchTransactionDetail();
      },
    },
  );

  const [addFileData, setAddFileData] = useState<any>();

  const confirmAddFile = () => {
    mutateAddFile();
  };

  const handleUploadAddFile = (e: any) => {
    if (e.target.files.length !== 0) {
      const addFile = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setAddFileData(addFile);
    }
  };

  const uploadAddFile = () => {
    document.getElementById('selectAddFile')?.click();
  };

  const {
    isLoading: isLoadingAddFile,
    mutate: mutateAddFile,
    error: errorAddFile,
  } = useMutation<{}, ErrorWrapper>(
    ['send-additional-file'],
    async () =>
      await TransactionService.sendAdditionalFile({
        additionalFile: addFileData.data,
        transactionId: params.transactionId,
      }),
    {
      onSuccess: () => {
        setAddFileData(null);
        refetchTransactionDetail();
      },
    },
  );
  // #endregion

  const openFreelancerProfile = (id: string) => {
    history.push({
      pathname: '/account/profile/' + id,
      state: {
        status: 'freelancer',
        prevPath: location.pathname,
        transactionId: params.transactionId,
      },
    });
  };

  return (
    <>
      {modalReview && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-review"
        >
          {isLoadingReviewService && <Loader type="inline" />}
          {!isLoadingReviewService && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Beri ulasan</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalReview(false);
                      setRatingAmount(0);
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorReviewService && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorReviewService?.message}
                      type="danger"
                    />
                  </div>
                )}

                <h4 className="font-weight-semibold mb-4">{serviceToReview?.name}</h4>

                <div className="flex-centered mb-4">
                  <div
                    className={
                      'cursor-pointer ' + (ratingAmount < 1 ? 'text-muted ' : 'text-warning')
                    }
                    onClick={() => {
                      setRatingAmount(1);
                    }}
                  >
                    <IconStar />
                  </div>
                  <div
                    className={
                      'cursor-pointer ' + (ratingAmount < 2 ? 'text-muted ' : 'text-warning')
                    }
                    onClick={() => {
                      setRatingAmount(2);
                    }}
                  >
                    <IconStar />
                  </div>
                  <div
                    className={
                      'cursor-pointer ' + (ratingAmount < 3 ? 'text-muted ' : 'text-warning')
                    }
                    onClick={() => {
                      setRatingAmount(3);
                    }}
                  >
                    <IconStar />
                  </div>
                  <div
                    className={
                      'cursor-pointer ' + (ratingAmount < 4 ? 'text-muted ' : 'text-warning')
                    }
                    onClick={() => {
                      setRatingAmount(4);
                    }}
                  >
                    <IconStar />
                  </div>
                  <div
                    className={
                      'cursor-pointer ' + (ratingAmount < 5 ? 'text-muted ' : 'text-warning')
                    }
                    onClick={() => {
                      setRatingAmount(5);
                    }}
                  >
                    <IconStar />
                  </div>
                </div>

                <form onSubmit={handleSubmitReview(confirmSubmitReview)}>
                  <div className="mb-4">
                    <p className="mb-2">Ceritakan pengalamanmu menggunakan layanan ini!</p>
                    <FormInput errorMessage={errorsReview?.review?.message}>
                      <Form.Control
                        as="textarea"
                        id="review"
                        name="review"
                        className="review-text-area"
                        isInvalid={formStateReview.touched.review === true && !!errorsReview.review}
                        ref={registerReview() as string & ((ref: Element | null) => void)}
                      ></Form.Control>
                    </FormInput>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={ratingAmount === 0}
                  >
                    Kirim
                  </button>
                </form>
              </div>
            </>
          )}
        </Popup>
      )}
      {isLoadingSendMessage && <Loader type="fixed" />}
      {errorSendMessage && <PopUpError message={errorSendMessage.message} />}
      {isLoadingAddFile && <Loader type="fixed" />}
      {errorAddFile && <PopUpError message={errorAddFile.message} />}
      {modalReturn && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingAskReturn && <Loader type="inline" />}
          {!isLoadingAskReturn && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Ajukan pengembalian</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalReturn(false);
                      setReturnMessage('');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorAskReturn && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorAskReturn?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={`Anda hanya dapat mengajukan pengembalian <b>1 kali</b> saja!`}
                    type="warning"
                  />
                </div>

                <form onSubmit={handleSubmitReturn(confirmSubmitReturn)}>
                  <div className="mb-4">
                    <p className="mb-2">Berikan alasan kamu membatalkan pesanan ini!</p>
                    <FormInput errorMessage={errorsReturn?.returnMessage?.message}>
                      <Form.Control
                        as="textarea"
                        id="returnMessage"
                        name="returnMessage"
                        className="activity-popup-text-area"
                        isInvalid={
                          formStateReturn.touched.returnMessage === true &&
                          !!errorsReturn.returnMessage
                        }
                        ref={
                          registerReturn({
                            required: {
                              value: true,
                              message: 'Pesan tidak boleh kosong.',
                            },
                          }) as string & ((ref: Element | null) => void)
                        }
                      ></Form.Control>
                    </FormInput>
                  </div>

                  <Row>
                    <div className="col-12 col-md-6">
                      <div
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setModalReturn(false);
                          setReturnMessage('');
                        }}
                      >
                        Kembali
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                      <button
                        type="submit"
                        className="btn btn-danger w-100"
                        disabled={!isValidReturn}
                      >
                        Lanjut
                      </button>
                    </div>
                  </Row>
                </form>
              </div>
            </>
          )}
        </Popup>
      )}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Detail Riwayat Layanan'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div
              className="text-primary-dark flex-centered justify-content-start cursor-pointer mb-4"
              onClick={() => {
                history.push('/service/history');
              }}
            >
              <div className="mr-3">
                <IconChevronLeft />
              </div>
              <p className="cursor-pointer">Kembali</p>
            </div>
            <Tabs
              id="tabset"
              className="mb-5"
              justify
            >
              <Tab
                eventKey="activity"
                title="Aktivitas"
              >
                {(isLoadingTransactionDetail || isFetchingTransactionDetail) && (
                  <Loader type="inline" />
                )}
                {!(isLoadingTransactionDetail || isFetchingTransactionDetail) && (
                  <>
                    {errorTransactionDetail && (
                      <InlineRetryError
                        message={errorTransactionDetail.message}
                        onRetry={refetchTransactionDetail}
                      />
                    )}
                    {transactionDetail && (
                      <Row>
                        <div className="col-12 col-xl-8 order-last order-xl-first">
                          {isLoadingClientActivity && <Loader type="inline" />}
                          {!isLoadingClientActivity && (
                            <>
                              {errorClientActivity && (
                                <InlineRetryError
                                  message={errorClientActivity.message}
                                  onRetry={mutateClientActivity}
                                />
                              )}
                              {clientActivity && (
                                <>
                                  <div className="mb-5">
                                    {clientActivity.activity.map((activity) => {
                                      return (
                                        <TransactionActivity
                                          userType="client"
                                          projectType="service"
                                          activity={activity}
                                          transactionId={params.transactionId}
                                          refetchTransaction={refetchTransactionDetail}
                                        />
                                      );
                                    })}
                                  </div>
                                  {transactionStatus === TransactionStatus.DalamProses && (
                                    <div className="mb-5">
                                      {addFileData && (
                                        <div className="card-sm d-flex flex-row align-items-center justify-content-between mb-4">
                                          <h4 className="text-primary-dark font-weight-bold mb-0">
                                            {addFileData.data.name}
                                          </h4>
                                        </div>
                                      )}
                                      <div
                                        className="cursor-pointer mb-4"
                                        onClick={uploadAddFile}
                                      >
                                        <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                                          <h4 className="text-primary-dark font-weight-bold mb-0 mr-2">
                                            Tambahkan File Pendukung
                                          </h4>
                                          <div className="text-primary-dark">
                                            <IconAddCircle />
                                          </div>
                                        </div>
                                      </div>
                                      <input
                                        hidden
                                        id="selectAddFile"
                                        type="file"
                                        onChange={handleUploadAddFile}
                                      />
                                      <Row className="justify-content-end">
                                        <div className="col-12 col-md-6">
                                          <button
                                            className="btn btn-primary w-100"
                                            onClick={confirmAddFile}
                                            disabled={!addFileData}
                                          >
                                            Kirim
                                          </button>
                                        </div>
                                      </Row>
                                    </div>
                                  )}
                                  {(transactionStatus === TransactionStatus.DalamInvestigasi ||
                                    transactionStatus === TransactionStatus.DalamProses ||
                                    transactionStatus ===
                                      TransactionStatus.DalamProsesPengembalian ||
                                    transactionStatus === TransactionStatus.SudahDikirim) && (
                                    <div className="mb-5">
                                      <h4 className="font-weight-semibold mb-4">Kirim Pesan</h4>
                                      <form onSubmit={handleSubmitMessage(confirmSubmitMessage)}>
                                        <div className="mb-4">
                                          <FormInput
                                            errorMessage={errorsMessage?.activityMessage?.message}
                                          >
                                            <Form.Control
                                              as="textarea"
                                              id="activityMessage"
                                              name="activityMessage"
                                              className="activity-message-text-area"
                                              isInvalid={
                                                formStateMessage.touched.activityMessage === true &&
                                                !!errorsMessage.activityMessage
                                              }
                                              ref={
                                                registerMessage({
                                                  required: {
                                                    value: true,
                                                    message: 'Pesan tidak boleh kosong.',
                                                  },
                                                }) as string & ((ref: Element | null) => void)
                                              }
                                            ></Form.Control>
                                          </FormInput>
                                        </div>

                                        <Row className="justify-content-end">
                                          <div className="col-12 col-md-6">
                                            <button
                                              type="submit"
                                              className="btn btn-primary w-100"
                                              disabled={!isValidMessage}
                                            >
                                              Kirim
                                            </button>
                                          </div>
                                        </Row>
                                      </form>
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div className="col-12 col-xl-4">
                          <div className="card-sm mb-5">
                            <h4 className="font-weight-semibold mb-3">
                              {transactionDetail.transactionDetail.serviceDetail.name}
                            </h4>
                            {transactionStatus === TransactionStatus.DalamProses && (
                              <div className="chip chip-warning text-nowrap mb-3">Dalam Proses</div>
                            )}
                            {transactionStatus === TransactionStatus.SudahDikirim && (
                              <div className="chip chip-success text-nowrap mb-3">
                                Sudah Dikirim
                              </div>
                            )}
                            {transactionStatus === TransactionStatus.Selesai && (
                              <div className="chip chip-success text-nowrap mb-3">Selesai</div>
                            )}
                            {transactionStatus === TransactionStatus.DalamProsesPengembalian && (
                              <div className="chip chip-danger text-nowrap mb-3">
                                Dalam Proses Pengembalian
                              </div>
                            )}
                            {transactionStatus === TransactionStatus.DalamInvestigasi && (
                              <div className="chip chip-danger text-nowrap mb-3">
                                Dalam Investigasi
                              </div>
                            )}
                            {transactionStatus === TransactionStatus.Telat && (
                              <div className="chip chip-danger text-nowrap mb-3">Telat</div>
                            )}
                            {transactionStatus === TransactionStatus.Dibatalkan && (
                              <div className="chip chip-danger text-nowrap mb-3">Dibatalkan</div>
                            )}
                            <p className="mb-2">Deadline Pengerjaan:</p>
                            <p className="text-primary-dark font-weight-semibold mb-3">
                              {transactionDetail.transactionDetail.serviceDetail.dueDate}
                            </p>
                            <p className="mb-2">Tanggal Pengiriman:</p>
                            <p className="text-primary-dark font-weight-semibold mb-3">
                              {transactionDetail.transactionDetail.deliveryDate
                                ? transactionDetail.transactionDetail.deliveryDate
                                : '-'}
                            </p>
                            <div className="d-flex flex-row flex-wrap mb-3">
                              {transactionDetail.transactionDetail.serviceDetail.tags.map((tag) => (
                                <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                              ))}
                            </div>
                            <div className="d-flex flex-row align-items-center mb-3">
                              <div className="text-warning mr-1">
                                <IconStar />
                              </div>
                              <small className="text-grey font-weight-bold">
                                {transactionDetail.transactionDetail.averageRating}/5
                              </small>
                              <small className="text-muted">
                                ({transactionDetail.transactionDetail.ratingAmount})
                              </small>
                            </div>
                            <h3 className="text-primary-dark text-nowrap mb-4">
                              Rp{' '}
                              {formatCurrency(
                                transactionDetail.transactionDetail.serviceDetail.price,
                              )}
                            </h3>
                            {!transactionDetail.transactionDetail.hasReturned &&
                              (transactionStatus === TransactionStatus.DalamProses ||
                                transactionStatus === TransactionStatus.SudahDikirim) && (
                                <div
                                  className="btn btn-danger"
                                  onClick={openModalReturn}
                                >
                                  Ajukan Pengembalian
                                </div>
                              )}
                          </div>
                          <div className="mb-5">
                            <h4 className="font-weight-semibold mb-3">Freelancer</h4>
                            <div className="card-sm">
                              <Image
                                className="owned-task-detail-freelancer-profile-image mb-3"
                                src={
                                  transactionDetail.transactionDetail.freelancer.profileImageUrl
                                    ? transactionDetail.transactionDetail.freelancer.profileImageUrl
                                    : DefaultAvatar
                                }
                                alt={transactionDetail.transactionDetail.freelancer.name}
                              />
                              <h4 className="font-weight-semibold">
                                {transactionDetail.transactionDetail.freelancer.name}
                              </h4>
                              <p
                                className="text-line-clamp line-10 mb-3"
                                style={{ whiteSpace: 'pre-wrap' }}
                              >
                                {transactionDetail.transactionDetail.freelancer.description}
                              </p>
                              <div
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  openFreelancerProfile(
                                    transactionDetail.transactionDetail.freelancer.id,
                                  );
                                }}
                              >
                                Lihat Profil
                              </div>
                            </div>
                          </div>
                          {transactionStatus === TransactionStatus.Selesai &&
                            !transactionDetail.transactionDetail.isReviewed && (
                              <div
                                className="btn btn-outline-primary mb-5"
                                onClick={() => {
                                  openModalReview(
                                    transactionDetail.transactionDetail.serviceDetail.name,
                                    params.transactionId,
                                  );
                                }}
                              >
                                Beri Ulasan
                              </div>
                            )}
                          {transactionStatus === TransactionStatus.Selesai &&
                            transactionDetail.transactionDetail.isReviewed && (
                              <div className="mb-5">
                                <h4 className="font-weight-semibold">Ulasan anda </h4>
                                <div className="card-sm">
                                  <div className="d-flex flex-row mb-4">
                                    {Array(transactionDetail.transactionDetail.review?.amount)
                                      .fill(null)
                                      .map(() => {
                                        return (
                                          <div className="text-warning">
                                            <IconStar />
                                          </div>
                                        );
                                      })}
                                  </div>
                                  {transactionDetail.transactionDetail.review?.description && (
                                    <p>{transactionDetail.transactionDetail.review?.description}</p>
                                  )}
                                  {!transactionDetail.transactionDetail.review?.description && (
                                    <p>Tidak ada deskripsi.</p>
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </Row>
                    )}
                  </>
                )}
              </Tab>

              <Tab
                eventKey="payment"
                title="Bukti Pembayaran"
              >
                {(isLoadingClientInvoice || isFetchingClientInvoice) && <Loader type="inline" />}
                {!(isLoadingClientInvoice || isFetchingClientInvoice) && (
                  <>
                    {errorClientInvoice && (
                      <InlineRetryError
                        message={errorClientInvoice.message}
                        onRetry={refetchClientInvoice}
                      />
                    )}
                    {clientInvoice && (
                      <div className="card-sm mb-5 invoice-container">
                        <Row className="align-items-center mb-4 mb-lg-5">
                          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                            <Image
                              className="flex-centered d-lg-block d-none"
                              src={logoDarkLg}
                              alt="logo"
                            />
                            <Image
                              className="flex-centered d-block d-lg-none"
                              src={logoDark}
                              alt="logo"
                            />
                          </div>
                          <div className="text-lg-right col-12 col-lg-6">
                            <p>Nomor Pemesanan</p>
                            <p className="font-weight-bold">#{clientInvoice.refNo.toUpperCase()}</p>
                          </div>
                        </Row>
                        <Row className="mb-4">
                          <div className="col-12">
                            <h3 className="mb-0">Bukti Pembayaran</h3>
                          </div>
                        </Row>
                        <Row className="mb-3">
                          <div className="col-12 col-lg-6">
                            <Row>
                              <h4 className="font-weight-semibold col-12 col-lg-4">Klien</h4>
                              <p className="col-12 col-lg-8">{clientInvoice.clientName}</p>
                            </Row>
                          </div>
                        </Row>
                        <Row className="mb-4">
                          <div className="col-12">
                            <Row>
                              <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                                <Row>
                                  <h4 className="font-weight-semibold col-12 col-lg-4">
                                    Freelancer
                                  </h4>
                                  <p className="col-12 col-lg-8">{clientInvoice.freelancerName}</p>
                                </Row>
                              </div>
                              <div className="col-12 col-lg-6">
                                <Row>
                                  <h4 className="font-weight-semibold col-12 col-lg-5 text-lg-right">
                                    Tanggal Pemesanan
                                  </h4>
                                  <p className="col-12 col-lg-7 text-lg-right">
                                    {clientInvoice.paymentDate}
                                  </p>
                                </Row>
                              </div>
                            </Row>
                          </div>
                        </Row>
                        <hr />
                        <Row className="my-4">
                          <div className="col-12 col-lg-8 mb-3 mb-lg-0">
                            <h4 className="font-weight-semibold">Layanan</h4>
                            <p className="font-weight-bold">{clientInvoice.project.name}</p>
                            <p className="text-grey">
                              Jumlah Revisi: {clientInvoice.project.revisionCount}
                            </p>
                            <div>
                              {clientInvoice.project.additionalData?.map((data) => (
                                <p className="text-grey">- {data.title}</p>
                              ))}
                            </div>
                          </div>
                          <div className="col-12 col-lg-2 mb-3 mb-lg-0">
                            <h4 className="font-weight-semibold">Durasi</h4>
                            <p>{clientInvoice.project.duration} hari</p>
                          </div>
                          <div className="col-12 col-lg-2">
                            <h4 className="font-weight-semibold">Harga</h4>
                            <p>Rp {formatCurrency(clientInvoice.project.price)}</p>
                          </div>
                        </Row>
                        <hr />
                        <Row className="my-4">
                          <div className="col-12 col-lg-10">
                            <h4 className="font-weight-semibold">
                              Fee Platform ({clientInvoice.fee.percentage}%)
                            </h4>
                          </div>
                          <div className="col-12 col-lg-2">
                            <p>Rp {formatCurrency(clientInvoice.fee.amount)}</p>
                          </div>
                        </Row>
                        <Row>
                          <div className="col-12 col-lg-10">
                            <h4 className="font-weight-semibold">Total</h4>
                          </div>
                          <div className="col-12 col-lg-2">
                            <p className="font-weight-bold">
                              Rp {formatCurrency(clientInvoice.totalPrice)}
                            </p>
                          </div>
                        </Row>
                      </div>
                    )}
                  </>
                )}
              </Tab>
            </Tabs>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ServiceHistoryDetail;
