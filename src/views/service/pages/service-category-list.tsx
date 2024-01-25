import { ErrorWrapper, ServiceInquiryCategoryOutput } from 'models';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ServiceService } from 'services';
import { Image, Row } from 'react-bootstrap';

import { Footer, Header, InlineRetryError, Loader, TitleBanner } from 'shared/components';
import { IconChevronRight } from 'images';

const ServiceCategoryList: React.FC = () => {
  const {
    data: category,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
    error: errorCategory,
  } = useQuery<ServiceInquiryCategoryOutput, ErrorWrapper>(
    ['inquiry-category'],
    async () => await ServiceService.inquiryCategory(),
  );

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <TitleBanner message={'Kategori Layanan'} />
        <Row className="justify-content-center">
          <div className="col-10">
            {errorCategory && (
              <div className="flex-centered">
                <InlineRetryError
                  message={errorCategory.message}
                  onRetry={refetchCategory}
                />
              </div>
            )}
            <div className="d-flex flex-row flex-wrap">
              {isLoadingCategory && <Loader type="inline" />}
              {category &&
                category.categories.map((category) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 d-flex flex-column mb-5 px-md-3 px-lg-5">
                      <Image
                        className="mb-3 cursor-pointer"
                        style={{ borderRadius: '1.5rem' }}
                        src={category.imageUrl}
                        onClick={() => (window.location.href = '/service/category/' + category.id)}
                      />
                      <div className="flex-centered justify-content-between mb-2">
                        <h3 className="mb-0">{category.name}</h3>
                        <div
                          className="text-primary-dark cursor-pointer"
                          onClick={() =>
                            (window.location.href = '/service/category/' + category.id)
                          }
                        >
                          <IconChevronRight />
                        </div>
                      </div>
                      {category.subCategories.map((subCategory) => {
                        return (
                          <a
                            href=""
                            className="text-primary-dark mb-2"
                          >
                            {subCategory.name}
                          </a>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ServiceCategoryList;
