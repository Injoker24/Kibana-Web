import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs, Form, Image } from 'react-bootstrap';

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
} from 'shared/components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import {
  ErrorWrapper,
  ServiceInquiryOrdersOutput,
  ServiceInquiryOwnedServiceDetailOutput,
} from 'models';
import { ReviewService, ServiceService } from 'services';
import { DefaultAvatar, IconChevronLeft, IconClose, IconStar } from 'images';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import { TransactionStatus } from 'enums';
import { formatCurrency } from 'utils';

const ServiceOwnedDetail: React.FC = () => {
  const params = useParams<{ serviceId: string }>();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const {
    data: ownedServiceDetail,
    isFetching: isLoadingOwnedServiceDetail,
    refetch: refetchOwnedServiceDetail,
    error: errorOwnedServiceDetail,
  } = useQuery<ServiceInquiryOwnedServiceDetailOutput, ErrorWrapper>(
    ['inquiry-owned-service-detail', params.serviceId],
    async () => await ServiceService.inquiryOwnedServiceDetail(params.serviceId),
  );

  const [activeOrders, setActiveOrders] = useState<ServiceInquiryOrdersOutput>({
    transactions: [],
  });
  const [completedOrders, setCompletedOrders] = useState<ServiceInquiryOrdersOutput>({
    transactions: [],
  });
  const [cancelledOrders, setCancelledOrders] = useState<ServiceInquiryOrdersOutput>({
    transactions: [],
  });

  const {
    data: orders,
    isFetching: isLoadingOrders,
    refetch: refetchOrders,
    error: errorOrders,
  } = useQuery<ServiceInquiryOrdersOutput, ErrorWrapper>(
    ['inquiry-orders', params.serviceId],
    async () => await ServiceService.inquiryOrders(params.serviceId),
    {
      onSuccess: (output: ServiceInquiryOrdersOutput) => {
        const activeOrders = output.transactions?.filter(
          (item) =>
            item.status === TransactionStatus.DalamProses ||
            item.status === TransactionStatus.SudahDikirim ||
            item.status === TransactionStatus.DalamProsesPengembalian ||
            item.status === TransactionStatus.DalamInvestigasi,
        );
        const activeOrderObject = {
          transactions: activeOrders,
        };
        setActiveOrders(activeOrderObject);

        const completedOrders = output.transactions?.filter(
          (item) => item.status === TransactionStatus.Selesai,
        );
        const completedOrderObject = {
          transactions: completedOrders,
        };
        setCompletedOrders(completedOrderObject);

        const cancelledOrders = output.transactions?.filter(
          (item) =>
            item.status === TransactionStatus.Dibatalkan || item.status === TransactionStatus.Telat,
        );
        const cancelledOrderObject = {
          transactions: cancelledOrders,
        };
        setCancelledOrders(cancelledOrderObject);
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

  const openModalReview = (e: any, name: string, transactionId: string) => {
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
        refetchOrders();
      },
    },
  );

  const {
    data: successDeleteService,
    isLoading: isLoadingDeleteService,
    mutate: mutateDeleteService,
    error: errorDeleteService,
  } = useMutation<{}, ErrorWrapper>(
    ['delete-service', params.serviceId],
    async () => await ServiceService.delete(params.serviceId),
  );

  const [modalDeleteService, setModalDeleteService] = useState<boolean>(false);

  const openModalDeleteService = () => {
    setModalDeleteService(true);
  };

  const cancelDeleteService = () => {
    setModalDeleteService(false);
  };

  const confirmDeleteService = () => {
    setModalDeleteService(false);
    mutateDeleteService();
  };

  const {
    data: successDeactivateService,
    isLoading: isLoadingDeactivateService,
    mutate: mutateDeactivateService,
    error: errorDeactivateService,
  } = useMutation<{}, ErrorWrapper>(
    ['deactivate-service', params.serviceId],
    async () => await ServiceService.deactivate(params.serviceId),
  );

  const [modalDeactivateService, setModalDeactivateService] = useState<boolean>(false);

  const openModalDeactivateService = () => {
    setModalDeactivateService(true);
  };

  const cancelDeactivateService = () => {
    setModalDeactivateService(false);
  };

  const confirmDeactivateService = () => {
    setModalDeactivateService(false);
    mutateDeactivateService();
  };

  const {
    data: successActivateService,
    isLoading: isLoadingActivateService,
    mutate: mutateActivateService,
    error: errorActivateService,
  } = useMutation<{}, ErrorWrapper>(
    ['activate-service', params.serviceId],
    async () => await ServiceService.activate(params.serviceId),
  );

  const [modalActivateService, setModalActivateService] = useState<boolean>(false);

  const openModalActivateService = () => {
    setModalActivateService(true);
  };

  const cancelActivateService = () => {
    setModalActivateService(false);
  };

  const confirmActivateService = () => {
    setModalActivateService(false);
    mutateActivateService();
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
      {modalDeleteService && (
        <PopUpConfirm
          title="Hapus layanan"
          message="Apakah anda yakin akan menghapus layanan ini?"
          onCancel={cancelDeleteService}
          onSubmit={confirmDeleteService}
        />
      )}
      {isLoadingDeleteService && <Loader type="fixed" />}
      {errorDeleteService && <PopUpError message={errorDeleteService.message} />}
      {successDeleteService && (
        <PopUpSuccess
          message={'Berhasil menghapus layanan!'}
          onClose={() => {
            history.push('/service/owned');
          }}
        />
      )}
      {modalDeactivateService && (
        <PopUpConfirm
          title="Non-Aktifkan layanan"
          message="Apakah anda yakin akan menonaktifkan layanan ini?"
          onCancel={cancelDeactivateService}
          onSubmit={confirmDeactivateService}
        />
      )}
      {isLoadingDeactivateService && <Loader type="fixed" />}
      {errorDeactivateService && <PopUpError message={errorDeactivateService.message} />}
      {successDeactivateService && (
        <PopUpSuccess
          message={'Berhasil menonaktifkan layanan!'}
          onClose={() => {
            history.push('/service/owned');
          }}
        />
      )}
      {modalActivateService && (
        <PopUpConfirm
          title="Aktifkan layanan"
          message="Apakah anda yakin akan mengaktifkan layanan ini kembali?"
          onCancel={cancelActivateService}
          onSubmit={confirmActivateService}
        />
      )}
      {isLoadingActivateService && <Loader type="fixed" />}
      {errorActivateService && <PopUpError message={errorActivateService.message} />}
      {successActivateService && (
        <PopUpSuccess
          message={'Berhasil mengaktifkan layanan!'}
          onClose={() => {
            history.push('/service/owned');
          }}
        />
      )}
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Detail Layanan Saya'} />
        <Row className="justify-content-center">
          <div className="col-10">
            <div
              className="text-primary-dark flex-centered justify-content-start cursor-pointer mb-4"
              onClick={() => {
                history.push('/service/owned');
              }}
            >
              <div className="mr-3">
                <IconChevronLeft />
              </div>
              <p className="cursor-pointer">Kembali</p>
            </div>
            <Row>
              <div className="col-12 col-xl-8 order-last order-xl-first">
                <Tabs
                  id="tabset"
                  className="mb-5"
                  justify
                >
                  <Tab
                    eventKey="active"
                    title="Aktif"
                  >
                    {isLoadingOrders && <Loader type="inline" />}
                    {!isLoadingOrders && (
                      <div className="mb-5">
                        {errorOrders && (
                          <InlineRetryError
                            message={errorOrders.message}
                            onRetry={refetchOrders}
                          />
                        )}
                        {!errorOrders && activeOrders.transactions?.length !== 0 && (
                          <>
                            {activeOrders.transactions?.map((item) => {
                              return (
                                <>
                                  <div
                                    className="card-sm mb-4 d-none d-md-block cursor-pointer"
                                    onClick={() => {
                                      history.push({
                                        pathname: '/service/orders/' + item.id,
                                      });
                                    }}
                                  >
                                    <Row className="align-items-center mb-3">
                                      <div className="col-9">
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
                                        {item.status ===
                                          TransactionStatus.DalamProsesPengembalian && (
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
                                      <div className="col-3 d-flex flex-column align-items-end">
                                        <div className="d-flex flex-row align-items-center">
                                          <Image
                                            className="service-history-freelancer-profile-image mr-2"
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
                                  </div>
                                  <div
                                    className="card-sm mb-4 d-block d-md-none cursor-pointer"
                                    onClick={() => {
                                      history.push({
                                        pathname: '/service/orders/' + item.id,
                                      });
                                    }}
                                  >
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
                                    <div className="d-flex flex-row align-items-center mb-3">
                                      <Image
                                        className="owned-task-freelancer-profile-image mr-2"
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
                                </>
                              );
                            })}
                          </>
                        )}
                        {!errorOrders && activeOrders.transactions?.length === 0 && (
                          <div className="card-sm">
                            <InfoBox
                              message={'Kamu tidak memiliki pesanan yang aktif.'}
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
                    {isLoadingOrders && <Loader type="inline" />}
                    {!isLoadingOrders && (
                      <div className="mb-5">
                        {errorOrders && (
                          <InlineRetryError
                            message={errorOrders.message}
                            onRetry={refetchOrders}
                          />
                        )}
                        {!errorOrders && completedOrders.transactions?.length !== 0 && (
                          <>
                            {completedOrders.transactions?.map((item) => {
                              return (
                                <>
                                  <div
                                    className="card-sm mb-4 d-none d-md-block cursor-pointer"
                                    onClick={() => {
                                      history.push({
                                        pathname: '/service/orders/' + item.id,
                                      });
                                    }}
                                  >
                                    <Row className="align-items-center mb-3">
                                      <div className="col-9">
                                        {item.status === TransactionStatus.Selesai && (
                                          <div className="chip chip-success text-nowrap">
                                            Selesai
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-3 d-flex flex-column align-items-end">
                                        <div className="d-flex flex-row align-items-center">
                                          <Image
                                            className="service-history-freelancer-profile-image mr-2"
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
                                    <Row className="justify-content-end">
                                      {!item.isReviewed && (
                                        <div
                                          className="btn btn-outline-primary"
                                          onClick={(e) =>
                                            openModalReview(e, item.client.name, item.id)
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
                                    </Row>
                                  </div>
                                  <div
                                    className="card-sm mb-4 d-block d-md-none cursor-pointer"
                                    onClick={() => {
                                      history.push({
                                        pathname: '/service/orders/' + item.id,
                                      });
                                    }}
                                  >
                                    {item.status === TransactionStatus.Selesai && (
                                      <div className="chip chip-success text-nowrap mb-3">
                                        Selesai
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
                                    <div className="d-flex flex-row align-items-center mb-3">
                                      <Image
                                        className="owned-task-freelancer-profile-image mr-2"
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
                                    {!item.isReviewed && (
                                      <div
                                        className="btn btn-outline-primary"
                                        onClick={(e) =>
                                          openModalReview(e, item.client.name, item.id)
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
                        {!errorOrders && completedOrders.transactions?.length === 0 && (
                          <div className="card-sm">
                            <InfoBox
                              message={'Kamu tidak memiliki pesanan yang selesai.'}
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
                    {isLoadingOrders && <Loader type="inline" />}
                    {!isLoadingOrders && (
                      <div className="mb-5">
                        {errorOrders && (
                          <InlineRetryError
                            message={errorOrders.message}
                            onRetry={refetchOrders}
                          />
                        )}
                        {!errorOrders && cancelledOrders.transactions?.length !== 0 && (
                          <>
                            {cancelledOrders.transactions?.map((item) => {
                              return (
                                <>
                                  <div
                                    className="card-sm mb-4 d-none d-md-block cursor-pointer"
                                    onClick={() => {
                                      history.push({
                                        pathname: '/service/orders/' + item.id,
                                      });
                                    }}
                                  >
                                    <Row className="align-items-center mb-3">
                                      <div className="col-9">
                                        {item.status === TransactionStatus.Dibatalkan && (
                                          <div className="chip chip-danger text-nowrap">
                                            Dibatalkan
                                          </div>
                                        )}
                                        {item.status === TransactionStatus.Telat && (
                                          <div className="chip chip-danger text-nowrap">Telat</div>
                                        )}
                                      </div>
                                      <div className="col-3 d-flex flex-column align-items-end">
                                        <div className="d-flex flex-row align-items-center">
                                          <Image
                                            className="service-history-freelancer-profile-image mr-2"
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
                                  </div>
                                  <div
                                    className="card-sm mb-4 d-block d-md-none cursor-pointer"
                                    onClick={() => {
                                      history.push({
                                        pathname: '/service/orders/' + item.id,
                                      });
                                    }}
                                  >
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
                                    <div className="d-flex flex-row align-items-center mb-3">
                                      <Image
                                        className="owned-task-freelancer-profile-image mr-2"
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
                                </>
                              );
                            })}
                          </>
                        )}
                        {!errorOrders && cancelledOrders.transactions?.length === 0 && (
                          <div className="card-sm">
                            <InfoBox
                              message={'Kamu tidak memiliki pesanan yang dibatalkan.'}
                              type="warning"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </Tab>
                </Tabs>
              </div>
              <div className="col-12 col-xl-4">
                {isLoadingOwnedServiceDetail && <Loader type="inline" />}
                {!isLoadingOwnedServiceDetail && (
                  <>
                    {errorOwnedServiceDetail && (
                      <InlineRetryError
                        message={errorOwnedServiceDetail.message}
                        onRetry={refetchOwnedServiceDetail}
                      />
                    )}
                    {ownedServiceDetail && (
                      <>
                        <div className="card-sm mb-5">
                          <h4 className="font-weight-semibold mb-3">
                            {ownedServiceDetail.serviceDetail.name}
                          </h4>

                          <div className="mb-3">
                            <small className="text-grey">
                              Pengerjaan dalam waktu {ownedServiceDetail.serviceDetail.workingTime}{' '}
                              hari
                            </small>
                          </div>

                          <div className="d-flex flex-row flex-wrap mb-3">
                            {ownedServiceDetail.serviceDetail.tags.map((tag) => (
                              <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                            ))}
                          </div>

                          <h3 className="text-primary-dark text-nowrap mb-4">
                            Rp {formatCurrency(ownedServiceDetail.serviceDetail.price)}
                          </h3>

                          {ownedServiceDetail.serviceDetail.isActive && (
                            <div
                              className="btn btn-danger"
                              onClick={openModalDeactivateService}
                            >
                              Non-Aktifkan Layanan
                            </div>
                          )}

                          {!ownedServiceDetail.serviceDetail.isActive && (
                            <>
                              <div
                                className="btn btn-primary mb-3"
                                onClick={openModalActivateService}
                              >
                                Aktifkan Layanan
                              </div>
                              <div
                                className="btn btn-danger"
                                onClick={openModalDeleteService}
                              >
                                Hapus Layanan
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mb-5">
                          <h4 className="font-weight-semibold mb-3">Ulasan</h4>
                          <div className="card-sm">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-row align-items-center">
                                <h2 className="mr-2 mb-0">
                                  {ownedServiceDetail.review.averageRating}
                                </h2>
                                <div className="text-warning">
                                  <IconStar />
                                </div>
                              </div>
                              <p>{ownedServiceDetail.review.ratingAmount} ulasan</p>
                            </div>
                            <hr />
                            <div
                              className="overflow-auto"
                              style={
                                ownedServiceDetail.review.reviewList ? { maxHeight: '40rem' } : {}
                              }
                            >
                              {ownedServiceDetail.review.reviewList?.map((review) => {
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
                              {!ownedServiceDetail.review.reviewList && (
                                <InfoBox message={'Belum ada review'} />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </Row>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ServiceOwnedDetail;
