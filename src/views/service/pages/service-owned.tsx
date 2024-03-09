import { ErrorWrapper, ServiceInquiryOwnedServiceOutput } from 'models';
import React, { useEffect, useState } from 'react';
import { Row, Tab, Tabs, Image } from 'react-bootstrap';

import { Footer, Header, InfoBox, InlineRetryError, Loader, TitleBanner } from 'shared/components';
import { useHistory } from 'react-router-dom';
import { ServiceService } from 'services';
import { useQuery } from 'react-query';
import { formatCurrency } from 'utils';
import { IconStar } from 'images';

const ServiceOwned: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  const [activeOwnedService, setActiveOwnedService] = useState<ServiceInquiryOwnedServiceOutput>({
    services: [],
  });
  const [inactiveOwnedService, setInactiveOwnedService] =
    useState<ServiceInquiryOwnedServiceOutput>({
      services: [],
    });

  const {
    data: ownedService,
    isFetching: isLoadingOwnedService,
    refetch: refetchOwnedService,
    error: errorOwnedService,
  } = useQuery<ServiceInquiryOwnedServiceOutput, ErrorWrapper>(
    ['inquiry-owned-service'],
    async () => await ServiceService.inquiryOwnedService(),
    {
      onSuccess: (output: ServiceInquiryOwnedServiceOutput) => {
        const activeServices = output.services?.filter((item) => item.isActive);
        const activeServiceObject = {
          services: activeServices,
        };
        setActiveOwnedService(activeServiceObject);

        const inactiveServices = output.services?.filter((item) => !item.isActive);
        const inactiveServiceObject = {
          services: inactiveServices,
        };
        setInactiveOwnedService(inactiveServiceObject);
      },
    },
  );

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Layanan Saya'} />
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
                {isLoadingOwnedService && <Loader type="inline" />}
                {!isLoadingOwnedService && (
                  <div className="mb-5">
                    {errorOwnedService && (
                      <InlineRetryError
                        message={errorOwnedService.message}
                        onRetry={refetchOwnedService}
                      />
                    )}
                    {activeOwnedService.services?.length !== 0 && (
                      <>
                        {activeOwnedService.services?.map((item) => {
                          return (
                            <>
                              <div
                                className="card-sm mb-4 d-none d-lg-block cursor-pointer p-0"
                                onClick={() => {
                                  history.push({
                                    pathname: '/service/owned/' + item.id,
                                  });
                                }}
                              >
                                <Row>
                                  <div className="col-2">
                                    <Image
                                      className="owned-service-image"
                                      src={item.imageUrl}
                                    />
                                  </div>

                                  <div className="py-4 pr-5 col-10">
                                    <Row className="align-items-center mb-2">
                                      <div className="col-9 d-flex flex-row">
                                        <h4 className="font-weight-semibold mb-0 mr-3">
                                          {item.name}
                                        </h4>
                                      </div>
                                      <div className="col-3 d-flex flex-row align-items-center justify-content-end">
                                        <div className="text-warning mr-1">
                                          <IconStar />
                                        </div>
                                        <small className="text-grey font-weight-bold">
                                          {item.averageRating}/5
                                        </small>
                                        <small className="text-muted">({item.ratingAmount})</small>
                                      </div>
                                    </Row>
                                    <Row className="mb-2">
                                      <div className="col-12">
                                        <small>
                                          Pengerjaan dalam waktu {item.workingTime} hari
                                        </small>
                                      </div>
                                    </Row>
                                    <Row className="align-items-center">
                                      <div className="col-9 d-flex flex-row flex-wrap">
                                        {item.tags.map((tag) => (
                                          <div className="chip chip-primary mr-2 mb-2">{tag}</div>
                                        ))}
                                      </div>
                                      <div className="col-3 d-flex flex-column align-items-end">
                                        <h3 className="text-primary-dark text-nowrap mb-0">
                                          Rp {formatCurrency(item.price)}
                                        </h3>
                                        <div className="d-flex flex-row align-items-center">
                                          <h3 className="text-primary-dark mb-0 mr-2">
                                            {item.inProgressTransactionAmount}
                                          </h3>
                                          <p className="text-nowrap">Pesanan Dalam Proses</p>
                                        </div>
                                      </div>
                                    </Row>
                                  </div>
                                </Row>
                              </div>

                              <div
                                className="card-sm mb-4 d-block d-lg-none cursor-pointer p-0"
                                onClick={() => {
                                  history.push({
                                    pathname: '/service/owned/' + item.id,
                                  });
                                }}
                              >
                                <Image
                                  className="owned-service-small-image mb-3"
                                  src={item.imageUrl}
                                />

                                <div className="px-4 pb-4">
                                  <h4 className="font-weight-semibold mb-3">{item.name}</h4>
                                  <div className="mb-3">
                                    <small>Pengerjaan dalam waktu {item.workingTime} hari</small>
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
                                  <div className="d-flex flex-row flex-wrap mb-3">
                                    {item.tags.map((tag) => (
                                      <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                                    ))}
                                  </div>

                                  <h3 className="text-primary-dark text-nowrap mb-3">
                                    Rp {formatCurrency(item.price)}
                                  </h3>

                                  <div className="d-flex flex-row align-items-center">
                                    <h3 className="text-primary-dark mb-0 mr-2">
                                      {item.inProgressTransactionAmount}
                                    </h3>
                                    <p className="text-nowrap">Pesanan Dalam Proses</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {activeOwnedService.services?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki layanan yang aktif.'}
                          type="warning"
                        />
                      </div>
                    )}
                  </div>
                )}
              </Tab>

              <Tab
                eventKey="inactive"
                title="Non Aktif"
              >
                {isLoadingOwnedService && <Loader type="inline" />}
                {!isLoadingOwnedService && (
                  <div className="mb-5">
                    {errorOwnedService && (
                      <InlineRetryError
                        message={errorOwnedService.message}
                        onRetry={refetchOwnedService}
                      />
                    )}
                    {inactiveOwnedService.services?.length !== 0 && (
                      <>
                        {inactiveOwnedService.services?.map((item) => {
                          return (
                            <>
                              <div
                                className="card-sm mb-4 d-none d-lg-block cursor-pointer p-0"
                                onClick={() => {
                                  history.push({
                                    pathname: '/service/owned/' + item.id,
                                  });
                                }}
                              >
                                <Row>
                                  <div className="col-2">
                                    <Image
                                      className="owned-service-image"
                                      src={item.imageUrl}
                                    />
                                  </div>

                                  <div className="py-4 pr-5 col-10">
                                    <Row className="align-items-center mb-2">
                                      <div className="col-9 d-flex flex-row">
                                        <h4 className="font-weight-semibold mb-0 mr-3">
                                          {item.name}
                                        </h4>
                                      </div>
                                      <div className="col-3 d-flex flex-row align-items-center justify-content-end">
                                        <div className="text-warning mr-1">
                                          <IconStar />
                                        </div>
                                        <small className="text-grey font-weight-bold">
                                          {item.averageRating}/5
                                        </small>
                                        <small className="text-muted">({item.ratingAmount})</small>
                                      </div>
                                    </Row>
                                    <Row className="mb-3">
                                      <div className="col-12">
                                        <small>
                                          Pengerjaan dalam waktu {item.workingTime} hari
                                        </small>
                                      </div>
                                    </Row>
                                    <Row className="align-items-center">
                                      <div className="col-9 d-flex flex-row flex-wrap">
                                        {item.tags.map((tag) => (
                                          <div className="chip chip-primary mr-2 mb-2">{tag}</div>
                                        ))}
                                      </div>
                                      <div className="col-3 d-flex flex-column align-items-end">
                                        <h3 className="text-primary-dark text-nowrap mb-0">
                                          Rp {formatCurrency(item.price)}
                                        </h3>
                                      </div>
                                    </Row>
                                  </div>
                                </Row>
                              </div>

                              <div
                                className="card-sm mb-4 d-block d-lg-none cursor-pointer p-0"
                                onClick={() => {
                                  history.push({
                                    pathname: '/service/owned/' + item.id,
                                  });
                                }}
                              >
                                <Image
                                  className="owned-service-small-image mb-3"
                                  src={item.imageUrl}
                                />

                                <div className="px-4 pb-4">
                                  <h4 className="font-weight-semibold mb-3">{item.name}</h4>
                                  <div className="mb-3">
                                    <small>Pengerjaan dalam waktu {item.workingTime} hari</small>
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
                                  <div className="d-flex flex-row flex-wrap mb-3">
                                    {item.tags.map((tag) => (
                                      <div className="chip chip-primary mb-2 mr-2">{tag}</div>
                                    ))}
                                  </div>

                                  <h3 className="text-primary-dark text-nowrap mb-3">
                                    Rp {formatCurrency(item.price)}
                                  </h3>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                    {inactiveOwnedService.services?.length === 0 && (
                      <div className="card-sm">
                        <InfoBox
                          message={'Kamu tidak memiliki tugas yang nonaktif.'}
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

export default ServiceOwned;
