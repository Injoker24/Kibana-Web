import {
  ErrorWrapper,
  ServiceInquiryCategoryOutput,
  ServiceInquiryServiceListInput,
  ServiceInquiryServiceListOutput,
} from 'models';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ServiceService } from 'services';
import { Form, Image, Row } from 'react-bootstrap';

import { Footer, FormInput, Header, InlineRetryError, Loader } from 'shared/components';
import { useForm } from 'react-hook-form';
import { IconChevronRight, IconSearch, searchIllustration } from 'images';
import Popup from 'reactjs-popup';

const ServiceSearch: React.FC = ({ stateCategories }: any) => {
  const [formData, setFormData] = useState<ServiceInquiryServiceListInput>({
    searchText: '',
    subCategory: [],
    budget: [],
    workingTime: [],
  });

  const [lastId, setLastId] = useState('');

  const {
    data: serviceCategory,
    isLoading: isLoadingServiceCategory,
    refetch: refetchServiceCategory,
    error: errorServiceCategory,
  } = useQuery<ServiceInquiryCategoryOutput, ErrorWrapper>(
    ['inquiry-service-category'],
    async () => await ServiceService.inquiryCategory(),
  );

  const {
    isLoading: isLoadingServiceList,
    mutate: mutateServiceList,
    error: errorLogin,
  } = useMutation<ServiceInquiryServiceListOutput, ErrorWrapper>(
    ['inquiry-service-list', formData],
    async () =>
      await ServiceService.inquiryServiceList({
        searchText: formData.searchText,
        subCategory: formData.subCategory,
        budget: formData.budget,
        workingTime: formData.workingTime,
        lastId: lastId,
      }),
    {
      onSuccess: (result) => {},
    },
  );

  const { register: registerSearch, handleSubmit: handleSubmitSearch } = useForm({
    mode: 'onChange',
  });

  const { register: registerSubCategory, handleSubmit: handleSubmitSubCategory } = useForm({
    mode: 'onChange',
  });

  const { register: registerBudget, handleSubmit: handleSubmitBudget } = useForm({
    mode: 'onChange',
  });

  const { register: registerWorkingTime, handleSubmit: handleSubmitWorkingTime } = useForm({
    mode: 'onChange',
  });

  const submitSearch = (formData: any) => {
    console.log(formData);
  };

  const submitSubCategoryFilter = (formData: any) => {
    console.log(formData);
  };

  const submitBudgetFilter = (formData: any) => {
    const budgetArray = formData.budget.map((budget: string) => {
      if (budget === 'budget1') {
        return {
          budgetStart: 0,
          budgetEnd: 100000,
        };
      }
      if (budget === 'budget2') {
        return {
          budgetStart: 100000,
          budgetEnd: 300000,
        };
      }
      if (budget === 'budget3') {
        return {
          budgetStart: 300000,
          budgetEnd: 700000,
        };
      }
      if (budget === 'budget4') {
        return {
          budgetStart: 700000,
          budgetEnd: 1500000,
        };
      }
      if (budget === 'budget5') {
        return {
          budgetStart: 1500000,
        };
      }
    });
  };

  const submitWorkingTimeFilter = (formData: any) => {
    const workingTimeArray = formData.workingTime.map((time: string) => {
      if (time === 'workingTime1') {
        return {
          workingTimeStart: 0,
          workingTimeEnd: 1,
        };
      }
      if (time === 'workingTime2') {
        return {
          workingTimeStart: 1,
          workingTimeEnd: 3,
        };
      }
      if (time === 'workingTime3') {
        return {
          workingTimeStart: 3,
          workingTimeEnd: 7,
        };
      }
      if (time === 'workingTime4') {
        return {
          workingTimeStart: 7,
          workingTimeEnd: 31,
        };
      }
      if (time === 'workingTime5') {
        return {
          workingTimeStart: 31,
        };
      }
    });
  };

  return (
    <>
      <Header />
      <div className="min-layout-height">
        <Row className="justify-content-center">
          <div className="col-10">
            <div className="bg-primary-dark rounded d-flex flex-row flex-wrap px-2 px-lg-4 py-2 my-5">
              <form
                onSubmit={handleSubmitSearch(submitSearch)}
                className="col-12 col-lg-8"
              >
                <div className="position-relative">
                  <FormInput>
                    <Form.Control
                      type="text"
                      id="searchText"
                      name="searchText"
                      autoComplete="off"
                      placeholder="Layanan apa yang anda butuhkan?"
                      className="pr-5"
                      ref={registerSearch() as string & ((ref: Element | null) => void)}
                    />
                  </FormInput>
                  <button
                    className="text-primary cursor-pointer border-0 bg-white"
                    type="submit"
                    style={{ position: 'absolute', right: '1rem', bottom: '0.75rem' }}
                  >
                    <IconSearch />
                  </button>
                </div>
              </form>
              <div className="position-relative search-illustration-container order-first order-lg-last">
                <Image src={searchIllustration} />
              </div>
            </div>

            <h3 className="mb-4">Semua layanan</h3>

            <div className="d-flex flex-row">
              <Popup
                trigger={
                  <div className="d-flex mr-3 cursor-pointer dropdown">
                    <p className="mr-4 cursor-pointer">Kategori / Sub Kategori</p>
                    <div className="rotate-icon-down">
                      <IconChevronRight />
                    </div>
                  </div>
                }
                position="bottom left"
                on="click"
                closeOnDocumentClick
                className="filter-tooltip"
              >
                <div className="filter-tooltip d-flex flex-column">
                  {errorServiceCategory && (
                    <div className="flex-centered">
                      <InlineRetryError
                        message={errorServiceCategory.message}
                        onRetry={refetchServiceCategory}
                      />
                    </div>
                  )}
                  {isLoadingServiceCategory && <Loader type="inline" />}
                  {serviceCategory && (
                    <form onSubmit={handleSubmitSubCategory(submitSubCategoryFilter)}>
                      <FormInput>
                        <div className="d-flex flex-row flex-wrap">
                          {serviceCategory.categories.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="col-3 mb-3"
                              >
                                <h4 className="font-weight-bold mb-3">{item.name}</h4>
                                {item.subCategories.map((subCat) => {
                                  return (
                                    <Form.Check
                                      key={subCat.id}
                                      type="checkbox"
                                      name="subCategory"
                                      id={subCat.id}
                                      value={subCat.id}
                                      label={subCat.name}
                                      className="mb-3"
                                      ref={
                                        registerSubCategory() as string &
                                          ((ref: Element | null) => void)
                                      }
                                    />
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </FormInput>
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-primary align-self-end"
                          type="submit"
                        >
                          Terapkan Filter
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Popup>
              <Popup
                trigger={
                  <div className="d-flex mr-3 cursor-pointer dropdown">
                    <p className="mr-4 cursor-pointer">Budget</p>
                    <div className="rotate-icon-down">
                      <IconChevronRight />
                    </div>
                  </div>
                }
                position="bottom left"
                on="click"
                closeOnDocumentClick
                className="filter-tooltip"
              >
                <div className="filter-tooltip d-flex flex-column">
                  <form onSubmit={handleSubmitBudget(submitBudgetFilter)}>
                    <FormInput>
                      <Form.Check
                        type="checkbox"
                        name="budget"
                        id="budget1"
                        value="budget1"
                        label="< Rp 100,000"
                        className="mb-3"
                        ref={registerBudget() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="budget"
                        id="budget2"
                        value="budget2"
                        label="Rp 100,000 - Rp 300,000"
                        className="mb-3"
                        ref={registerBudget() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="budget"
                        id="budget3"
                        value="budget3"
                        label="Rp 300,000 - Rp 700,000"
                        className="mb-3"
                        ref={registerBudget() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="budget"
                        id="budget4"
                        value="budget4"
                        label="Rp 700,000 - Rp 1,500,000"
                        className="mb-3"
                        ref={registerBudget() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="budget"
                        id="budget5"
                        value="budget5"
                        label="> Rp 1,500,000"
                        className="mb-3"
                        ref={registerBudget() as string & ((ref: Element | null) => void)}
                      />
                    </FormInput>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary align-self-end"
                        type="submit"
                      >
                        Terapkan Filter
                      </button>
                    </div>
                  </form>
                </div>
              </Popup>
              <Popup
                trigger={
                  <div className="d-flex mr-3 cursor-pointer dropdown">
                    <p className="mr-4 cursor-pointer">Waktu Pengerjaan</p>
                    <div className="rotate-icon-down">
                      <IconChevronRight />
                    </div>
                  </div>
                }
                position="bottom left"
                on="click"
                closeOnDocumentClick
                className="filter-tooltip"
              >
                <div className="filter-tooltip d-flex flex-column">
                  <form onSubmit={handleSubmitWorkingTime(submitWorkingTimeFilter)}>
                    <FormInput>
                      <Form.Check
                        type="checkbox"
                        name="workingTime"
                        id="workingTime1"
                        value="workingTime1"
                        label="< 1 hari"
                        className="mb-3"
                        ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="workingTime"
                        id="workingTime2"
                        value="workingTime2"
                        label="1 hari - 3 hari"
                        className="mb-3"
                        ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="workingTime"
                        id="workingTime3"
                        value="workingTime3"
                        label="3 hari - 1 minggu"
                        className="mb-3"
                        ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="workingTime"
                        id="workingTime4"
                        value="workingTime4"
                        label="1 minggu - 1 bulan"
                        className="mb-3"
                        ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                      />

                      <Form.Check
                        type="checkbox"
                        name="workingTime"
                        id="workingTime5"
                        value="workingTime5"
                        label="> 1 bulan"
                        className="mb-3"
                        ref={registerWorkingTime() as string & ((ref: Element | null) => void)}
                      />
                    </FormInput>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary align-self-end"
                        type="submit"
                      >
                        Terapkan Filter
                      </button>
                    </div>
                  </form>
                </div>
              </Popup>
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ServiceSearch;
