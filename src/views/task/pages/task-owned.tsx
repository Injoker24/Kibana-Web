import {
  ErrorWrapper,
  ServiceInquiryServiceHistoryOutput,
  TaskInquiryOwnedTaskOutput,
} from 'models';
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

const TaskOwned: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const [activeOwnedTask, setActiveOwnedTask] = useState<TaskInquiryOwnedTaskOutput>({ tasks: [] });
  const [completedOwnedTask, setCompletedOwnedTask] = useState<TaskInquiryOwnedTaskOutput>({
    tasks: [],
  });
  const [cancelledOwnedTask, setCancelledOwnedTask] = useState<TaskInquiryOwnedTaskOutput>({
    tasks: [],
  });

  const {
    data: ownedTask,
    isFetching: isLoadingOwnedTask,
    refetch: refetchOwnedTask,
    error: errorOwnedTask,
  } = useQuery<TaskInquiryOwnedTaskOutput, ErrorWrapper>(
    ['inquiry-owned-tasl'],
    async () => await TaskService.inquiryOwnedTask(),
    {
      onSuccess: (output: TaskInquiryOwnedTaskOutput) => {
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
        setActiveOwnedTask(activeTaskObject);

        const completedTasks = output.tasks?.filter(
          (item) => item.status === TransactionStatus.Selesai,
        );
        const completedTaskObject = {
          tasks: completedTasks,
        };
        setCompletedOwnedTask(completedTaskObject);

        const cancelledTasks = output.tasks?.filter(
          (item) =>
            item.status === TransactionStatus.Dibatalkan ||
            item.status === TransactionStatus.Telat ||
            item.status === TransactionStatus.TidakMenemukan,
        );
        const cancelledTaskObject = {
          tasks: cancelledTasks,
        };
        setCancelledOwnedTask(cancelledTaskObject);
      },
    },
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

  const openModalReview = (e: any, name?: string, transactionId?: string) => {
    e.stopPropagation();
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
        refetchOwnedTask();
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
          {isLoadingReviewFreelancer && <Loader type="inline" />}
          {!isLoadingReviewFreelancer && (
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
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Tugas Saya'} />
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
                {isLoadingOwnedTask && <Loader type="inline" />}
                {!isLoadingOwnedTask && (
                  <div className="mb-5">
                    {errorOwnedTask && (
                      <InlineRetryError
                        message={errorOwnedTask.message}
                        onRetry={refetchOwnedTask}
                      />
                    )}
                    {activeOwnedTask.tasks?.length !== 0 && (
                      <>
                        {activeOwnedTask.tasks?.map((item) => {
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
                                        Dalam Proses Pencarian Freelancer
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
                                  {item.chosenFreelancer && (
                                    <div className="col-3 d-flex flex-column align-items-end">
                                      <div className="d-flex flex-row align-items-center">
                                        <Image
                                          className="owned-task-freelancer-profile-image mr-2"
                                          src={
                                            item.chosenFreelancer.profileImageUrl
                                              ? item.chosenFreelancer.profileImageUrl
                                              : DefaultAvatar
                                          }
                                          alt={item.chosenFreelancer.name}
                                        />
                                        <small className="text-grey text-nowrap">
                                          {item.chosenFreelancer.name}
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
                                    Dalam Proses Pencarian Freelancer
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
                                {item.chosenFreelancer && (
                                  <div className="d-flex flex-row align-items-center mb-3">
                                    <Image
                                      className="owned-task-freelancer-profile-image mr-2"
                                      src={
                                        item.chosenFreelancer.profileImageUrl
                                          ? item.chosenFreelancer.profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={item.chosenFreelancer.name}
                                    />
                                    <small className="text-grey text-nowrap">
                                      {item.chosenFreelancer.name}
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
                    {activeOwnedTask.tasks?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki tugas yang aktif.'}
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
                {isLoadingOwnedTask && <Loader type="inline" />}
                {!isLoadingOwnedTask && (
                  <div className="mb-5">
                    {errorOwnedTask && (
                      <InlineRetryError
                        message={errorOwnedTask.message}
                        onRetry={refetchOwnedTask}
                      />
                    )}
                    {completedOwnedTask.tasks?.length !== 0 && (
                      <>
                        {completedOwnedTask.tasks?.map((item) => {
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
                                        className="owned-task-freelancer-profile-image mr-2"
                                        src={
                                          item.chosenFreelancer?.profileImageUrl
                                            ? item.chosenFreelancer?.profileImageUrl
                                            : DefaultAvatar
                                        }
                                        alt={item.chosenFreelancer?.name}
                                      />
                                      <small className="text-grey text-nowrap">
                                        {item.chosenFreelancer?.name}
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
                                          openModalReview(
                                            e,
                                            item.chosenFreelancer?.name,
                                            item.transactionId,
                                          )
                                        }
                                      >
                                        Beri Ulasan
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
                                    className="owned-task-freelancer-profile-image mr-2"
                                    src={
                                      item.chosenFreelancer?.profileImageUrl
                                        ? item.chosenFreelancer?.profileImageUrl
                                        : DefaultAvatar
                                    }
                                    alt={item.chosenFreelancer?.name}
                                  />
                                  <small className="text-grey text-nowrap">
                                    {item.chosenFreelancer?.name}
                                  </small>
                                </div>

                                <h3 className="text-primary-dark text-nowrap">
                                  Rp {formatCurrency(item.price)}
                                </h3>
                                {!item.isReviewed && (
                                  <div
                                    className="btn btn-outline-primary"
                                    onClick={(e) =>
                                      openModalReview(
                                        e,
                                        item.chosenFreelancer?.name,
                                        item.transactionId,
                                      )
                                    }
                                  >
                                    Beri Ulasan
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
                    {completedOwnedTask.tasks?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki tugas yang selesai.'}
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
                {isLoadingOwnedTask && <Loader type="inline" />}
                {!isLoadingOwnedTask && (
                  <div className="mb-5">
                    {errorOwnedTask && (
                      <InlineRetryError
                        message={errorOwnedTask.message}
                        onRetry={refetchOwnedTask}
                      />
                    )}
                    {cancelledOwnedTask.tasks?.length !== 0 && (
                      <>
                        {cancelledOwnedTask.tasks?.map((item) => {
                          return (
                            <>
                              <div
                                className="card-sm mb-4 d-none d-md-block cursor-pointer"
                                onClick={() => console.log('Hi')}
                              >
                                <Row className="align-items-center mb-3">
                                  <div className="col-9 d-flex flex-row">
                                    <h4 className="font-weight-semibold mb-0 mr-3">{item.name}</h4>
                                    {item.status === TransactionStatus.TidakMenemukan && (
                                      <div className="chip chip-danger text-nowrap">
                                        Tidak Menemukan Freelancer
                                      </div>
                                    )}
                                    {item.status === TransactionStatus.Dibatalkan && (
                                      <div className="chip chip-danger text-nowrap">Dibatalkan</div>
                                    )}
                                    {item.status === TransactionStatus.Telat && (
                                      <div className="chip chip-danger text-nowrap">Telat</div>
                                    )}
                                  </div>
                                  {item.chosenFreelancer && (
                                    <div className="col-3 d-flex flex-column align-items-end">
                                      <div className="d-flex flex-row align-items-center">
                                        <Image
                                          className="owned-task-freelancer-profile-image mr-2"
                                          src={
                                            item.chosenFreelancer.profileImageUrl
                                              ? item.chosenFreelancer.profileImageUrl
                                              : DefaultAvatar
                                          }
                                          alt={item.chosenFreelancer.name}
                                        />
                                        <small className="text-grey text-nowrap">
                                          {item.chosenFreelancer.name}
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
                                {item.status === TransactionStatus.TidakMenemukan && (
                                  <div className="chip chip-danger text-nowrap mb-3">
                                    Tidak Menemukan Freelancer
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
                                {item.chosenFreelancer && (
                                  <div className="d-flex flex-row align-items-center mb-3">
                                    <Image
                                      className="owned-task-freelancer-profile-image mr-2"
                                      src={
                                        item.chosenFreelancer.profileImageUrl
                                          ? item.chosenFreelancer.profileImageUrl
                                          : DefaultAvatar
                                      }
                                      alt={item.chosenFreelancer.name}
                                    />
                                    <small className="text-grey text-nowrap">
                                      {item.chosenFreelancer.name}
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
                    {cancelledOwnedTask.tasks?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki tugas yang dibatalkan.'}
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

export default TaskOwned;
