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
  TaskInquiryTaskHistoryDetailOutput,
  TransactionInquiryDetailFreelancerTaskOutput,
  TransactionInquiryFreelancerActivityOutput,
  TransactionInquiryFreelancerInvoiceOutput,
} from 'models';
import { ReviewService, TaskService } from 'services';
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

const TaskHistoryDetail: React.FC = ({ transactionId }: any) => {
  const params = useParams<{ taskId: string }>();
  const history = useHistory();
  const location = useLocation();
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  // #region status = 1 / 10
  const {
    data: taskDetail,
    isLoading: isLoadingTaskDetail,
    isFetching: isFetchingTaskDetail,
    refetch: refetchTaskDetail,
    error: errorTaskDetail,
  } = useQuery<TaskInquiryTaskHistoryDetailOutput, ErrorWrapper>(
    ['inquiry-task-history-detail', params.taskId],
    async () => await TaskService.inquiryTaskHistoryDetail(params.taskId),
    {
      enabled: !transactionId,
      onSuccess: (response) => {
        setTransactionStatus(response.taskDetail.status);
      },
    },
  );
  // #endregion

  // #region status = 2, 3, 4, 5, 7, 8, 9
  const {
    data: transactionDetail,
    isLoading: isLoadingTransactionDetail,
    isFetching: isFetchingTransactionDetail,
    refetch: refetchTransactionDetail,
    error: errorTransactionDetail,
  } = useQuery<TransactionInquiryDetailFreelancerTaskOutput, ErrorWrapper>(
    ['inquiry-freelancer-task-transaction-detail', transactionId],
    async () => await TransactionService.inquiryFreelancerTaskTransactionDetail(transactionId),
    {
      enabled: !!transactionId,
      onSuccess: (response) => {
        setTransactionStatus(response.transactionDetail.status);
        mutateFreelancerActivity();
      },
    },
  );

  const {
    data: freelancerInvoice,
    isLoading: isLoadingFreelancerInvoice,
    isFetching: isFetchingFreelancerInvoice,
    refetch: refetchFreelancerInvoice,
    error: errorFreelancerInvoice,
  } = useQuery<TransactionInquiryFreelancerInvoiceOutput, ErrorWrapper>(
    ['inquiry-freelancer-invoice', transactionId],
    async () => await TransactionService.inquiryFreelancerInvoice(transactionId),
    {
      enabled: !!transactionId,
    },
  );

  const {
    data: freelancerActivity,
    isLoading: isLoadingFreelancerActivity,
    mutate: mutateFreelancerActivity,
    error: errorFreelancerActivity,
  } = useMutation<TransactionInquiryFreelancerActivityOutput, ErrorWrapper>(
    ['inquiry-freelancer-activity', transactionId],
    async () => await TransactionService.inquiryFreelancerActivity(transactionId),
  );

  const [modalReview, setModalReview] = useState<boolean>(false);
  const [ratingAmount, setRatingAmount] = useState<number>(0);
  const [review, setReview] = useState<string>();
  const [clientToReview, setClientToReview] = useState<{
    name: string;
    transactionId: string;
  }>({
    name: '',
    transactionId: '',
  });

  const openModalReview = (name: string, transactionId: string) => {
    setClientToReview({
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
    mutateReviewClient();
  };

  const {
    isLoading: isLoadingReviewClient,
    mutate: mutateReviewClient,
    error: errorReviewClient,
  } = useMutation<{}, ErrorWrapper>(
    ['review-client'],
    async () =>
      await ReviewService.reviewClient({
        transactionId: clientToReview?.transactionId,
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

  const [modalCancel, setModalCancel] = useState<boolean>(false);
  const [cancelMessage, setCancelMessage] = useState<string>('');

  const openModalCancel = () => {
    setModalCancel(true);
  };

  const {
    register: registerCancel,
    errors: errorsCancel,
    formState: formStateCancel,
    handleSubmit: handleSubmitCancel,
    formState: { isValid: isValidCancel },
  } = useForm({
    mode: 'onChange',
  });

  const confirmSubmitCancel = (formData: any) => {
    setCancelMessage(formData.cancelMessage);
    mutateAskCancel();
  };

  const {
    isLoading: isLoadingAskCancel,
    mutate: mutateAskCancel,
    error: errorAskCancel,
  } = useMutation<{}, ErrorWrapper>(
    ['ask-cancel'],
    async () =>
      await TransactionService.askCancel({
        transactionId: transactionId,
        message: cancelMessage,
      }),
    {
      onSuccess: () => {
        setModalCancel(false);
        setCancelMessage('');
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
        transactionId: transactionId,
        message: activityMessage,
      }),
    {
      onSuccess: () => {
        setActivityMessage('');
        refetchTransactionDetail();
      },
    },
  );

  const [resultData, setResultData] = useState<any[]>([]);
  const [errorExceedResult, setErrorExceedResult] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');

  const {
    register: registerResultMessage,
    errors: errorsResultMessage,
    formState: formStateResultMessage,
    handleSubmit: handleSubmitResultMessage,
    formState: { isValid: isValidResultMessage },
  } = useForm({
    mode: 'onChange',
  });

  const confirmSendResult = (formData: any) => {
    setResultMessage(formData.resultMessage);
    mutateSendResult();
  };

  const handleUploadSendResult = (e: any) => {
    if (e.target.files.length !== 0) {
      const addFile = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      if (resultData.length <= 2) {
        setResultData((item: any) => [...item, addFile]);
      } else {
        setErrorExceedResult(true);
      }
    }
    e.target.value = '';
  };

  const uploadResult = () => {
    document.getElementById('selectSendResult')?.click();
  };

  const removeResult = (index: number) => {
    if (resultData.length === 3) {
      setErrorExceedResult(false);
    }
    setResultData(resultData.filter((item: any, i: number) => i !== index));
  };

  const {
    isLoading: isLoadingSendResult,
    mutate: mutateSendResult,
    error: errorSendResult,
  } = useMutation<{}, ErrorWrapper>(
    ['send-result'],
    async () =>
      await TransactionService.sendResult({
        result: resultData?.map((t) => t.data),
        transactionId: transactionId,
        description: resultMessage,
      }),
    {
      onSuccess: () => {
        setResultData([]);
        setErrorExceedResult(false);
        refetchTransactionDetail();
      },
    },
  );
  // #endregion

  const openClientProfile = (id: string) => {
    history.push({
      pathname: '/account/profile/' + id,
      state: {
        status: 'client',
        prevPath: location.pathname,
        transactionId: transactionId,
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
          {isLoadingReviewClient && <Loader type="inline" />}
          {!isLoadingReviewClient && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Beri ulasan kepada</h3>
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

                {errorReviewClient && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorReviewClient?.message}
                      type="danger"
                    />
                  </div>
                )}

                <h4 className="font-weight-semibold mb-4">{clientToReview?.name}</h4>

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
                    <p className="mb-2">Ceritakan pengalamanmu bekerja dengan klien ini!</p>
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
      {isLoadingSendResult && <Loader type="fixed" />}
      {errorSendResult && <PopUpError message={errorSendResult.message} />}
      {modalCancel && (
        <Popup
          open={true}
          closeOnDocumentClick={false}
          className="popup-activity"
        >
          {isLoadingAskCancel && <Loader type="inline" />}
          {!isLoadingAskCancel && (
            <>
              <div className="flex-column">
                <div className="flex-centered w-100 justify-content-between mb-3">
                  <h3 className="mb-0">Ajukan pembatalan</h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setModalCancel(false);
                      setCancelMessage('');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                {errorAskCancel && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorAskCancel?.message}
                      type="danger"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <InfoBox
                    message={`Kamu hanya dapat mengajukan pembatalan <b>1 kali</b> saja!`}
                    type="warning"
                  />
                </div>

                <form onSubmit={handleSubmitCancel(confirmSubmitCancel)}>
                  <div className="mb-4">
                    <p className="mb-2">Berikan alasan kamu membatalkan pesanan ini!</p>
                    <FormInput errorMessage={errorsCancel?.cancelMessage?.message}>
                      <Form.Control
                        as="textarea"
                        id="cancelMessage"
                        name="cancelMessage"
                        className="activity-popup-text-area"
                        isInvalid={
                          formStateCancel.touched.cancelMessage === true &&
                          !!errorsCancel.cancelMessage
                        }
                        ref={
                          registerCancel({
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
                          setModalCancel(false);
                          setCancelMessage('');
                        }}
                      >
                        Kembali
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3 mb-md-0 order-first order-md-last">
                      <button
                        type="submit"
                        className="btn btn-danger w-100"
                        disabled={!isValidCancel}
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
        <TitleBanner message={'Detail Riwayat Tugas'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div
              className="text-primary-dark flex-centered justify-content-start cursor-pointer mb-4"
              onClick={() => {
                history.push('/task/history');
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
                {(isLoadingTaskDetail || isFetchingTaskDetail) && <Loader type="inline" />}
                {!(isLoadingTaskDetail || isFetchingTaskDetail) && (
                  <>
                    {errorTaskDetail && (
                      <div className="mb-5">
                        <InlineRetryError
                          message={errorTaskDetail.message}
                          onRetry={refetchTaskDetail}
                        />
                      </div>
                    )}
                    {taskDetail && (
                      <Row>
                        <div className="col-12 col-xl-8 order-last order-xl-first">
                          {(transactionStatus === TransactionStatus.DalamProsesPencarian ||
                            transactionStatus === TransactionStatus.TidakDipilih) && (
                            <>
                              <div className="card-sm mb-5">
                                {transactionStatus === TransactionStatus.DalamProsesPencarian && (
                                  <h4 className="font-weight-semibold text-center">
                                    Dalam proses pemilihan oleh klien! Cek berkala untuk mengetahui
                                    apakah kamu dipilih!
                                  </h4>
                                )}
                                {transactionStatus === TransactionStatus.TidakDipilih && (
                                  <h4 className="font-weight-semibold text-center">
                                    Mohon maaf. Kamu tidak terpilih oleh klien untuk mengerjakan
                                    tugas ini. Silakan mendaftar pada tugas yang lain!
                                  </h4>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="col-12 col-xl-4">
                          {(transactionStatus === TransactionStatus.DalamProsesPencarian ||
                            transactionStatus === TransactionStatus.TidakDipilih) && (
                            <div className="card-sm mb-5">
                              <h4 className="font-weight-semibold mb-3">
                                {taskDetail.taskDetail.name}
                              </h4>
                              {transactionStatus === TransactionStatus.DalamProsesPencarian && (
                                <div className="chip chip-warning text-nowrap mb-3">
                                  Dalam Proses Pemilihan
                                </div>
                              )}
                              {transactionStatus === TransactionStatus.TidakDipilih && (
                                <div className="chip chip-danger text-nowrap mb-3">
                                  Tidak Terpilih Klien
                                </div>
                              )}
                              <p className="mb-2">Deadline Pengerjaan:</p>
                              <p className="text-primary-dark font-weight-semibold mb-3">
                                {taskDetail.taskDetail.dueDate}
                              </p>
                              <p className="mb-2">Tanggal Pengiriman:</p>
                              <p className="text-primary-dark font-weight-semibold mb-3">-</p>
                              <div className="d-flex flex-row flex-wrap mb-3">
                                {taskDetail.taskDetail.tags.map((tag) => (
                                  <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                                ))}
                              </div>
                              <p className="mb-2">Tingkat Kesulitan</p>
                              <h3 className="text-primary-dark mb-3">
                                {taskDetail.taskDetail.difficulty}
                              </h3>
                              <h3 className="text-primary-dark text-nowrap mb-4">
                                Rp {formatCurrency(taskDetail.taskDetail.price)}
                              </h3>
                            </div>
                          )}
                        </div>
                      </Row>
                    )}
                  </>
                )}
                {(isLoadingTransactionDetail || isFetchingTransactionDetail) && (
                  <Loader type="inline" />
                )}
                {!(isLoadingTransactionDetail || isFetchingTransactionDetail) && (
                  <>
                    {errorTransactionDetail && (
                      <div className="mb-5">
                        <InlineRetryError
                          message={errorTransactionDetail.message}
                          onRetry={refetchTransactionDetail}
                        />
                      </div>
                    )}
                    {transactionDetail && (
                      <Row>
                        <div className="col-12 col-xl-8 order-last order-xl-first">
                          {transactionStatus !== TransactionStatus.DalamProsesPencarian &&
                            transactionStatus !== TransactionStatus.TidakDipilih && (
                              <>
                                {isLoadingFreelancerActivity && <Loader type="inline" />}
                                {!isLoadingFreelancerActivity && (
                                  <>
                                    {errorFreelancerActivity && (
                                      <div className="mb-5">
                                        <InlineRetryError
                                          message={errorFreelancerActivity.message}
                                          onRetry={mutateFreelancerActivity}
                                        />
                                      </div>
                                    )}
                                    {freelancerActivity && (
                                      <>
                                        <div className="mb-5">
                                          {freelancerActivity.activity.map((activity) => {
                                            return (
                                              <TransactionActivity
                                                userType="freelancer"
                                                projectType="task"
                                                activity={activity}
                                                transactionId={transactionId}
                                                refetchTransaction={refetchTransactionDetail}
                                              />
                                            );
                                          })}
                                        </div>
                                        {transactionStatus === TransactionStatus.DalamProses && (
                                          <div className="mb-5">
                                            <h4 className="font-weight-semibold mb-4">
                                              Kirim Hasil Pekerjaan
                                            </h4>
                                            {errorExceedResult && (
                                              <div className="mb-3">
                                                <InfoBox
                                                  message="Jumlah file hasil tidak boleh melebihi 3 file."
                                                  type="danger"
                                                />
                                              </div>
                                            )}
                                            <form
                                              onSubmit={handleSubmitResultMessage(
                                                confirmSendResult,
                                              )}
                                            >
                                              <div className="mb-4">
                                                <FormInput
                                                  errorMessage={
                                                    errorsResultMessage?.resultMessage?.message
                                                  }
                                                >
                                                  <Form.Control
                                                    as="textarea"
                                                    id="resultMessage"
                                                    name="resultMessage"
                                                    className="activity-message-text-area"
                                                    isInvalid={
                                                      formStateResultMessage.touched
                                                        .resultMessage === true &&
                                                      !!errorsResultMessage.resultMessage
                                                    }
                                                    ref={
                                                      registerResultMessage({
                                                        required: {
                                                          value: true,
                                                          message: 'Pesan tidak boleh kosong.',
                                                        },
                                                      }) as string & ((ref: Element | null) => void)
                                                    }
                                                  ></Form.Control>
                                                </FormInput>
                                              </div>
                                              {resultData?.map((item, i) => (
                                                <div className="card-sm d-flex flex-row align-items-center justify-content-between mb-4">
                                                  <h4 className="text-primary-dark font-weight-bold mb-0">
                                                    {item.data.name}
                                                  </h4>
                                                  <div
                                                    className="text-primary-dark cursor-pointer"
                                                    onClick={() => removeResult(i)}
                                                  >
                                                    <IconClose />
                                                  </div>
                                                </div>
                                              ))}
                                              <div
                                                className="cursor-pointer mb-4"
                                                onClick={uploadResult}
                                              >
                                                <div className="card-sm d-flex flex-row align-items-center justify-content-between">
                                                  <h4 className="text-primary-dark font-weight-bold mb-0 mr-2">
                                                    Tambahkan File Hasil Pekerjaan
                                                  </h4>
                                                  <div className="text-primary-dark">
                                                    <IconAddCircle />
                                                  </div>
                                                </div>
                                              </div>
                                              <input
                                                hidden
                                                id="selectSendResult"
                                                type="file"
                                                onChange={handleUploadSendResult}
                                              />
                                              <Row className="justify-content-end">
                                                <div className="col-12 col-md-6">
                                                  <button
                                                    className="btn btn-primary w-100"
                                                    type="submit"
                                                    disabled={
                                                      resultData.length === 0 ||
                                                      !isValidResultMessage
                                                    }
                                                  >
                                                    Kirim
                                                  </button>
                                                </div>
                                              </Row>
                                            </form>
                                          </div>
                                        )}
                                        {(transactionStatus ===
                                          TransactionStatus.DalamInvestigasi ||
                                          transactionStatus === TransactionStatus.DalamProses ||
                                          transactionStatus ===
                                            TransactionStatus.DalamProsesPengembalian ||
                                          transactionStatus === TransactionStatus.SudahDikirim) && (
                                          <div className="mb-5">
                                            <h4 className="font-weight-semibold mb-4">
                                              Kirim Pesan
                                            </h4>
                                            <form
                                              onSubmit={handleSubmitMessage(confirmSubmitMessage)}
                                            >
                                              <div className="mb-4">
                                                <FormInput
                                                  errorMessage={
                                                    errorsMessage?.activityMessage?.message
                                                  }
                                                >
                                                  <Form.Control
                                                    as="textarea"
                                                    id="activityMessage"
                                                    name="activityMessage"
                                                    className="activity-message-text-area"
                                                    isInvalid={
                                                      formStateMessage.touched.activityMessage ===
                                                        true && !!errorsMessage.activityMessage
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
                              </>
                            )}
                        </div>
                        <div className="col-12 col-xl-4">
                          {transactionStatus !== TransactionStatus.DalamProsesPencarian &&
                            transactionStatus !== TransactionStatus.TidakMenemukan && (
                              <>
                                <div className="card-sm mb-5">
                                  <h4 className="font-weight-semibold mb-3">
                                    {transactionDetail.transactionDetail.taskDetail.name}
                                  </h4>
                                  {transactionStatus === TransactionStatus.DalamProses && (
                                    <div className="chip chip-warning text-nowrap mb-3">
                                      Dalam Proses
                                    </div>
                                  )}
                                  {transactionStatus === TransactionStatus.SudahDikirim && (
                                    <div className="chip chip-success text-nowrap mb-3">
                                      Sudah Dikirim
                                    </div>
                                  )}
                                  {transactionStatus === TransactionStatus.Selesai && (
                                    <div className="chip chip-success text-nowrap mb-3">
                                      Selesai
                                    </div>
                                  )}
                                  {transactionStatus ===
                                    TransactionStatus.DalamProsesPengembalian && (
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
                                    <div className="chip chip-danger text-nowrap mb-3">
                                      Dibatalkan
                                    </div>
                                  )}
                                  <p className="mb-2">Deadline Pengerjaan:</p>
                                  <p className="text-primary-dark font-weight-semibold mb-3">
                                    {transactionDetail.transactionDetail.taskDetail.dueDate}
                                  </p>
                                  <p className="mb-2">Tanggal Pengiriman:</p>
                                  <p className="text-primary-dark font-weight-semibold mb-3">
                                    {transactionDetail.transactionDetail.deliveryDate
                                      ? transactionDetail.transactionDetail.deliveryDate
                                      : '-'}
                                  </p>
                                  <div className="d-flex flex-row flex-wrap mb-3">
                                    {transactionDetail.transactionDetail.taskDetail.tags.map(
                                      (tag) => (
                                        <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                                      ),
                                    )}
                                  </div>
                                  <p className="mb-2">Tingkat Kesulitan</p>
                                  <h3 className="text-primary-dark mb-3">
                                    {transactionDetail.transactionDetail.taskDetail.difficulty}
                                  </h3>
                                  <h3 className="text-primary-dark text-nowrap mb-4">
                                    Rp{' '}
                                    {formatCurrency(
                                      transactionDetail.transactionDetail.taskDetail.price,
                                    )}
                                  </h3>
                                  {!transactionDetail.transactionDetail.hasCancelled &&
                                    (transactionStatus === TransactionStatus.DalamProses ||
                                      transactionStatus === TransactionStatus.SudahDikirim) && (
                                      <div
                                        className="btn btn-danger"
                                        onClick={openModalCancel}
                                      >
                                        Ajukan Pembatalan
                                      </div>
                                    )}
                                </div>
                                <div className="mb-5">
                                  <h4 className="font-weight-semibold mb-3">Klien</h4>
                                  <div className="card-sm">
                                    <Image
                                      className="owned-task-detail-freelancer-profile-image mb-3"
                                      src={
                                        transactionDetail.transactionDetail.client.profileImageUrl
                                          ? transactionDetail.transactionDetail.client
                                              .profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={transactionDetail.transactionDetail.client.name}
                                    />
                                    <h4 className="font-weight-semibold">
                                      {transactionDetail.transactionDetail.client.name}
                                    </h4>
                                    <div
                                      className="btn btn-outline-primary"
                                      onClick={() => {
                                        openClientProfile(
                                          transactionDetail.transactionDetail.client.id,
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
                                          transactionDetail.transactionDetail.client.name,
                                          transactionId,
                                        );
                                      }}
                                    >
                                      Beri Ulasan pada Klien
                                    </div>
                                  )}
                                {transactionStatus === TransactionStatus.Selesai &&
                                  transactionDetail.transactionDetail.isReviewed && (
                                    <div className="mb-5">
                                      <h4 className="font-weight-semibold mb-3">Ulasan kamu </h4>
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
                                        {transactionDetail.transactionDetail.review
                                          ?.description && (
                                          <p>
                                            {
                                              transactionDetail.transactionDetail.review
                                                ?.description
                                            }
                                          </p>
                                        )}
                                        {!transactionDetail.transactionDetail.review
                                          ?.description && <p>Tidak ada deskripsi.</p>}
                                      </div>
                                    </div>
                                  )}
                              </>
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
                {transactionStatus !== TransactionStatus.Selesai && (
                  <div className="card-sm mb-5">
                    <InfoBox
                      type="warning"
                      message="Pesanan belum berhasil diselesaikan!"
                    />
                  </div>
                )}
                {transactionStatus === TransactionStatus.Selesai && (
                  <>
                    {(isLoadingFreelancerInvoice || isFetchingFreelancerInvoice) && (
                      <Loader type="inline" />
                    )}
                    {!(isLoadingFreelancerInvoice || isFetchingFreelancerInvoice) && (
                      <>
                        {errorFreelancerInvoice && (
                          <div className="mb-5">
                            <InlineRetryError
                              message={errorFreelancerInvoice.message}
                              onRetry={refetchFreelancerInvoice}
                            />
                          </div>
                        )}
                        {freelancerInvoice && (
                          <div className="card-sm mb-5 freelancer-invoice-container">
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
                                <p className="font-weight-bold">
                                  #{freelancerInvoice.refNo.toUpperCase()}
                                </p>
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
                                  <p className="col-12 col-lg-8">{freelancerInvoice.clientName}</p>
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
                                      <p className="col-12 col-lg-8">
                                        {freelancerInvoice.freelancerName}
                                      </p>
                                    </Row>
                                  </div>
                                  <div className="col-12 col-lg-6">
                                    <Row>
                                      <h4 className="font-weight-semibold col-12 col-lg-5 text-lg-right">
                                        Tanggal Pemesanan
                                      </h4>
                                      <p className="col-12 col-lg-7 text-lg-right">
                                        {freelancerInvoice.paymentDate}
                                      </p>
                                    </Row>
                                  </div>
                                </Row>
                              </div>
                            </Row>
                            <hr />
                            <Row className="my-4">
                              <div className="col-12 col-lg-10 mb-3 mb-lg-0">
                                <h4 className="font-weight-semibold">Layanan</h4>
                                <p className="font-weight-bold">{freelancerInvoice.project.name}</p>
                              </div>
                              <div className="col-12 col-lg-2">
                                <h4 className="font-weight-semibold">Harga</h4>
                                <p>Rp {formatCurrency(freelancerInvoice.project.price)}</p>
                              </div>
                            </Row>
                            <hr />
                            <Row className="my-4">
                              <div className="col-12 col-lg-10">
                                <h4 className="font-weight-semibold">
                                  Fee Platform ({freelancerInvoice.fee.percentage}%)
                                </h4>
                              </div>
                              <div className="col-12 col-lg-2">
                                <p>Rp {formatCurrency(freelancerInvoice.fee.amount)}</p>
                              </div>
                            </Row>
                            <Row className="my-4">
                              <div className="col-12 col-lg-10">
                                <h4 className="font-weight-semibold">Total</h4>
                              </div>
                              <div className="col-12 col-lg-2">
                                <p className="font-weight-bold">
                                  Rp {formatCurrency(freelancerInvoice.totalPrice)}
                                </p>
                              </div>
                            </Row>
                            <hr />
                            <Row>
                              <div className="col-12">
                                <h4 className="font-weight-semibold">Bank Detail</h4>
                              </div>
                              <div className="col-12">
                                <p className="text-grey mb-2">
                                  {freelancerInvoice.bankDetail.bankName} -{' '}
                                  {freelancerInvoice.bankDetail.accountNumber}
                                </p>
                                <p className="text-grey">
                                  {freelancerInvoice.bankDetail.beneficiaryName}
                                </p>
                              </div>
                            </Row>
                          </div>
                        )}
                      </>
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

export default TaskHistoryDetail;
