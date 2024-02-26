import { ErrorWrapper, ServiceInquiryServiceHistoryOutput } from 'models';
import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs, Image } from 'react-bootstrap';

import { Footer, Header, InfoBox, InlineRetryError, Loader, TitleBanner } from 'shared/components';
import { useHistory } from 'react-router-dom';
import { ServiceService } from 'services';
import { useQuery } from 'react-query';
import { TransactionStatus } from 'enums';
import { DefaultAvatar, IconStar } from 'images';
import { formatCurrency } from 'utils';

const ServiceHistory: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const [activeServiceHistory, setActiveServiceHistory] =
    useState<ServiceInquiryServiceHistoryOutput>({ services: [] });
  const [completedServiceHistory, setCompletedServiceHistory] =
    useState<ServiceInquiryServiceHistoryOutput>({ services: [] });
  const [cancelledServiceHistory, setCancelledServiceHistory] =
    useState<ServiceInquiryServiceHistoryOutput>({ services: [] });

  const {
    data: serviceHistory,
    isLoading: isLoadingServiceHistory,
    refetch: refetchServiceHistory,
    error: errorServiceHistory,
  } = useQuery<ServiceInquiryServiceHistoryOutput, ErrorWrapper>(
    ['inquiry-service-history'],
    async () => await ServiceService.inquiryServiceHistory(),
    {
      onSuccess: (output: ServiceInquiryServiceHistoryOutput) => {
        const activeServices = output.services?.filter(
          (item) =>
            item.status === TransactionStatus.DalamProses ||
            item.status === TransactionStatus.SudahDikirim ||
            item.status === TransactionStatus.DalamProsesPengembalian ||
            item.status === TransactionStatus.DalamInvestigasi,
        );
        const activeServiceObject = {
          services: activeServices,
        };
        setActiveServiceHistory(activeServiceObject);

        const completedServices = output.services?.filter(
          (item) => item.status === TransactionStatus.Selesai,
        );
        const completedServiceObject = {
          services: completedServices,
        };
        setCompletedServiceHistory(completedServiceObject);

        const cancelledServices = output.services?.filter(
          (item) =>
            item.status === TransactionStatus.Dibatalkan || item.status === TransactionStatus.Telat,
        );
        const cancelledServiceObject = {
          services: cancelledServices,
        };
        setCancelledServiceHistory(cancelledServiceObject);
      },
    },
  );

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Riwayat Layanan'} />
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
                {isLoadingServiceHistory && <Loader type="inline" />}
                {!isLoadingServiceHistory && (
                  <div className="mb-5">
                    {errorServiceHistory && (
                      <InlineRetryError
                        message={errorServiceHistory.message}
                        onRetry={refetchServiceHistory}
                      />
                    )}
                    {activeServiceHistory.services?.length !== 0 && (
                      <>
                        {activeServiceHistory.services?.map((item) => {
                          return (
                            <>
                              <div className="card-sm mb-4 d-none d-md-block">
                                <Row className="align-items-center mb-3">
                                  <div className="col-9 d-flex flex-row">
                                    <h4 className="font-weight-semibold mb-0 mr-3">{item.name}</h4>
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
                                  <div className="col-3 d-flex flex-column align-items-end">
                                    <div className="d-flex flex-row align-items-center">
                                      <Image
                                        className="service-history-freelancer-profile-image mr-2"
                                        src={
                                          item.freelancer.profileImageUrl
                                            ? item.freelancer.profileImageUrl
                                            : DefaultAvatar
                                        }
                                        alt={item.freelancer.name}
                                      />
                                      <small className="text-grey text-nowrap">
                                        {item.freelancer.name}
                                      </small>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div className="text-warning mr-1">
                                        <IconStar />
                                      </div>
                                      <small className="text-grey font-weight-bold">
                                        {item.averageRating}/5
                                      </small>
                                      <small className="text-muted">({item.ratingAmount})</small>
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
                                  <div className="col-3 d-flex justify-content-end">
                                    <h3 className="text-primary-dark text-nowrap">
                                      Rp {formatCurrency(item.price)}
                                    </h3>
                                  </div>
                                </Row>
                              </div>

                              <div className="card-sm mb-4 d-block d-md-none">
                                <h4 className="font-weight-semibold mb-3">{item.name}</h4>
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
                                <div className="d-flex flex-row align-items-center mb-2">
                                  <Image
                                    className="service-history-freelancer-profile-image mr-2"
                                    src={
                                      item.freelancer.profileImageUrl
                                        ? item.freelancer.profileImageUrl
                                        : DefaultAvatar
                                    }
                                    alt={item.freelancer.name}
                                  />
                                  <small className="text-grey text-nowrap">
                                    {item.freelancer.name}
                                  </small>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                  <div className="text-warning mr-1">
                                    <IconStar />
                                  </div>
                                  <small className="text-grey font-weight-bold">
                                    {item.averageRating}/5
                                  </small>
                                  <small className="text-muted">({item.ratingAmount})</small>
                                </div>
                                <h3 className="text-primary-dark text-nowrap">
                                  Rp {formatCurrency(item.price)}
                                </h3>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {activeServiceHistory.services?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki riwayat layanan yang aktif.'}
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
                {isLoadingServiceHistory && <Loader type="inline" />}
                {!isLoadingServiceHistory && (
                  <div className="mb-5">
                    {errorServiceHistory && (
                      <InlineRetryError
                        message={errorServiceHistory.message}
                        onRetry={refetchServiceHistory}
                      />
                    )}
                    {completedServiceHistory.services?.length !== 0 && (
                      <>
                        {completedServiceHistory.services?.map((item) => {
                          return (
                            <>
                              <div className="card-sm mb-4 d-none d-md-block">
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
                                        className="service-history-freelancer-profile-image mr-2"
                                        src={
                                          item.freelancer.profileImageUrl
                                            ? item.freelancer.profileImageUrl
                                            : DefaultAvatar
                                        }
                                        alt={item.freelancer.name}
                                      />
                                      <small className="text-grey text-nowrap">
                                        {item.freelancer.name}
                                      </small>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div className="text-warning mr-1">
                                        <IconStar />
                                      </div>
                                      <small className="text-grey font-weight-bold">
                                        {item.averageRating}/5
                                      </small>
                                      <small className="text-muted">({item.ratingAmount})</small>
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
                                  <div className="col-3 d-flex justify-content-end">
                                    <h3 className="text-primary-dark text-nowrap">
                                      Rp {formatCurrency(item.price)}
                                    </h3>
                                  </div>
                                </Row>
                              </div>

                              <div className="card-sm mb-4 d-block d-md-none">
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
                                <div className="d-flex flex-row align-items-center mb-2">
                                  <Image
                                    className="service-history-freelancer-profile-image mr-2"
                                    src={
                                      item.freelancer.profileImageUrl
                                        ? item.freelancer.profileImageUrl
                                        : DefaultAvatar
                                    }
                                    alt={item.freelancer.name}
                                  />
                                  <small className="text-grey text-nowrap">
                                    {item.freelancer.name}
                                  </small>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                  <div className="text-warning mr-1">
                                    <IconStar />
                                  </div>
                                  <small className="text-grey font-weight-bold">
                                    {item.averageRating}/5
                                  </small>
                                  <small className="text-muted">({item.ratingAmount})</small>
                                </div>
                                <h3 className="text-primary-dark text-nowrap">
                                  Rp {formatCurrency(item.price)}
                                </h3>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {completedServiceHistory.services?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki riwayat layanan yang selesai.'}
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
                {isLoadingServiceHistory && <Loader type="inline" />}
                {!isLoadingServiceHistory && (
                  <div className="mb-5">
                    {errorServiceHistory && (
                      <InlineRetryError
                        message={errorServiceHistory.message}
                        onRetry={refetchServiceHistory}
                      />
                    )}
                    {cancelledServiceHistory.services?.length !== 0 && (
                      <>
                        {cancelledServiceHistory.services?.map((item) => {
                          return (
                            <>
                              <div className="card-sm mb-4 d-none d-md-block">
                                <Row className="align-items-center mb-3">
                                  <div className="col-9 d-flex flex-row">
                                    <h4 className="font-weight-semibold mb-0 mr-3">{item.name}</h4>
                                    {item.status === TransactionStatus.Dibatalkan && (
                                      <div className="chip chip-danger text-nowrap">Dibatalkan</div>
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
                                          item.freelancer.profileImageUrl
                                            ? item.freelancer.profileImageUrl
                                            : DefaultAvatar
                                        }
                                        alt={item.freelancer.name}
                                      />
                                      <small className="text-grey text-nowrap">
                                        {item.freelancer.name}
                                      </small>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div className="text-warning mr-1">
                                        <IconStar />
                                      </div>
                                      <small className="text-grey font-weight-bold">
                                        {item.averageRating}/5
                                      </small>
                                      <small className="text-muted">({item.ratingAmount})</small>
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
                                  <div className="col-3 d-flex justify-content-end">
                                    <h3 className="text-primary-dark text-nowrap">
                                      Rp {formatCurrency(item.price)}
                                    </h3>
                                  </div>
                                </Row>
                              </div>

                              <div className="card-sm mb-4 d-block d-md-none">
                                <h4 className="font-weight-semibold mb-3">{item.name}</h4>
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
                                <div className="d-flex flex-row align-items-center mb-2">
                                  <Image
                                    className="service-history-freelancer-profile-image mr-2"
                                    src={
                                      item.freelancer.profileImageUrl
                                        ? item.freelancer.profileImageUrl
                                        : DefaultAvatar
                                    }
                                    alt={item.freelancer.name}
                                  />
                                  <small className="text-grey text-nowrap">
                                    {item.freelancer.name}
                                  </small>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                  <div className="text-warning mr-1">
                                    <IconStar />
                                  </div>
                                  <small className="text-grey font-weight-bold">
                                    {item.averageRating}/5
                                  </small>
                                  <small className="text-muted">({item.ratingAmount})</small>
                                </div>
                                <h3 className="text-primary-dark text-nowrap">
                                  Rp {formatCurrency(item.price)}
                                </h3>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {cancelledServiceHistory.services?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki riwayat layanan yang dibatalkan.'}
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

export default ServiceHistory;
