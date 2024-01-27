import {
  ErrorWrapper,
  ServiceInquiryDetailSubCategoryOutput,
  ServiceInquiryNewServiceOutput,
} from 'models';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ServiceService } from 'services';
import { Image, Row } from 'react-bootstrap';

import { Footer, Header, InlineRetryError, Loader, Service, TitleBanner } from 'shared/components';
import { IconChevronLeft, IconNextCircle } from 'images';

const ServiceCategoryDetail = ({ title, id, onBack }: any) => {
  const {
    data: newService,
    isLoading: isLoadingNewService,
    refetch: refetchNewService,
    error: errorNewService,
  } = useQuery<ServiceInquiryNewServiceOutput, ErrorWrapper>(
    ['inquiry-new-service-category', id],
    async () => await ServiceService.inquiryNewService(id),
  );

  const {
    data: subCategoryDetail,
    isLoading: isLoadingSubCategoryDetail,
    refetch: refetchSubCategoryDetail,
    error: errorSubCategoryDetail,
  } = useQuery<ServiceInquiryDetailSubCategoryOutput, ErrorWrapper>(
    ['inquiry-service-sub-category-detail', id],
    async () => await ServiceService.inquiryDetailSubCategory(id),
  );

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={title} />
        <Row className="justify-content-center mb-4">
          <div
            className="col-10 text-primary-dark flex-centered justify-content-start cursor-pointer"
            onClick={onBack}
          >
            <div className="mr-3">
              <IconChevronLeft />
            </div>
            <p className="cursor-pointer">Kembali</p>
          </div>
        </Row>
        <Row className="justify-content-center mb-5">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Layanan {title.toLowerCase()} baru</h3>
              <a
                href=""
                className="text-primary text-align-center text-nowrap"
              >
                Lihat Semua
              </a>
            </div>
            {errorNewService && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorNewService.message}
                  onRetry={refetchNewService}
                />
              </div>
            )}
            <Row>
              {isLoadingNewService && <Loader type="inline" />}
              {newService &&
                newService.services.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="col-xl-3 col-md-6 col-12 py-3"
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
        </Row>
        <Row className="justify-content-center mb-5">
          <div className="col-10">
            <h3 className="mb-3">Jenis layanan yang tersedia</h3>
            {errorSubCategoryDetail && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorSubCategoryDetail.message}
                  onRetry={refetchSubCategoryDetail}
                />
              </div>
            )}
            <Row className="justify-content-center">
              {isLoadingSubCategoryDetail && <Loader type="inline" />}
              {subCategoryDetail &&
                subCategoryDetail.subCategories.map((item) => {
                  return (
                    <Row
                      key={item.id}
                      className="col-12"
                    >
                      <div className="cursor-pointer card-sm d-flex flex-row flex-wrap align-items-center p-2 mb-3">
                        <Image
                          className="rounded col-12 col-md-4 py-3"
                          src={item.imageUrl}
                        />
                        <div className="d-flex flex-column col-12 col-md-6 py-0 py-md-4 mb-3 mb-md-0">
                          <h4 className="cursor-pointer font-weight-semibold">{item.name}</h4>
                          <p className="cursor-pointer">{item.desc}</p>
                        </div>
                        <div className="text-primary-dark col-12 col-md-2 mb-3 mb-md-0 flex-centered justify-content-end justify-content-md-center">
                          <IconNextCircle />
                        </div>
                      </div>
                    </Row>
                  );
                })}
            </Row>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ServiceCategoryDetail;
