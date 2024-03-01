import { ErrorWrapper, TaskInquiryTaskHistoryOutput } from 'models';
import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs, Image, Form } from 'react-bootstrap';

import {
  Footer,
  FormInput,
  Header,
  InfoBox,
  InlineRetryError,
  Loader,
  TitleBanner,
} from 'shared/components';
import { useHistory } from 'react-router-dom';
import { ReviewService, TaskService } from 'services';
import { useMutation, useQuery } from 'react-query';
import { TransactionStatus } from 'enums';
import { DefaultAvatar, IconClose, IconStar } from 'images';
import { formatCurrency } from 'utils';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';

const TaskHistory: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const [activeTaskHistory, setActiveTaskHistory] = useState<TaskInquiryTaskHistoryOutput>({
    tasks: [],
  });
  const [completedTaskHistory, setCompletedTaskHistory] = useState<TaskInquiryTaskHistoryOutput>({
    tasks: [],
  });
  const [cancelledTaskHistory, setCancelledTaskHistory] = useState<TaskInquiryTaskHistoryOutput>({
    tasks: [],
  });

  const {
    data: taskHistory,
    isFetching: isLoadingTaskHistory,
    refetch: refetchTaskHistory,
    error: errorTaskHistory,
  } = useQuery<TaskInquiryTaskHistoryOutput, ErrorWrapper>(
    ['inquiry-task-history'],
    async () => await TaskService.inquiryTaskHistory(),
    {
      onSuccess: (output: TaskInquiryTaskHistoryOutput) => {
        const activeTasks = output.tasks?.filter(
          (item) =>
            item.status === TransactionStatus.DalamProsesPencarian ||
            item.status === TransactionStatus.DalamProses ||
            item.status === TransactionStatus.SudahDikirim ||
            item.status === TransactionStatus.DalamProsesPengembalian ||
            item.status === TransactionStatus.DalamInvestigasi,
        );
        const activeTaskObject = {
          tasks: activeTasks,
        };
        setActiveTaskHistory(activeTaskObject);

        const completedTasks = output.tasks?.filter(
          (item) => item.status === TransactionStatus.Selesai,
        );
        const completedTaskObject = {
          tasks: completedTasks,
        };
        setCompletedTaskHistory(completedTaskObject);

        const cancelledTasks = output.tasks?.filter(
          (item) =>
            item.status === TransactionStatus.Dibatalkan ||
            item.status === TransactionStatus.Telat ||
            item.status === TransactionStatus.TidakDipilih,
        );
        const cancelledTaskObject = {
          tasks: cancelledTasks,
        };
        setCancelledTaskHistory(cancelledTaskObject);
      },
    },
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

  const openModalReview = (e: any, name?: string, transactionId?: string) => {
    e.stopPropagation();
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
        refetchTaskHistory();
      },
    },
  );

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
                  <h3 className="mb-0">Beri Ulasan Kepada</h3>
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
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Riwayat Tugas'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <Tabs
              id="tabset"
              className="mb-5"
              justify
            >
              <Tab
                eventKey="active"
                title="Aktif"
              >
                {isLoadingTaskHistory && <Loader type="inline" />}
                {!isLoadingTaskHistory && (
                  <div className="mb-5">
                    {errorTaskHistory && (
                      <InlineRetryError
                        message={errorTaskHistory.message}
                        onRetry={refetchTaskHistory}
                      />
                    )}
                    {activeTaskHistory.tasks?.length !== 0 && (
                      <>
                        {activeTaskHistory.tasks?.map((item) => {
                          return (
                            <>
                              <div
                                className="card-sm mb-4 d-none d-md-block cursor-pointer"
                                onClick={() => console.log('Hi')}
                              >
                                <Row className="align-items-center mb-3">
                                  <div className="col-9 d-flex flex-row">
                                    <h4 className="font-weight-semibold mb-0 mr-3">{item.name}</h4>
                                    {item.status === TransactionStatus.DalamProsesPencarian && (
                                      <div className="chip chip-warning text-nowrap">
                                        Dalam Proses Pemilihan
                                      </div>
                                    )}
                                    {item.status === TransactionStatus.DalamProses && (
                                      <div className="chip chip-warning text-nowrap">
                                        Dalam Proses
                                      </div>
                                    )}
                                    {item.status === TransactionStatus.SudahDikirim && (
                                      <div className="chip chip-success text-nowrap">
                                        Sudah Dikirim
                                      </div>
                                    )}
                                    {item.status === TransactionStatus.DalamProsesPengembalian && (
                                      <div className="chip chip-danger text-nowrap">
                                        Dalam Proses Pengembalian
                                      </div>
                                    )}
                                    {item.status === TransactionStatus.DalamInvestigasi && (
                                      <div className="chip chip-danger text-nowrap">
                                        Dalam Investigasi
                                      </div>
                                    )}
                                  </div>
                                  {item.client && (
                                    <div className="col-3 d-flex flex-column align-items-end">
                                      <div className="d-flex flex-row align-items-center">
                                        <Image
                                          className="task-history-freelancer-profile-image mr-2"
                                          src={
                                            item.client.profileImageUrl
                                              ? item.client.profileImageUrl
                                              : DefaultAvatar
                                          }
                                          alt={item.client.name}
                                        />
                                        <small className="text-grey text-nowrap">
                                          {item.client.name}
                                        </small>
                                      </div>
                                    </div>
                                  )}
                                </Row>

                                <Row className="align-items-center mb-3">
                                  <div className="col-12 d-flex flex-row">
                                    <p>
                                      Deadline Pengerjaan:{' '}
                                      <span className="text-primary-dark font-weight-semibold">
                                        {item.dueDate}
                                      </span>
                                    </p>
                                  </div>
                                </Row>

                                <Row className="align-items-center mb-3">
                                  <div className="col-12 d-flex flex-row">
                                    <p>
                                      Tanggal Pengiriman:{' '}
                                      <span className="text-primary-dark font-weight-semibold">
                                        {item.deliveryDate ? item.deliveryDate : '-'}
                                      </span>
                                    </p>
                                  </div>
                                </Row>

                                <Row className="align-items-center">
                                  <div className="col-9 d-flex flex-row flex-wrap">
                                    {item.tags.map((tag) => (
                                      <div className="chip chip-primary mr-2">{tag}</div>
                                    ))}
                                  </div>
                                  <div className="col-3 d-flex flex-column align-items-end">
                                    <h3 className="text-primary-dark text-nowrap">
                                      Rp {formatCurrency(item.price)}
                                    </h3>
                                    {item.registeredFreelancerAmount && (
                                      <div className="d-flex flex-row align-items-center">
                                        <h3 className="text-primary-dark mb-0 mr-2">
                                          {item.registeredFreelancerAmount}
                                        </h3>
                                        <p className="text-nowrap">Freelancer Sudah Mendaftar</p>
                                      </div>
                                    )}
                                  </div>
                                </Row>
                              </div>

                              <div
                                className="card-sm mb-4 d-block d-md-none cursor-pointer"
                                onClick={() => console.log('Hi')}
                              >
                                <h4 className="font-weight-semibold mb-3">{item.name}</h4>
                                {item.status === TransactionStatus.DalamProsesPencarian && (
                                  <div className="chip chip-warning text-nowrap mb-3">
                                    Dalam Proses Pemilihan
                                  </div>
                                )}
                                {item.status === TransactionStatus.DalamProses && (
                                  <div className="chip chip-warning text-nowrap mb-3">
                                    Dalam Proses
                                  </div>
                                )}
                                {item.status === TransactionStatus.SudahDikirim && (
                                  <div className="chip chip-success text-nowrap mb-3">
                                    Sudah Dikirim
                                  </div>
                                )}
                                {item.status === TransactionStatus.DalamProsesPengembalian && (
                                  <div className="chip chip-danger text-nowrap mb-3">
                                    Dalam Proses Pengembalian
                                  </div>
                                )}
                                {item.status === TransactionStatus.DalamInvestigasi && (
                                  <div className="chip chip-danger text-nowrap mb-3">
                                    Dalam Investigasi
                                  </div>
                                )}
                                <p className="mb-2">Deadline Pengerjaan:</p>
                                <p className="text-primary-dark font-weight-semibold mb-3">
                                  {item.dueDate}
                                </p>
                                <p className="mb-2">Tanggal Pengiriman:</p>
                                <p className="text-primary-dark font-weight-semibold mb-3">
                                  {item.deliveryDate ? item.deliveryDate : '-'}
                                </p>
                                <div className="d-flex flex-row flex-wrap mb-3">
                                  {item.tags.map((tag) => (
                                    <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                                  ))}
                                </div>
                                {item.client && (
                                  <div className="d-flex flex-row align-items-center mb-3">
                                    <Image
                                      className="task-history-freelancer-profile-image mr-2"
                                      src={
                                        item.client.profileImageUrl
                                          ? item.client.profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={item.client.name}
                                    />
                                    <small className="text-grey text-nowrap">
                                      {item.client.name}
                                    </small>
                                  </div>
                                )}

                                <h3 className="text-primary-dark text-nowrap">
                                  Rp {formatCurrency(item.price)}
                                </h3>

                                {item.registeredFreelancerAmount && (
                                  <div className="d-flex flex-row align-items-center">
                                    <h3 className="text-primary-dark mb-0 mr-2">
                                      {item.registeredFreelancerAmount}
                                    </h3>
                                    <p className="text-nowrap">Freelancer Sudah Mendaftar</p>
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {activeTaskHistory.tasks?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki riwayat tugas yang aktif.'}
                          type="warning"
                        />
                      </div>
                    )}
                  </div>
                )}
              </Tab>

              <Tab
                eventKey="completed"
                title="Selesai"
              >
                {isLoadingTaskHistory && <Loader type="inline" />}
                {!isLoadingTaskHistory && (
                  <div className="mb-5">
                    {errorTaskHistory && (
                      <InlineRetryError
                        message={errorTaskHistory.message}
                        onRetry={refetchTaskHistory}
                      />
                    )}
                    {cancelledTaskHistory.tasks?.length !== 0 && (
                      <>
                        {completedTaskHistory.tasks?.map((item) => {
                          return (
                            <>
                              <div
                                className="card-sm mb-4 d-none d-md-block cursor-pointer"
                                onClick={() => console.log('Hi')}
                              >
                                <Row className="align-items-center mb-3">
                                  <div className="col-9 d-flex flex-row">
                                    <h4 className="font-weight-semibold mb-0 mr-3">{item.name}</h4>
                                    {item.status === TransactionStatus.Selesai && (
                                      <div className="chip chip-success text-nowrap">Selesai</div>
                                    )}
                                  </div>
                                  <div className="col-3 d-flex flex-column align-items-end">
                                    <div className="d-flex flex-row align-items-center">
                                      <Image
                                        className="task-history-freelancer-profile-image mr-2"
                                        src={
                                          item.client?.profileImageUrl
                                            ? item.client?.profileImageUrl
                                            : DefaultAvatar
                                        }
                                        alt={item.client?.name}
                                      />
                                      <small className="text-grey text-nowrap">
                                        {item.client?.name}
                                      </small>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center mb-3">
                                  <div className="col-12 d-flex flex-row">
                                    <p>
                                      Deadline Pengerjaan:{' '}
                                      <span className="text-primary-dark font-weight-semibold">
                                        {item.dueDate}
                                      </span>
                                    </p>
                                  </div>
                                </Row>

                                <Row className="align-items-center mb-3">
                                  <div className="col-12 d-flex flex-row">
                                    <p>
                                      Tanggal Pengiriman:{' '}
                                      <span className="text-primary-dark font-weight-semibold">
                                        {item.deliveryDate ? item.deliveryDate : '-'}
                                      </span>
                                    </p>
                                  </div>
                                </Row>

                                <Row className="align-items-center">
                                  <div className="col-9 d-flex flex-row flex-wrap">
                                    {item.tags.map((tag) => (
                                      <div className="chip chip-primary mr-2">{tag}</div>
                                    ))}
                                  </div>
                                  <div className="col-3 d-flex flex-column align-items-end">
                                    <h3 className="text-primary-dark text-nowrap">
                                      Rp {formatCurrency(item.price)}
                                    </h3>
                                    {!item.isReviewed && (
                                      <div
                                        className="btn btn-outline-primary"
                                        onClick={(e) =>
                                          openModalReview(e, item.client?.name, item.transactionId)
                                        }
                                      >
                                        Beri Ulasan pada Klien
                                      </div>
                                    )}
                                    {item.isReviewed && (
                                      <div className="d-flex flex-row">
                                        {Array(item.review?.amount)
                                          .fill(null)
                                          .map(() => {
                                            return (
                                              <div className="text-warning">
                                                <IconStar />
                                              </div>
                                            );
                                          })}
                                      </div>
                                    )}
                                  </div>
                                </Row>
                              </div>

                              <div
                                className="card-sm mb-4 d-block d-md-none cursor-pointer"
                                onClick={() => console.log('Hi')}
                              >
                                <h4 className="font-weight-semibold mb-3">{item.name}</h4>
                                {item.status === TransactionStatus.Selesai && (
                                  <div className="chip chip-success text-nowrap mb-3">Selesai</div>
                                )}
                                <p className="mb-2">Deadline Pengerjaan:</p>
                                <p className="text-primary-dark font-weight-semibold mb-3">
                                  {item.dueDate}
                                </p>
                                <p className="mb-2">Tanggal Pengiriman:</p>
                                <p className="text-primary-dark font-weight-semibold mb-3">
                                  {item.deliveryDate ? item.deliveryDate : '-'}
                                </p>
                                <div className="d-flex flex-row flex-wrap mb-3">
                                  {item.tags.map((tag) => (
                                    <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                                  ))}
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                  <Image
                                    className="task-history-freelancer-profile-image mr-2"
                                    src={
                                      item.client?.profileImageUrl
                                        ? item.client?.profileImageUrl
                                        : DefaultAvatar
                                    }
                                    alt={item.client?.name}
                                  />
                                  <small className="text-grey text-nowrap">
                                    {item.client?.name}
                                  </small>
                                </div>

                                <h3 className="text-primary-dark text-nowrap">
                                  Rp {formatCurrency(item.price)}
                                </h3>
                                {!item.isReviewed && (
                                  <div
                                    className="btn btn-outline-primary"
                                    onClick={(e) =>
                                      openModalReview(e, item.client?.name, item.transactionId)
                                    }
                                  >
                                    Beri Ulasan pada Klien
                                  </div>
                                )}
                                {item.isReviewed && (
                                  <div className="d-flex flex-row">
                                    {Array(item.review?.amount)
                                      .fill(null)
                                      .map(() => {
                                        return (
                                          <div className="text-warning">
                                            <IconStar />
                                          </div>
                                        );
                                      })}
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {completedTaskHistory.tasks?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki riwayat tugas yang selesai.'}
                          type="warning"
                        />
                      </div>
                    )}
                  </div>
                )}
              </Tab>

              <Tab
                eventKey="cancelled"
                title="Dibatalkan"
              >
                {isLoadingTaskHistory && <Loader type="inline" />}
                {!isLoadingTaskHistory && (
                  <div className="mb-5">
                    {errorTaskHistory && (
                      <InlineRetryError
                        message={errorTaskHistory.message}
                        onRetry={refetchTaskHistory}
                      />
                    )}
                    {cancelledTaskHistory.tasks?.length !== 0 && (
                      <>
                        {cancelledTaskHistory.tasks?.map((item) => {
                          return (
                            <>
                              <div
                                className="card-sm mb-4 d-none d-md-block cursor-pointer"
                                onClick={() => console.log('Hi')}
                              >
                                <Row className="align-items-center mb-3">
                                  <div className="col-9 d-flex flex-row">
                                    <h4 className="font-weight-semibold mb-0 mr-3">{item.name}</h4>
                                    {item.status === TransactionStatus.TidakDipilih && (
                                      <div className="chip chip-danger text-nowrap">
                                        Tidak Terpilih Klien
                                      </div>
                                    )}
                                    {item.status === TransactionStatus.Dibatalkan && (
                                      <div className="chip chip-danger text-nowrap">Dibatalkan</div>
                                    )}
                                    {item.status === TransactionStatus.Telat && (
                                      <div className="chip chip-danger text-nowrap">Telat</div>
                                    )}
                                  </div>
                                  {item.client && (
                                    <div className="col-3 d-flex flex-column align-items-end">
                                      <div className="d-flex flex-row align-items-center">
                                        <Image
                                          className="task-history-freelancer-profile-image mr-2"
                                          src={
                                            item.client.profileImageUrl
                                              ? item.client.profileImageUrl
                                              : DefaultAvatar
                                          }
                                          alt={item.client.name}
                                        />
                                        <small className="text-grey text-nowrap">
                                          {item.client.name}
                                        </small>
                                      </div>
                                    </div>
                                  )}
                                </Row>

                                <Row className="align-items-center mb-3">
                                  <div className="col-12 d-flex flex-row">
                                    <p>
                                      Deadline Pengerjaan:{' '}
                                      <span className="text-primary-dark font-weight-semibold">
                                        {item.dueDate}
                                      </span>
                                    </p>
                                  </div>
                                </Row>

                                <Row className="align-items-center mb-3">
                                  <div className="col-12 d-flex flex-row">
                                    <p>
                                      Tanggal Pengiriman:{' '}
                                      <span className="text-primary-dark font-weight-semibold">
                                        {item.deliveryDate ? item.deliveryDate : '-'}
                                      </span>
                                    </p>
                                  </div>
                                </Row>

                                <Row className="align-items-center">
                                  <div className="col-9 d-flex flex-row flex-wrap">
                                    {item.tags.map((tag) => (
                                      <div className="chip chip-primary mr-2">{tag}</div>
                                    ))}
                                  </div>
                                  <div className="col-3 d-flex flex-column align-items-end">
                                    <h3 className="text-primary-dark text-nowrap">
                                      Rp {formatCurrency(item.price)}
                                    </h3>
                                    {item.registeredFreelancerAmount && (
                                      <div className="d-flex flex-row align-items-center">
                                        <h3 className="text-primary-dark mb-0 mr-2">
                                          {item.registeredFreelancerAmount}
                                        </h3>
                                        <p className="text-nowrap">Freelancer Sudah Mendaftar</p>
                                      </div>
                                    )}
                                  </div>
                                </Row>
                              </div>

                              <div
                                className="card-sm mb-4 d-block d-md-none cursor-pointer"
                                onClick={() => console.log('Hi')}
                              >
                                <h4 className="font-weight-semibold mb-3">{item.name}</h4>
                                {item.status === TransactionStatus.TidakDipilih && (
                                  <div className="chip chip-danger text-nowrap mb-3">
                                    Tidak Terpilih Klien
                                  </div>
                                )}
                                {item.status === TransactionStatus.Dibatalkan && (
                                  <div className="chip chip-danger text-nowrap mb-3">
                                    Dibatalkan
                                  </div>
                                )}
                                {item.status === TransactionStatus.Telat && (
                                  <div className="chip chip-danger text-nowrap mb-3">Telat</div>
                                )}
                                <p className="mb-2">Deadline Pengerjaan:</p>
                                <p className="text-primary-dark font-weight-semibold mb-3">
                                  {item.dueDate}
                                </p>
                                <p className="mb-2">Tanggal Pengiriman:</p>
                                <p className="text-primary-dark font-weight-semibold mb-3">
                                  {item.deliveryDate ? item.deliveryDate : '-'}
                                </p>
                                <div className="d-flex flex-row flex-wrap mb-3">
                                  {item.tags.map((tag) => (
                                    <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                                  ))}
                                </div>
                                {item.client && (
                                  <div className="d-flex flex-row align-items-center mb-3">
                                    <Image
                                      className="task-history-freelancer-profile-image mr-2"
                                      src={
                                        item.client.profileImageUrl
                                          ? item.client.profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={item.client.name}
                                    />
                                    <small className="text-grey text-nowrap">
                                      {item.client.name}
                                    </small>
                                  </div>
                                )}

                                <h3 className="text-primary-dark text-nowrap">
                                  Rp {formatCurrency(item.price)}
                                </h3>

                                {item.registeredFreelancerAmount && (
                                  <div className="d-flex flex-row align-items-center">
                                    <h3 className="text-primary-dark mb-0 mr-2">
                                      {item.registeredFreelancerAmount}
                                    </h3>
                                    <p className="text-nowrap">Freelancer Sudah Mendaftar</p>
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {cancelledTaskHistory.tasks?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki riwayat tugas yang dibatalkan.'}
                          type="warning"
                        />
                      </div>
                    )}
                  </div>
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

export default TaskHistory;
