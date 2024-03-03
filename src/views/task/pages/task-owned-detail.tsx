import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs, Image, Form } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  PopUpConfirm,
  PopUpError,
  PopUpSuccess,
  TitleBanner,
  TransactionActivity,
} from 'shared/components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import {
  ErrorWrapper,
  TaskInquiryOwnedTaskDetailOutput,
  TaskInquiryRegisteredFreelancerListOutput,
  TransactionInquiryClientActivityOutput,
  TransactionInquiryClientInvoiceOutput,
  TransactionInquiryDetailClientTaskOutput,
} from 'models';
import { ReviewService, TaskService } from 'services';
import { DefaultAvatar, IconChevronLeft, IconClose, IconStar, logoDark, logoDarkLg } from 'images';
import { TransactionStatus } from 'enums';
import { formatCurrency } from 'utils';
import TransactionService from 'services/transaction.service';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';

const TaskOwnedDetail: React.FC = ({ transactionId }: any) => {
  const params = useParams<{ taskId: string }>();
  const history = useHistory();
  const location = useLocation();
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  // #region status = 1 / 6
  const {
    data: taskDetail,
    isLoading: isLoadingTaskDetail,
    isFetching: isFetchingTaskDetail,
    refetch: refetchTaskDetail,
    error: errorTaskDetail,
  } = useQuery<TaskInquiryOwnedTaskDetailOutput, ErrorWrapper>(
    ['inquiry-owned-task-detail', params.taskId],
    async () => await TaskService.inquiryOwnedTaskDetail(params.taskId),
    {
      enabled: !transactionId,
      onSuccess: (response) => {
        setTransactionStatus(response.taskDetail.status);
        mutateFreelancerList();
      },
    },
  );

  const {
    data: freelancerList,
    isLoading: isLoadingFreelancerList,
    mutate: mutateFreelancerList,
    error: errorFreelancerList,
  } = useMutation<TaskInquiryRegisteredFreelancerListOutput, ErrorWrapper>(
    ['inquiry-registered-freelancer-list', params.taskId],
    async () => await TaskService.inquiryRegisteredFreelancerList(params.taskId),
  );

  const {
    data: successDeleteTask,
    isLoading: isLoadingDeleteTask,
    mutate: mutateDeleteTask,
    error: errorDeleteTask,
  } = useMutation<{}, ErrorWrapper>(
    ['delete-task', params.taskId],
    async () => await TaskService.deleteTask(params.taskId),
  );

  const [modalDeleteTask, setModalDeleteTask] = useState<boolean>(false);

  const openModalDeleteTask = () => {
    setModalDeleteTask(true);
  };

  const cancelDeleteTask = () => {
    setModalDeleteTask(false);
  };

  const confirmDeleteTask = () => {
    setModalDeleteTask(false);
    mutateDeleteTask();
  };

  const [openCV, setOpenCV] = useState<boolean>(false);
  const [activeCVUrl, setActiveCVUrl] = useState<string | undefined>();
  const [openPortfolio, setOpenPortfolio] = useState<boolean>(false);
  const [activePortfolioUrl, setActivePortfolioUrl] = useState<string | undefined>();
  const [activeFreelancerName, setActiveFreelancerName] = useState<string>('');

  const openFreelancerCV = (name: string, cvUrl?: string) => {
    document.body.scrollTo(0, 0);
    setActiveCVUrl(cvUrl);
    setActiveFreelancerName(name);
    setOpenCV(true);
  };

  const openFreelancerPortfolio = (name: string, portfolioUrl?: string) => {
    document.body.scrollTo(0, 0);
    setActivePortfolioUrl(portfolioUrl);
    setActiveFreelancerName(name);
    setOpenPortfolio(true);
  };

  const closeFreelancerCV = () => {
    setActiveCVUrl(undefined);
    setActiveFreelancerName('');
    setOpenCV(false);
  };

  const closeFreelancerPortfolio = () => {
    setActivePortfolioUrl(undefined);
    setActiveFreelancerName('');
    setOpenPortfolio(false);
  };

  const [modalChooseFreelancer, setModalChooseFreelancer] = useState<boolean>(false);

  const openModalChooseFreelancer = (name: string) => {
    setModalChooseFreelancer(true);
    setActiveFreelancerName(name);
  };

  const cancelChooseFreelancer = () => {
    setModalChooseFreelancer(false);
    setActiveFreelancerName('');
  };

  const confirmChooseFreelancer = () => {
    setModalChooseFreelancer(false);
    setActiveFreelancerName('');
  };
  // #endregion

  // #region status = 2, 3, 4, 5, 7, 8, 9
  const {
    data: transactionDetail,
    isLoading: isLoadingTransactionDetail,
    isFetching: isFetchingTransactionDetail,
    refetch: refetchTransactionDetail,
    error: errorTransactionDetail,
  } = useQuery<TransactionInquiryDetailClientTaskOutput, ErrorWrapper>(
    ['inquiry-client-task-transaction-detail', transactionId],
    async () => await TransactionService.inquiryClientTaskTransactionDetail(transactionId),
    {
      enabled: !!transactionId,
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
    ['inquiry-client-invoice', transactionId],
    async () => await TransactionService.inquiryClientInvoice(transactionId),
    {
      enabled: !!transactionId,
    },
  );

  const {
    data: clientActivity,
    isLoading: isLoadingClientActivity,
    mutate: mutateClientActivity,
    error: errorClientActivity,
  } = useMutation<TransactionInquiryClientActivityOutput, ErrorWrapper>(
    ['inquiry-client-activity', transactionId],
    async () => await TransactionService.inquiryClientActivity(transactionId),
  );

  const [modalReview, setModalReview] = useState<boolean>(false);
  const [ratingAmount, setRatingAmount] = useState<number>(0);
  const [review, setReview] = useState<string>();
  const [freelancerToReview, setFreelancerToReview] = useState<{
    name: string;
    transactionId: string;
  }>({
    name: '',
    transactionId: '',
  });

  const openModalReview = (name: string, transactionId: string) => {
    setFreelancerToReview({
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
    mutateReviewFreelancer();
  };

  const {
    isLoading: isLoadingReviewFreelancer,
    mutate: mutateReviewFreelancer,
    error: errorReviewFreelancer,
  } = useMutation<{}, ErrorWrapper>(
    ['review-freelancer'],
    async () =>
      await ReviewService.reviewFreelancer({
        transactionId: freelancerToReview?.transactionId,
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
  // #endregion

  const openFreelancerProfile = (id: string) => {
    history.push({
      pathname: '/account/profile/' + id,
      state: {
        status: 'freelancer',
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
          {isLoadingReviewFreelancer && <Loader type="inline" />}
          {!isLoadingReviewFreelancer && (
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

                {errorReviewFreelancer && (
                  <div className="mb-4">
                    <InfoBox
                      message={errorReviewFreelancer?.message}
                      type="danger"
                    />
                  </div>
                )}

                <h4 className="font-weight-semibold mb-4">{freelancerToReview?.name}</h4>

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
                    <p className="mb-2">Ceritakan pengalamanmu bekerja dengan freelancer ini!</p>
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
      {modalDeleteTask && (
        <PopUpConfirm
          title="Hapus tugas"
          message="Apakah anda yakin akan menghapus tugas ini?"
          onCancel={cancelDeleteTask}
          onSubmit={confirmDeleteTask}
        />
      )}
      {isLoadingDeleteTask && <Loader type="fixed" />}
      {errorDeleteTask && <PopUpError message={errorDeleteTask.message} />}
      {successDeleteTask && (
        <PopUpSuccess
          message={'Berhasil menghapus tugas!'}
          onClose={() => {
            history.push('/task/owned');
          }}
        />
      )}
      {modalChooseFreelancer && (
        <PopUpConfirm
          title="Pilih freelancer"
          message={`Apakah anda yakin akan memilih <b>${activeFreelancerName}</b> untuk mengerjakan tugas anda?`}
          onCancel={cancelChooseFreelancer}
          onSubmit={confirmChooseFreelancer}
        />
      )}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Detail Tugas Saya'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div
              className="text-primary-dark flex-centered justify-content-start cursor-pointer mb-4"
              onClick={() => {
                history.push('/task/owned');
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
                      <InlineRetryError
                        message={errorTaskDetail.message}
                        onRetry={refetchTaskDetail}
                      />
                    )}
                    {taskDetail && (
                      <Row>
                        <div className="col-12 col-xl-8 order-last order-xl-first">
                          {(transactionStatus === TransactionStatus.DalamProsesPencarian ||
                            transactionStatus === TransactionStatus.TidakMenemukan) &&
                            !openCV &&
                            !openPortfolio && (
                              <>
                                {transactionStatus === TransactionStatus.DalamProsesPencarian && (
                                  <h4 className="font-weight-semibold mb-3">Pilih freelancer</h4>
                                )}
                                {transactionStatus === TransactionStatus.TidakMenemukan && (
                                  <h4 className="font-weight-semibold mb-3">
                                    Freelancer yang mendaftar
                                  </h4>
                                )}
                                <div className="card-sm mb-5">
                                  {isLoadingFreelancerList && <Loader type="inline" />}
                                  {!isLoadingFreelancerList && (
                                    <>
                                      {errorFreelancerList && (
                                        <InlineRetryError
                                          message={errorFreelancerList.message}
                                          onRetry={mutateFreelancerList}
                                        />
                                      )}
                                      {freelancerList && (
                                        <>
                                          {transactionStatus ===
                                            TransactionStatus.DalamProsesPencarian && (
                                            <div className="mb-4">
                                              <InfoBox
                                                message={`Pilih freelancer sebelum 3x24 jam dari waktu deadline pengerjaan <span class="text-primary-dark font-weight-bold">(${freelancerList.chooseDueDate})</span> atau tugas akan otomatis dihapus.`}
                                              />
                                            </div>
                                          )}
                                          {freelancerList.registeredFreelancer && (
                                            <>
                                              {freelancerList.registeredFreelancer.map(
                                                (freelancer) => {
                                                  return (
                                                    <div className="card-sm mb-3">
                                                      <div className="d-flex flex-row mb-3">
                                                        <Image
                                                          className="owned-task-detail-freelancer-profile-image mr-4"
                                                          src={
                                                            freelancer.profileImageUrl
                                                              ? freelancer.profileImageUrl
                                                              : DefaultAvatar
                                                          }
                                                          alt={freelancer.name}
                                                        />
                                                        <div>
                                                          <h4 className="font-weight-semibold">
                                                            {freelancer.name}
                                                          </h4>
                                                          <p
                                                            className="text-line-clamp line-4"
                                                            style={{ whiteSpace: 'pre-wrap' }}
                                                          >
                                                            {freelancer.description}
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <Row className="justify-content-between">
                                                        <div className="col-12 col-md-4 mb-3">
                                                          <div
                                                            className="btn btn-outline-primary"
                                                            onClick={() => {
                                                              openFreelancerPortfolio(
                                                                freelancer.name,
                                                                freelancer.cvUrl,
                                                              );
                                                            }}
                                                          >
                                                            Lihat Portfolio
                                                          </div>
                                                        </div>
                                                        <div className="col-12 col-md-4 mb-3">
                                                          <div
                                                            className="btn btn-outline-primary"
                                                            onClick={() => {
                                                              openFreelancerCV(
                                                                freelancer.name,
                                                                freelancer.cvUrl,
                                                              );
                                                            }}
                                                          >
                                                            Lihat CV
                                                          </div>
                                                        </div>
                                                        <div className="col-12 col-md-4 mb-3">
                                                          <div
                                                            className="btn btn-outline-primary"
                                                            onClick={() => {
                                                              openFreelancerProfile(freelancer.id);
                                                            }}
                                                          >
                                                            Lihat Profil
                                                          </div>
                                                        </div>
                                                      </Row>
                                                      {transactionStatus ===
                                                        TransactionStatus.DalamProsesPencarian && (
                                                        <div
                                                          className="btn btn-primary"
                                                          onClick={() =>
                                                            openModalChooseFreelancer(
                                                              freelancer.name,
                                                            )
                                                          }
                                                        >
                                                          Pilih Freelancer
                                                        </div>
                                                      )}
                                                    </div>
                                                  );
                                                },
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          {openCV && (
                            <>
                              <h4 className="font-weight-semibold mb-3">
                                CV {activeFreelancerName}
                              </h4>
                              <div className="card-sm p-0 mb-5">
                                <div
                                  onClick={closeFreelancerCV}
                                  className="text-primary-dark d-flex flex-row px-4 py-3 cursor-pointer"
                                >
                                  <div className="mr-3">
                                    <IconClose />
                                  </div>
                                  <h4 className="font-weight-semibold mb-0">Tutup</h4>
                                </div>
                                {activeCVUrl && (
                                  <iframe
                                    src={activeCVUrl}
                                    title="CV"
                                    className="w-100"
                                    style={{ height: '65rem' }}
                                  ></iframe>
                                )}
                                {!activeCVUrl && (
                                  <div className="px-4 pb-3">
                                    <InfoBox
                                      message={`${activeFreelancerName} belum menambahkan CV.`}
                                    />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          {openPortfolio && (
                            <>
                              <h4 className="font-weight-semibold mb-3">
                                Portfolio {activeFreelancerName}
                              </h4>
                              <div className="card-sm p-0 mb-5">
                                <div
                                  onClick={closeFreelancerPortfolio}
                                  className="text-primary-dark d-flex flex-row px-4 py-3 cursor-pointer"
                                >
                                  <div className="mr-3">
                                    <IconClose />
                                  </div>
                                  <h4 className="font-weight-semibold mb-0">Tutup</h4>
                                </div>
                                {activePortfolioUrl && (
                                  <iframe
                                    src={activePortfolioUrl}
                                    title="CV"
                                    className="w-100"
                                    style={{ height: '65rem' }}
                                  ></iframe>
                                )}
                                {!activePortfolioUrl && (
                                  <div className="px-4 pb-3">
                                    <InfoBox
                                      message={`${activeFreelancerName} belum menambahkan Portfolio.`}
                                    />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="col-12 col-xl-4">
                          {(transactionStatus === TransactionStatus.DalamProsesPencarian ||
                            transactionStatus === TransactionStatus.TidakMenemukan) && (
                            <div className="card-sm mb-5">
                              <h4 className="font-weight-semibold mb-3">
                                {taskDetail.taskDetail.name}
                              </h4>
                              {transactionStatus === TransactionStatus.DalamProsesPencarian && (
                                <div className="chip chip-warning text-nowrap mb-3">
                                  Dalam Proses Pencarian Freelancer
                                </div>
                              )}
                              {transactionStatus === TransactionStatus.TidakMenemukan && (
                                <div className="chip chip-danger text-nowrap mb-3">
                                  Tidak Menemukan Freelancer
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
                              {transactionStatus === TransactionStatus.DalamProsesPencarian && (
                                <div
                                  className="btn btn-danger"
                                  onClick={openModalDeleteTask}
                                >
                                  Hapus Tugas
                                </div>
                              )}
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
                      <InlineRetryError
                        message={errorTransactionDetail.message}
                        onRetry={refetchTransactionDetail}
                      />
                    )}
                    {transactionDetail && (
                      <Row>
                        <div className="col-12 col-xl-8 order-last order-xl-first">
                          {transactionStatus !== TransactionStatus.DalamProsesPencarian &&
                            transactionStatus !== TransactionStatus.TidakMenemukan && (
                              <>
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
                                      <div className="mb-5">
                                        {clientActivity.activity.map((activity) => {
                                          return (
                                            <TransactionActivity
                                              userType="client"
                                              projectType="task"
                                              activity={activity}
                                            />
                                          );
                                        })}
                                      </div>
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
                                  {!transactionDetail.transactionDetail.hasReturned &&
                                    (transactionStatus === TransactionStatus.DalamProses ||
                                      transactionStatus === TransactionStatus.SudahDikirim) && (
                                      <div className="btn btn-danger">Ajukan Pengembalian</div>
                                    )}
                                </div>
                                <div className="mb-5">
                                  <h4 className="font-weight-semibold mb-3">Freelancer terpilih</h4>
                                  <div className="card-sm">
                                    <Image
                                      className="owned-task-detail-freelancer-profile-image mb-3"
                                      src={
                                        transactionDetail.transactionDetail.chosenFreelancer
                                          .profileImageUrl
                                          ? transactionDetail.transactionDetail.chosenFreelancer
                                              .profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={
                                        transactionDetail.transactionDetail.chosenFreelancer.name
                                      }
                                    />
                                    <h4 className="font-weight-semibold">
                                      {transactionDetail.transactionDetail.chosenFreelancer.name}
                                    </h4>
                                    <p
                                      className="text-line-clamp line-10 mb-3"
                                      style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                      {
                                        transactionDetail.transactionDetail.chosenFreelancer
                                          .description
                                      }
                                    </p>
                                    <div
                                      className="btn btn-outline-primary"
                                      onClick={() => {
                                        openFreelancerProfile(
                                          transactionDetail.transactionDetail.chosenFreelancer.id,
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
                                          transactionDetail.transactionDetail.chosenFreelancer.name,
                                          transactionId,
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
                {(isLoadingTaskDetail || isFetchingTaskDetail) && <Loader type="inline" />}
                {!(isLoadingTaskDetail || isFetchingTaskDetail) && (
                  <>
                    {errorTaskDetail && (
                      <InlineRetryError
                        message={errorTaskDetail.message}
                        onRetry={refetchTaskDetail}
                      />
                    )}
                    {(transactionStatus === TransactionStatus.DalamProsesPencarian ||
                      transactionStatus === TransactionStatus.TidakMenemukan) && (
                      <div className="card-sm mb-5">
                        {transactionStatus === TransactionStatus.DalamProsesPencarian && (
                          <InfoBox message={'Kamu belum memilih freelancer untuk tugas ini!'} />
                        )}
                        {transactionStatus === TransactionStatus.TidakMenemukan && (
                          <InfoBox
                            type="danger"
                            message={
                              'Kamu tidak menemukan atau memilih freelancer untuk tugas ini!'
                            }
                          />
                        )}
                      </div>
                    )}
                  </>
                )}
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
                            <p className="font-weight-bold">{clientInvoice.refNo}</p>
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
                          <div className="col-12 col-lg-10 mb-3 mb-lg-0">
                            <h4 className="font-weight-semibold">Tugas</h4>
                            <p className="font-weight-bold">{clientInvoice.task.name}</p>
                          </div>
                          <div className="col-12 col-lg-2">
                            <h4 className="font-weight-semibold">Harga</h4>
                            <p>Rp {formatCurrency(clientInvoice.task.price)}</p>
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

export default TaskOwnedDetail;
